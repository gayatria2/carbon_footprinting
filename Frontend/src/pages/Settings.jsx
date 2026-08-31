import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaUser,
  FaLeaf,
  FaShieldAlt,
  FaDatabase,
  FaMoon,
  FaSun,
  FaChartLine,
  FaBullseye,
  FaLightbulb,
  FaTrophy,
  FaCheckCircle,
  FaDownload,
  FaSave,
  FaCog,
  FaLock,
  FaCalendarCheck,
  FaSyncAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getSettings,
  updateSettings,
  resetSettings,
} from "../services/settingsService";


// =====================================================
// DEFAULT SETTINGS
// =====================================================

const DEFAULT_SETTINGS = {
  activity_alerts: true,
  goal_reminders: true,
  weekly_summary: true,
  eco_tips: true,
  achievement_alerts: true,

  primary_goal: "Reduce Carbon",

  tracking_frequency: "Daily",

  theme: "Light",

  profile_visibility: "Private",
};


// =====================================================
// SETTINGS PAGE
// =====================================================

function Settings() {

  const navigate = useNavigate();


  const [settings, setSettings] = useState(
    DEFAULT_SETTINGS
  );

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [resetting, setResetting] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {

    loadSettings();

  }, []);


  const loadSettings = async () => {

    try {

      setLoading(true);

      setError("");

      const storedUser =
        localStorage.getItem("user");


      if (!storedUser) {

        setError(
          "Please login again."
        );

        return;
      }


      let parsedUser;

      try {

        parsedUser =
          JSON.parse(storedUser);

      } catch (parseError) {

        console.error(
          "User JSON Error:",
          parseError
        );

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");

        return;
      }


      if (!parsedUser?.id) {

        setError(
          "User ID not found."
        );

        return;
      }


      setUser(parsedUser);


      // =================================================
      // GET SETTINGS
      // =================================================

      const response =
        await getSettings(
          parsedUser.id
        );


      console.log(
        "GET SETTINGS RESPONSE:",
        response?.data
      );


      const data =
        response?.data?.data;


      if (data) {

        setSettings({

          activity_alerts:
            normalizeBoolean(
              data.activity_alerts
            ),

          goal_reminders:
            normalizeBoolean(
              data.goal_reminders
            ),

          weekly_summary:
            normalizeBoolean(
              data.weekly_summary
            ),

          eco_tips:
            normalizeBoolean(
              data.eco_tips
            ),

          achievement_alerts:
            normalizeBoolean(
              data.achievement_alerts
            ),

          primary_goal:
            data.primary_goal ||
            DEFAULT_SETTINGS.primary_goal,

          tracking_frequency:
            data.tracking_frequency ||
            DEFAULT_SETTINGS.tracking_frequency,

          theme:
            data.theme ||
            DEFAULT_SETTINGS.theme,

          profile_visibility:
            data.profile_visibility ||
            DEFAULT_SETTINGS.profile_visibility,

        });

      }

    } catch (err) {

      console.error(
        "GET SETTINGS ERROR:",
        err?.response?.data ||
        err
      );


      if (
        err?.response?.status === 401
      ) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        navigate("/login");

        return;
      }


      setError(
        err?.response?.data?.message ||
        "Unable to load settings."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // TOGGLE SETTING
  // =====================================================

  const toggleSetting = (key) => {

    setSettings((prev) => ({

      ...prev,

      [key]: !prev[key],

    }));


    setMessage("");

    setError("");

  };


  // =====================================================
  // SELECT CHANGE
  // =====================================================

  const handleSelectChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setSettings((prev) => ({

      ...prev,

      [name]: value,

    }));


    setMessage("");

    setError("");

  };


  // =====================================================
  // THEME
  // =====================================================

  const handleTheme = (theme) => {

    setSettings((prev) => ({

      ...prev,

      theme,

    }));


    setMessage("");

    setError("");

  };


  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = async () => {

    try {

      if (!user?.id) {

        setError(
          "User ID not found."
        );

        return;
      }


      setSaving(true);

      setMessage("");

      setError("");


      // Debug
      console.log(
        "SENDING SETTINGS:",
        settings
      );


      const response =
        await updateSettings(
          user.id,
          settings
        );


      console.log(
        "SAVE RESPONSE:",
        response?.data
      );


      if (
        response?.data?.success
      ) {

        // Save local copy
        localStorage.setItem(
          "carbonTrackerSettings",
          JSON.stringify(settings)
        );


        setMessage(
          "Settings saved successfully."
        );


        // Important:
        // Keep current screen state.
        // No unnecessary reload here.

      } else {

        setError(
          response?.data?.message ||
          "Settings could not be saved."
        );

      }

    } catch (err) {

      console.error(
        "SAVE SETTINGS ERROR:",
        err?.response?.data ||
        err
      );


      setError(
        err?.response?.data?.message ||
        "Unable to save settings."
      );

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // RESET SETTINGS
  // =====================================================

  const handleReset = async () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to reset all settings to default?"
      );


    if (!confirmed) {
      return;
    }


    try {

      if (!user?.id) {

        setError(
          "User ID not found."
        );

        return;
      }


      setResetting(true);

      setMessage("");

      setError("");


      const response =
        await resetSettings(
          user.id
        );


      console.log(
        "RESET RESPONSE:",
        response?.data
      );


      if (
        response?.data?.success
      ) {

        setSettings({
          ...DEFAULT_SETTINGS,
        });


        localStorage.setItem(
          "carbonTrackerSettings",
          JSON.stringify(
            DEFAULT_SETTINGS
          )
        );


        setMessage(
          "Settings reset successfully."
        );

      } else {

        setError(
          response?.data?.message ||
          "Settings could not be reset."
        );

      }

    } catch (err) {

      console.error(
        "RESET SETTINGS ERROR:",
        err?.response?.data ||
        err
      );


      setError(
        err?.response?.data?.message ||
        "Unable to reset settings."
      );

    } finally {

      setResetting(false);

    }

  };


  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#F4F8F5]">

        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div
              className="
                mx-auto
                h-14
                w-14
                animate-spin
                rounded-full
                border-4
                border-green-100
                border-t-green-600
              "
            />

            <p className="mt-5 font-semibold text-gray-500">
              Loading Settings...
            </p>

          </div>

        </main>

        <Footer />

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-[#F4F8F5]">

      <Navbar />


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative overflow-hidden">

        {/* Background Decoration */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-80
            w-80
            rounded-full
            bg-emerald-100/50
            blur-3xl
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            h-80
            w-80
            rounded-full
            bg-green-100/40
            blur-3xl
          "
        />


        <div
          className="
            relative
            mx-auto
            max-w-6xl
            px-4
            py-8
            sm:px-6
            lg:px-8
          "
        >


          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="mb-8">

            <Link
              to="/profile"
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-emerald-700
                transition
                hover:text-emerald-900
              "
            >

              <FaArrowLeft />

              Back to Profile

            </Link>


            <div
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              <div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#087F55]
                      to-[#16A36F]
                      text-xl
                      text-white
                      shadow-lg
                    "
                  >

                    <FaCog />

                  </div>


                  <div>

                    <p
                      className="
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.22em]
                        text-emerald-700
                      "
                    >
                      Carbon Tracker
                    </p>


                    <h1
                      className="
                        mt-1
                        text-3xl
                        font-black
                        text-slate-900
                        sm:text-4xl
                      "
                    >
                      Settings
                    </h1>

                  </div>

                </div>


                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Manage your notifications, sustainability preferences, appearance and privacy.
                </p>

              </div>


              {/* ACTION BUTTONS */}

              <div className="flex gap-3">

                {/* RESET */}

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={
                    resetting ||
                    saving
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-bold
                    text-slate-600
                    shadow-sm
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  <FaSyncAlt />

                  {resetting
                    ? "Resetting..."
                    : "Reset"}

                </button>


                {/* SAVE */}

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={
                    saving ||
                    resetting
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-[#087F55]
                    to-[#0AA76B]
                    px-5
                    py-3
                    text-sm
                    font-extrabold
                    text-white
                    shadow-lg
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  <FaSave />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </div>


            {/* SUCCESS MESSAGE */}

            {message && (

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-emerald-50
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-emerald-700
                "
              >

                <FaCheckCircle />

                {message}

              </div>

            )}


            {/* ERROR MESSAGE */}

            {error && (

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-red-100
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-red-600
                "
              >

                {error}

              </div>

            )}

          </div>


          {/* =====================================================
              ACCOUNT
          ===================================================== */}

          <SettingsCard
            icon={<FaUser />}
            title="Account Information"
            description="Your registered Carbon Tracker account."
          >

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >

              <ReadOnlyField
                label="Full Name"
                value={
                  user?.full_name ||
                  "User"
                }
              />


              <ReadOnlyField
                label="Email Address"
                value={
                  user?.email ||
                  "No email"
                }
              />

            </div>

          </SettingsCard>


          {/* =====================================================
              NOTIFICATIONS
          ===================================================== */}

          <SettingsCard
            icon={<FaBell />}
            title="Notification Preferences"
            description="Control the updates you receive from Carbon Tracker."
          >

            <div className="divide-y divide-slate-100">

              <NotificationRow
                icon={<FaChartLine />}
                title="Activity Alerts"
                description="Get notified when an activity is successfully recorded."
                enabled={
                  settings.activity_alerts
                }
                onChange={() =>
                  toggleSetting(
                    "activity_alerts"
                  )
                }
              />


              <NotificationRow
                icon={<FaBullseye />}
                title="Goal Reminders"
                description="Receive reminders about your carbon reduction goals."
                enabled={
                  settings.goal_reminders
                }
                onChange={() =>
                  toggleSetting(
                    "goal_reminders"
                  )
                }
              />


              <NotificationRow
                icon={
                  <FaCalendarCheck />
                }
                title="Weekly Carbon Summary"
                description="Receive a weekly overview of your carbon footprint."
                enabled={
                  settings.weekly_summary
                }
                onChange={() =>
                  toggleSetting(
                    "weekly_summary"
                  )
                }
              />


              <NotificationRow
                icon={<FaLightbulb />}
                title="Eco Tips"
                description="Receive personalized sustainability suggestions."
                enabled={
                  settings.eco_tips
                }
                onChange={() =>
                  toggleSetting(
                    "eco_tips"
                  )
                }
              />


              <NotificationRow
                icon={<FaTrophy />}
                title="Achievement Alerts"
                description="Get notified when you unlock achievements."
                enabled={
                  settings.achievement_alerts
                }
                onChange={() =>
                  toggleSetting(
                    "achievement_alerts"
                  )
                }
              />

            </div>

          </SettingsCard>


          {/* =====================================================
              SUSTAINABILITY
          ===================================================== */}

          <SettingsCard
            icon={<FaLeaf />}
            title="Sustainability Preferences"
            description="Choose the environmental areas you want to focus on."
          >

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >

              <SelectField
                label="Primary Sustainability Goal"
                name="primary_goal"
                value={
                  settings.primary_goal
                }
                onChange={
                  handleSelectChange
                }
              >

                <option value="Reduce Carbon">
                  Reduce Carbon
                </option>

                <option value="Save Energy">
                  Save Energy
                </option>

                <option value="Reduce Waste">
                  Reduce Waste
                </option>

                <option value="Save Water">
                  Save Water
                </option>

                <option value="Sustainable Transport">
                  Sustainable Transport
                </option>

              </SelectField>


              <SelectField
                label="Tracking Frequency"
                name="tracking_frequency"
                value={
                  settings.tracking_frequency
                }
                onChange={
                  handleSelectChange
                }
              >

                <option value="Daily">
                  Daily
                </option>

                <option value="Weekly">
                  Weekly
                </option>

                <option value="Monthly">
                  Monthly
                </option>

              </SelectField>

            </div>


            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                md:grid-cols-3
              "
            >

              <PreferenceCard
                icon="🌱"
                title="Eco Friendly"
                text="Build greener everyday habits."
              />


              <PreferenceCard
                icon="🌍"
                title="Lower Impact"
                text="Focus on reducing carbon emissions."
              />


              <PreferenceCard
                icon="♻️"
                title="Sustainable"
                text="Create a responsible lifestyle."
              />

            </div>

          </SettingsCard>


          {/* =====================================================
              APPEARANCE
          ===================================================== */}

          <SettingsCard
            icon={
              settings.theme === "Dark"
                ? <FaMoon />
                : <FaSun />
            }
            title="Appearance"
            description="Choose your preferred application theme."
          >

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-3
              "
            >

              <ThemeButton
                title="Light"
                icon={<FaSun />}
                active={
                  settings.theme ===
                  "Light"
                }
                onClick={() =>
                  handleTheme("Light")
                }
              />


              <ThemeButton
                title="Dark"
                icon={<FaMoon />}
                active={
                  settings.theme ===
                  "Dark"
                }
                onClick={() =>
                  handleTheme("Dark")
                }
              />


              <ThemeButton
                title="System"
                icon={<FaLeaf />}
                active={
                  settings.theme ===
                  "System"
                }
                onClick={() =>
                  handleTheme("System")
                }
              />

            </div>


            <div
              className="
                mt-5
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >

              <p className="text-xs leading-5 text-slate-500">

                Select your preferred theme and click
                <span className="font-bold text-slate-700">
                  {" "}Save Changes
                </span>
                {" "}to store your preference.

              </p>

            </div>

          </SettingsCard>


          {/* =====================================================
              PRIVACY
          ===================================================== */}

          <SettingsCard
            icon={<FaShieldAlt />}
            title="Privacy & Security"
            description="Manage your profile visibility and account privacy."
          >

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >

              <SelectField
                label="Profile Visibility"
                name="profile_visibility"
                value={
                  settings.profile_visibility
                }
                onChange={
                  handleSelectChange
                }
              >

                <option value="Private">
                  Private
                </option>

                <option value="Leaderboard Only">
                  Leaderboard Only
                </option>

              </SelectField>


              <div
                className="
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-emerald-50/60
                  p-5
                "
              >

                <div className="flex items-start gap-3">

                  <FaShieldAlt
                    className="
                      mt-1
                      text-emerald-600
                    "
                  />


                  <div>

                    <p className="font-bold text-emerald-800">
                      Privacy First
                    </p>


                    <p className="mt-1 text-xs leading-5 text-emerald-700/70">

                      Your selected privacy preference is stored with your account.

                    </p>

                  </div>

                </div>

              </div>

            </div>


            <div
              className="
                mt-5
                rounded-2xl
                border
                border-slate-100
                bg-[#F8FBF9]
                p-5
              "
            >

              <div className="flex items-start gap-3">

                <FaLock
                  className="
                    mt-1
                    text-emerald-600
                  "
                />


                <div>

                  <p className="font-extrabold text-slate-800">
                    Account Protection
                  </p>


                  <p className="mt-1 text-xs leading-5 text-slate-500">

                    Keep your login credentials secure and never share your password.

                  </p>

                </div>

              </div>

            </div>

          </SettingsCard>


          {/* =====================================================
              DATA
          ===================================================== */}

          <SettingsCard
            icon={<FaDatabase />}
            title="Data & Storage"
            description="Manage your saved application preferences."
          >

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-[#F8FBF9]
                  p-5
                "
              >

                <div className="flex items-start gap-3">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-50
                      text-emerald-600
                    "
                  >

                    <FaDownload />

                  </div>


                  <div>

                    <h3 className="font-extrabold text-slate-800">
                      Export Carbon Data
                    </h3>


                    <p className="mt-1 text-xs leading-5 text-slate-500">

                      Carbon report export can be added to this module.

                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  disabled
                  className="
                    mt-4
                    rounded-xl
                    bg-slate-100
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-slate-400
                  "
                >
                  Coming Soon
                </button>

              </div>


              <div
                className="
                  rounded-2xl
                  border
                  border-amber-100
                  bg-amber-50/50
                  p-5
                "
              >

                <div className="flex items-start gap-3">

                  <FaSyncAlt
                    className="
                      mt-1
                      text-amber-600
                    "
                  />


                  <div>

                    <h3 className="font-extrabold text-slate-800">
                      Reset Preferences
                    </h3>


                    <p className="mt-1 text-xs leading-5 text-slate-500">

                      Restore all settings to their default values.

                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={handleReset}
                  disabled={resetting}
                  className="
                    mt-4
                    rounded-xl
                    bg-amber-500
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    transition
                    hover:bg-amber-600
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {resetting
                    ? "Resetting..."
                    : "Reset Settings"}

                </button>

              </div>

            </div>

          </SettingsCard>


          {/* =====================================================
              FINAL SAVE
          ===================================================== */}

          <div
            className="
              mt-7
              rounded-[2rem]
              border
              border-emerald-100
              bg-gradient-to-r
              from-emerald-50
              to-green-50
              p-6
            "
          >

            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-emerald-600
                    shadow-sm
                  "
                >

                  <FaCheckCircle />

                </div>


                <div>

                  <p className="font-extrabold text-emerald-900">
                    Your preferences are ready
                  </p>


                  <p className="mt-1 text-xs leading-5 text-emerald-700/70">

                    Save your changes to synchronize them with your account.

                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={handleSave}
                disabled={saving || resetting}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#087F55]
                  to-[#0AA76B]
                  px-5
                  py-3
                  text-sm
                  font-extrabold
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <FaSave />

                {saving
                  ? "Saving..."
                  : "Save Settings"}

              </button>

            </div>

          </div>


        </div>

      </main>


      <Footer />

    </div>

  );
}


// =====================================================
// NORMALIZE BOOLEAN
// =====================================================

function normalizeBoolean(value) {

  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true"
  );

}


// =====================================================
// SETTINGS CARD
// =====================================================

function SettingsCard({
  icon,
  title,
  description,
  children,
}) {

  return (

    <section
      className="
        mb-7
        overflow-hidden
        rounded-[2rem]
        border
        border-slate-100
        bg-white
        shadow-[0_10px_40px_rgba(15,23,42,0.06)]
      "
    >

      <div
        className="
          border-b
          border-slate-100
          px-6
          py-5
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-600
            "
          >

            {icon}

          </div>


          <div>

            <h2 className="text-lg font-black text-slate-900">
              {title}
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>

          </div>

        </div>

      </div>


      <div className="p-6 sm:p-7">

        {children}

      </div>

    </section>

  );
}


// =====================================================
// READ ONLY FIELD
// =====================================================

function ReadOnlyField({
  label,
  value,
}) {

  return (

    <div>

      <label
        className="
          mb-2
          block
          text-xs
          font-extrabold
          uppercase
          tracking-wider
          text-slate-400
        "
      >

        {label}

      </label>


      <div
        className="
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-4
          py-3.5
          font-semibold
          text-slate-700
        "
      >

        {value}

      </div>

    </div>

  );
}


// =====================================================
// SELECT FIELD
// =====================================================

function SelectField({
  label,
  name,
  value,
  onChange,
  children,
}) {

  return (

    <div>

      <label className="mb-2 block text-sm font-bold text-slate-700">

        {label}

      </label>


      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-4
          py-3.5
          text-sm
          font-medium
          text-slate-700
          outline-none
          transition
          focus:border-emerald-500
          focus:bg-white
          focus:ring-4
          focus:ring-emerald-100
        "
      >

        {children}

      </select>

    </div>

  );
}


// =====================================================
// NOTIFICATION ROW
// =====================================================

function NotificationRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}) {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        py-5
      "
    >

      <div className="flex min-w-0 items-start gap-3">

        <div
          className="
            mt-0.5
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-50
            text-sm
            text-emerald-600
          "
        >

          {icon}

        </div>


        <div>

          <p className="text-sm font-extrabold text-slate-800">
            {title}
          </p>


          <p
            className="
              mt-1
              max-w-xl
              text-xs
              leading-5
              text-slate-500
            "
          >

            {description}

          </p>

        </div>

      </div>


      <button
        type="button"
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          transition-all
          duration-300
          ${
            enabled
              ? "bg-emerald-600"
              : "bg-slate-200"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transition-all
            duration-300
            ${
              enabled
                ? "left-6"
                : "left-1"
            }
          `}
        />

      </button>

    </div>

  );
}


// =====================================================
// PREFERENCE CARD
// =====================================================

function PreferenceCard({
  icon,
  title,
  text,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-[#F8FBF9]
        p-5
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <div className="text-2xl">
        {icon}
      </div>


      <h3 className="mt-3 text-sm font-extrabold text-slate-800">
        {title}
      </h3>


      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>

    </div>

  );
}


// =====================================================
// THEME BUTTON
// =====================================================

function ThemeButton({
  title,
  icon,
  active,
  onClick,
}) {

  return (

    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-3
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        duration-300
        ${
          active
            ? "border-emerald-500 bg-emerald-50 shadow-sm"
            : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40"
        }
      `}
    >

      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${
            active
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >

        {icon}

      </div>


      <div>

        <p
          className={`
            text-sm
            font-extrabold
            ${
              active
                ? "text-emerald-800"
                : "text-slate-700"
            }
          `}
        >

          {title}

        </p>


        {active && (

          <p className="mt-0.5 text-[10px] font-bold text-emerald-600">

            Selected

          </p>

        )}

      </div>

    </button>

  );
}


export default Settings;