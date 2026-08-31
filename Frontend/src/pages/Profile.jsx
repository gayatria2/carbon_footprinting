import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    FaUserCircle,
    FaEnvelope,
    FaLeaf,
    FaChartLine,
    FaCalendarCheck,
    FaEdit,
    FaLock,
    FaTimes,
    FaSave,
    FaShieldAlt,
    FaCheckCircle
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getProfile,
    updateProfile,
    changePassword
} from "../services/profileService";


function Profile() {

    // =====================================================
    // PROFILE STATE
    // =====================================================

    const [profile, setProfile] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [editMode, setEditMode] =
        useState(false);

    const [passwordMode, setPasswordMode] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    // =====================================================
    // EDIT DATA
    // =====================================================

    const [editData, setEditData] =
        useState({
            full_name: "",
            sustainability_preference: ""
        });


    // =====================================================
    // PASSWORD DATA
    // =====================================================

    const [passwordData, setPasswordData] =
        useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });


    // =====================================================
    // LOAD PROFILE
    // =====================================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            setMessage("");


            const storedUser =
                localStorage.getItem("user");


            const user =
                storedUser
                    ? JSON.parse(storedUser)
                    : null;


            if (!user?.id) {

                setError(
                    "User information not found."
                );

                return;
            }


            const res =
                await getProfile(user.id);


            const data =
                res.data?.data;


            setProfile(data);


            setEditData({

                full_name:
                    data?.full_name || "",

                sustainability_preference:
                    data?.sustainability_preference || ""

            });

        } catch (err) {

            console.error(
                "Profile Error:",
                err?.response?.data || err
            );


            setError(
                err?.response?.data?.message ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // EDIT CHANGE
    // =====================================================

    const handleEditChange = (e) => {

        setEditData({

            ...editData,

            [e.target.name]:
                e.target.value

        });

    };


    // =====================================================
    // PASSWORD CHANGE
    // =====================================================

    const handlePasswordChange = (e) => {

        setPasswordData({

            ...passwordData,

            [e.target.name]:
                e.target.value

        });

    };


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    const handleUpdateProfile = async () => {

        try {

            setSaving(true);

            setError("");

            setMessage("");


            const storedUser =
                localStorage.getItem("user");


            const user =
                storedUser
                    ? JSON.parse(storedUser)
                    : null;


            if (!user?.id) {

                setError(
                    "User information not found."
                );

                return;
            }


            await updateProfile(
                user.id,
                editData
            );


            // Update local storage

            const updatedUser = {

                ...user,

                full_name:
                    editData.full_name

            };


            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );


            setMessage(
                "Profile updated successfully!"
            );


            setEditMode(false);


            await loadProfile();

        } catch (err) {

            console.error(
                "Update Profile Error:",
                err?.response?.data || err
            );


            setError(
                err?.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    const handleChangePassword = async () => {

        try {

            setSaving(true);

            setError("");

            setMessage("");


            if (
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword
            ) {

                setError(
                    "Please fill all password fields."
                );

                return;
            }


            if (
                passwordData.newPassword !==
                passwordData.confirmPassword
            ) {

                setError(
                    "New password and confirm password do not match."
                );

                return;
            }


            if (
                passwordData.newPassword.length < 6
            ) {

                setError(
                    "New password must contain at least 6 characters."
                );

                return;
            }


            const storedUser =
                localStorage.getItem("user");


            const user =
                storedUser
                    ? JSON.parse(storedUser)
                    : null;


            if (!user?.id) {

                setError(
                    "User information not found."
                );

                return;
            }


            await changePassword(

                user.id,

                {
                    currentPassword:
                        passwordData.currentPassword,

                    newPassword:
                        passwordData.newPassword
                }

            );


            setMessage(
                "Password changed successfully!"
            );


            setPasswordData({

                currentPassword: "",
                newPassword: "",
                confirmPassword: ""

            });


            setPasswordMode(false);

        } catch (err) {

            console.error(
                "Change Password Error:",
                err?.response?.data || err
            );


            setError(
                err?.response?.data?.message ||
                "Failed to change password."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // DATE FORMAT
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }


        const parsed =
            new Date(date);


        if (
            Number.isNaN(
                parsed.getTime()
            )
        ) {

            return "-";

        }


        return parsed.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-[#F4F8F5]">

                <Navbar />

                <main className="flex min-h-[70vh] items-center justify-center">

                    <div className="text-center">

                        <div className="
                            mx-auto
                            h-14
                            w-14
                            animate-spin
                            rounded-full
                            border-4
                            border-green-100
                            border-t-green-600
                        " />

                        <p className="
                            mt-5
                            font-semibold
                            text-gray-500
                        ">
                            Loading Profile...
                        </p>

                    </div>

                </main>

                <Footer />

            </div>

        );

    }


    // =====================================================
    // PROFILE ERROR
    // =====================================================

    if (!profile) {

        return (

            <div className="min-h-screen bg-[#F4F8F5]">

                <Navbar />

                <main className="
                    flex
                    min-h-[70vh]
                    items-center
                    justify-center
                    px-6
                ">

                    <div className="
                        w-full
                        max-w-xl
                        rounded-3xl
                        bg-white
                        p-8
                        text-center
                        shadow-xl
                    ">

                        <FaShieldAlt
                            className="
                                mx-auto
                                text-4xl
                                text-red-400
                            "
                        />


                        <h2 className="
                            mt-4
                            text-2xl
                            font-black
                            text-gray-900
                        ">
                            Profile unavailable
                        </h2>


                        <p className="
                            mt-2
                            text-gray-500
                        ">
                            {error ||
                                "Something went wrong."}
                        </p>


                        <Link
                            to="/dashboard"
                            className="
                                mt-6
                                inline-flex
                                rounded-xl
                                bg-green-600
                                px-5
                                py-3
                                font-bold
                                text-white
                                transition
                                hover:bg-green-700
                            "
                        >
                            Back to Dashboard
                        </Link>

                    </div>

                </main>

                <Footer />

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-[#F4F8F5]">

            <Navbar />


            {/* =================================================
                HERO
            ================================================= */}

            <section className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#063B2A]
                via-[#087F55]
                to-[#0DB36F]
                text-white
            ">

                <div className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-80
                    w-80
                    rounded-full
                    bg-white/10
                    blur-3xl
                " />


                <div className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -left-24
                    h-96
                    w-96
                    rounded-full
                    bg-emerald-200/10
                    blur-3xl
                " />


                <div className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-6
                    py-12
                ">

                    <div className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">


                        {/* PROFILE INFO */}

                        <div className="
                            flex
                            items-center
                            gap-5
                        ">

                            <div className="
                                flex
                                h-20
                                w-20
                                shrink-0
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-white/20
                                bg-white/10
                                text-5xl
                                shadow-2xl
                                backdrop-blur-md
                            ">

                                <FaUserCircle />

                            </div>


                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-green-100
                                ">
                                    My Profile
                                </p>


                                <h1 className="
                                    mt-2
                                    text-4xl
                                    font-black
                                    sm:text-5xl
                                ">
                                    {profile.full_name}
                                </h1>


                                <p className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-2
                                    text-green-50
                                ">

                                    <FaEnvelope />

                                    {profile.email}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="
                mx-auto
                max-w-7xl
                px-6
                py-10
            ">


                {/* SUCCESS */}

                {message && (

                    <div className="
                        mb-6
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-green-200
                        bg-green-50
                        px-5
                        py-4
                        text-green-700
                    ">

                        <FaCheckCircle />

                        <span className="font-semibold">
                            {message}
                        </span>

                    </div>

                )}


                {/* ERROR */}

                {error && (

                    <div className="
                        mb-6
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-4
                        text-red-700
                    ">

                        {error}

                    </div>

                )}


                {/* =================================================
                    STATS
                ================================================= */}

                <div className="
                    mb-8
                    grid
                    grid-cols-1
                    gap-5
                    md:grid-cols-3
                ">


                    <ProfileStatCard
                        title="Total Activities"
                        value={
                            profile.totalActivities ||
                            0
                        }
                        icon={
                            <FaCalendarCheck />
                        }
                        iconClass="
                            bg-blue-100
                            text-blue-700
                        "
                    />


                    <ProfileStatCard
                        title="Total Carbon"
                        value={
                            Number(
                                profile.totalCarbon ||
                                0
                            ).toFixed(2)
                        }
                        suffix="kg"
                        icon={
                            <FaLeaf />
                        }
                        iconClass="
                            bg-green-100
                            text-green-700
                        "
                    />


                    <ProfileStatCard
                        title="Average Carbon"
                        value={
                            Number(
                                profile.averageCarbon ||
                                0
                            ).toFixed(2)
                        }
                        suffix="kg"
                        icon={
                            <FaChartLine />
                        }
                        iconClass="
                            bg-emerald-100
                            text-emerald-700
                        "
                    />

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="
                    grid
                    grid-cols-1
                    gap-8
                    lg:grid-cols-3
                ">


                    {/* =================================================
                        PERSONAL INFORMATION
                    ================================================= */}

                    <section className="
                        rounded-[2rem]
                        border
                        border-gray-100
                        bg-white
                        p-7
                        shadow-xl
                        lg:col-span-2
                        sm:p-8
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-black
                                    text-gray-900
                                ">
                                    Personal Information
                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                ">
                                    Manage your account information.
                                </p>

                            </div>


                            {!editMode && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditMode(true)
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-green-50
                                        px-4
                                        py-2.5
                                        font-semibold
                                        text-green-700
                                        transition
                                        hover:bg-green-100
                                    "
                                >

                                    <FaEdit />

                                    Edit Profile

                                </button>

                            )}

                        </div>


                        {/* =================================================
                            VIEW MODE
                        ================================================= */}

                        {!editMode ? (

                            <div className="
                                mt-8
                                space-y-5
                            ">

                                <InfoBox
                                    title="Full Name"
                                    value={
                                        profile.full_name
                                    }
                                />


                                <InfoBox
                                    title="Email Address"
                                    value={
                                        profile.email
                                    }
                                />


                                <InfoBox
                                    title="Sustainability Preference"
                                    value={
                                        profile.sustainability_preference ||
                                        "Not set"
                                    }
                                />


                                <InfoBox
                                    title="Member Since"
                                    value={
                                        formatDate(
                                            profile.created_at
                                        )
                                    }
                                />

                            </div>

                        ) : (

                            /* =================================================
                               EDIT MODE
                            ================================================= */

                            <div className="
                                mt-8
                                space-y-5
                            ">


                                {/* NAME */}

                                <div>

                                    <label className="
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                    ">
                                        Full Name
                                    </label>


                                    <input
                                        type="text"
                                        name="full_name"
                                        value={
                                            editData.full_name
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                        className="
                                            mt-2
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-green-600
                                            focus:ring-4
                                            focus:ring-green-100
                                        "
                                    />

                                </div>


                                {/* EMAIL */}

                                <div>

                                    <label className="
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                    ">
                                        Email Address
                                    </label>


                                    <input
                                        type="email"
                                        value={
                                            profile.email
                                        }
                                        disabled
                                        className="
                                            mt-2
                                            w-full
                                            cursor-not-allowed
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            px-4
                                            py-3
                                            text-gray-400
                                        "
                                    />


                                    <p className="
                                        mt-1
                                        text-xs
                                        text-gray-400
                                    ">
                                        Email cannot be changed here.
                                    </p>

                                </div>


                                {/* PREFERENCE */}

                                <div>

                                    <label className="
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                    ">
                                        Sustainability Preference
                                    </label>


                                    <select
                                        name="sustainability_preference"
                                        value={
                                            editData.sustainability_preference
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                        className="
                                            mt-2
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            outline-none
                                            transition
                                            focus:border-green-600
                                            focus:ring-4
                                            focus:ring-green-100
                                        "
                                    >

                                        <option value="">
                                            Select Preference
                                        </option>

                                        <option value="Reduce Transportation">
                                            Reduce Transportation
                                        </option>

                                        <option value="Reduce Electricity">
                                            Reduce Electricity
                                        </option>

                                        <option value="Reduce Waste">
                                            Reduce Waste
                                        </option>

                                        <option value="Sustainable Food">
                                            Sustainable Food
                                        </option>

                                        <option value="Save Water">
                                            Save Water
                                        </option>

                                        <option value="Overall Carbon Reduction">
                                            Overall Carbon Reduction
                                        </option>

                                    </select>

                                </div>


                                {/* BUTTONS */}

                                <div className="
                                    flex
                                    flex-col
                                    gap-3
                                    pt-2
                                    sm:flex-row
                                ">

                                    <button
                                        type="button"
                                        onClick={
                                            handleUpdateProfile
                                        }
                                        disabled={saving}
                                        className="
                                            flex
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-[#0B6E4F]
                                            to-[#157A57]
                                            py-3
                                            font-semibold
                                            text-white
                                            shadow-lg
                                            transition
                                            hover:shadow-xl
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    >

                                        <FaSave />

                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"}

                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => {

                                            setEditMode(false);

                                            setEditData({

                                                full_name:
                                                    profile.full_name,

                                                sustainability_preference:
                                                    profile.sustainability_preference ||
                                                    ""

                                            });

                                        }}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            px-6
                                            py-3
                                            font-semibold
                                            text-gray-700
                                            transition
                                            hover:bg-gray-100
                                        "
                                    >

                                        <FaTimes />

                                        Cancel

                                    </button>

                                </div>

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        SECURITY
                    ================================================= */}

                    <section className="
                        rounded-[2rem]
                        border
                        border-gray-100
                        bg-white
                        p-7
                        shadow-xl
                        sm:p-8
                    ">

                        <div className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-green-100
                            text-xl
                            text-green-700
                        ">

                            <FaLock />

                        </div>


                        <h2 className="
                            mt-5
                            text-2xl
                            font-black
                            text-gray-900
                        ">
                            Account Security
                        </h2>


                        <p className="
                            mt-2
                            text-sm
                            text-gray-500
                        ">
                            Keep your Carbon Tracker account secure.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                setPasswordMode(true)
                            }
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                border
                                border-green-200
                                bg-green-50
                                py-3
                                font-semibold
                                text-green-700
                                transition
                                hover:bg-green-100
                            "
                        >
                            Change Password
                        </button>


                        <div className="
                            mt-6
                            rounded-2xl
                            bg-[#F8FBF9]
                            p-5
                        ">

                            <div className="flex gap-3">

                                <FaShieldAlt
                                    className="
                                        mt-1
                                        text-green-600
                                    "
                                />


                                <div>

                                    <p className="
                                        font-bold
                                        text-gray-800
                                    ">
                                        Password Protected
                                    </p>


                                    <p className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-gray-500
                                    ">
                                        Your password is securely hashed before storage.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </main>


            {/* =================================================
                PASSWORD MODAL
            ================================================= */}

            {passwordMode && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    bg-black/50
                    px-4
                    backdrop-blur-sm
                ">

                    <div className="
                        w-full
                        max-w-lg
                        rounded-3xl
                        bg-white
                        p-7
                        shadow-2xl
                        sm:p-8
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-black
                                    text-gray-900
                                ">
                                    Change Password
                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                ">
                                    Enter your current and new password.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setPasswordMode(false)
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gray-100
                                    text-gray-600
                                    transition
                                    hover:bg-gray-200
                                "
                            >

                                <FaTimes />

                            </button>

                        </div>


                        <div className="
                            mt-7
                            space-y-5
                        ">

                            <PasswordInput
                                label="Current Password"
                                name="currentPassword"
                                value={
                                    passwordData.currentPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                            />


                            <PasswordInput
                                label="New Password"
                                name="newPassword"
                                value={
                                    passwordData.newPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                            />


                            <PasswordInput
                                label="Confirm New Password"
                                name="confirmPassword"
                                value={
                                    passwordData.confirmPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                            />


                            {passwordData.confirmPassword &&
                                passwordData.newPassword !==
                                passwordData.confirmPassword && (

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-red-500
                                    ">
                                        Passwords do not match.
                                    </p>

                                )}


                            <div className="
                                flex
                                flex-col
                                gap-3
                                pt-2
                                sm:flex-row
                            ">

                                <button
                                    type="button"
                                    onClick={
                                        handleChangePassword
                                    }
                                    disabled={saving}
                                    className="
                                        flex-1
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-[#0B6E4F]
                                        to-[#157A57]
                                        py-3
                                        font-semibold
                                        text-white
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >

                                    {saving
                                        ? "Updating..."
                                        : "Update Password"}

                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setPasswordMode(false)
                                    }
                                    className="
                                        rounded-xl
                                        bg-gray-100
                                        px-6
                                        py-3
                                        font-semibold
                                        text-gray-700
                                    "
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            <Footer />

        </div>

    );

}


// =====================================================
// PROFILE STAT CARD
// =====================================================

function ProfileStatCard({
    title,
    value,
    suffix,
    icon,
    iconClass,
}) {

    return (

        <div className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-gray-100
            bg-white
            p-6
            shadow-sm
            transition
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
        ">

            <div className="
                absolute
                left-0
                top-0
                h-1
                w-full
                bg-gradient-to-r
                from-emerald-500
                to-green-500
            " />


            <div className="
                flex
                items-start
                justify-between
            ">

                <div>

                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                    ">
                        {title}
                    </p>


                    <h2 className="
                        mt-2
                        text-3xl
                        font-black
                        text-gray-900
                    ">

                        {value}

                        {suffix && (

                            <span className="
                                ml-1
                                text-sm
                                font-semibold
                                text-gray-400
                            ">
                                {suffix}
                            </span>

                        )}

                    </h2>

                </div>


                <div
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        text-xl
                        transition
                        group-hover:scale-110
                        ${iconClass}
                    `}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}


// =====================================================
// INFO BOX
// =====================================================

function InfoBox({
    title,
    value,
}) {

    return (

        <div className="
            rounded-2xl
            bg-[#F8FBF9]
            p-5
        ">

            <p className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-gray-400
            ">
                {title}
            </p>


            <p className="
                mt-2
                text-lg
                font-bold
                text-gray-900
            ">
                {value}
            </p>

        </div>

    );

}


// =====================================================
// PASSWORD INPUT
// =====================================================

function PasswordInput({
    label,
    name,
    value,
    onChange,
}) {

    return (

        <div>

            <label className="
                text-sm
                font-semibold
                text-gray-700
            ">
                {label}
            </label>


            <input
                type="password"
                name={name}
                value={value}
                onChange={onChange}
                className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-green-600
                    focus:ring-4
                    focus:ring-green-100
                "
            />

        </div>

    );

}


export default Profile;