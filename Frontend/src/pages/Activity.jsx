import {
  useState,
  useEffect,
  useMemo,
} from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  addActivity,
  getActivities,
  deleteActivity,
  updateActivity,
} from "../services/activityService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaPlus,
  FaSearch,
  FaCar,
  FaBolt,
  FaLeaf,
  FaTrash,
  FaUtensils,
  FaCalendarAlt,
  FaEdit,
  FaTrashAlt,
  FaTimes,
  FaRoute,
  FaChartLine,
  FaTint,
  FaShoppingBag,
  FaPlane,
  FaTemperatureHigh,
  FaRecycle,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";


// =====================================================
// ACTIVITY CONFIG
// =====================================================

const CATEGORY_CONFIG = {
  Transportation: {
    icon: <FaCar />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
    fieldLabel: "Distance",
    unit: "KM",
  },

  Electricity: {
    icon: <FaBolt />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badge:
      "bg-blue-50 text-blue-700 border-blue-100",
    fieldLabel: "Electricity Usage",
    unit: "KWh",
  },

  Waste: {
    icon: <FaTrash />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    badge:
      "bg-orange-50 text-orange-700 border-orange-100",
    fieldLabel: "Waste Quantity",
    unit: "KG",
  },

  Food: {
    icon: <FaUtensils />,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    badge:
      "bg-red-50 text-red-700 border-red-100",
    fieldLabel: "Food Quantity",
    unit: "KG",
  },

  Water: {
    icon: <FaTint />,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    badge:
      "bg-cyan-50 text-cyan-700 border-cyan-100",
    fieldLabel: "Water Usage",
    unit: "Liters",
  },

  Shopping: {
    icon: <FaShoppingBag />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    badge:
      "bg-violet-50 text-violet-700 border-violet-100",
    fieldLabel: "Shopping Amount",
    unit: "₹",
  },

  Travel: {
    icon: <FaPlane />,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    badge:
      "bg-sky-50 text-sky-700 border-sky-100",
    fieldLabel: "Travel Distance",
    unit: "KM",
  },

  "Heating & Cooling": {
    icon: <FaTemperatureHigh />,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    badge:
      "bg-rose-50 text-rose-700 border-rose-100",
    fieldLabel: "Usage Time",
    unit: "Hours",
  },

  Recycling: {
    icon: <FaRecycle />,
    iconBg: "bg-lime-50",
    iconColor: "text-lime-700",
    badge:
      "bg-lime-50 text-lime-700 border-lime-100",
    fieldLabel: "Recycled Quantity",
    unit: "KG",
  },
};


// =====================================================
// CATEGORY LIST
// =====================================================

const CATEGORIES = [
  "Transportation",
  "Electricity",
  "Waste",
  "Food",
  "Water",
  "Shopping",
  "Travel",
  "Heating & Cooling",
  "Recycling",
];


// =====================================================
// INITIAL FORM
// =====================================================

const initialFormState = {
  activity_type: "",
  transport_type: "",
  distance: "",
  electricity: "",
  waste: "",
  food: "",
  water: "",
  shopping: "",
  travel: "",
  heating_cooling: "",
  recycling: "",
  activity_date: "",
};


function Activity() {

  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);

  const [activity, setActivity] =
    useState(initialFormState);

  const [editId, setEditId] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);


// =====================================================
// LOAD ACTIVITIES
// =====================================================

  const loadActivities = async () => {

    try {

      setLoading(true);

      const res =
        await getActivities();

      setActivities(
        res.data?.data || []
      );

    } catch (error) {

      console.error(
        "Error loading activities:",
        error?.response?.data || error
      );

      toast.error(
        "Unable to load activities"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadActivities();
  }, []);


// =====================================================
// HANDLE CHANGE
// =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    if (name === "activity_type") {

      setActivity({
        ...initialFormState,
        activity_type: value,
        activity_date:
          activity.activity_date,
      });

      return;
    }


    setActivity((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


// =====================================================
// FORM VALIDATION
// =====================================================

  const validateForm = () => {

    if (!activity.activity_type) {

      toast.error(
        "Please select an activity type"
      );

      return false;
    }


    if (!activity.activity_date) {

      toast.error(
        "Please select activity date"
      );

      return false;
    }


    if (
      activity.activity_type ===
      "Transportation"
    ) {

      if (!activity.transport_type) {

        toast.error(
          "Please select transport type"
        );

        return false;
      }


      if (
        Number(activity.distance) <= 0
      ) {

        toast.error(
          "Distance must be greater than 0"
        );

        return false;
      }

    }


    const numericFields = {
      Electricity: activity.electricity,
      Waste: activity.waste,
      Food: activity.food,
      Water: activity.water,
      Shopping: activity.shopping,
      Travel: activity.travel,
      "Heating & Cooling":
        activity.heating_cooling,
      Recycling: activity.recycling,
    };


    if (
      activity.activity_type !==
      "Transportation"
    ) {

      const value =
        numericFields[
          activity.activity_type
        ];

      if (
        value === "" ||
        Number(value) <= 0
      ) {

        toast.error(
          `Please enter valid ${CATEGORY_CONFIG[
            activity.activity_type
          ].fieldLabel.toLowerCase()}`
        );

        return false;
      }
    }

    return true;
  };


// =====================================================
// BUILD PAYLOAD
// =====================================================

  const buildPayload = (user) => {

    return {

      user_id:
        user.id,

      activity_type:
        activity.activity_type,

      transport_type:
        activity.activity_type ===
        "Transportation"
          ? activity.transport_type
          : "",

      distance:
        activity.activity_type ===
        "Transportation"
          ? Number(activity.distance || 0)
          : 0,

      electricity:
        activity.activity_type ===
        "Electricity"
          ? Number(
              activity.electricity || 0
            )
          : 0,

      waste:
        activity.activity_type ===
        "Waste"
          ? Number(
              activity.waste || 0
            )
          : 0,

      food:
        activity.activity_type ===
        "Food"
          ? Number(
              activity.food || 0
            )
          : 0,

      water:
        activity.activity_type ===
        "Water"
          ? Number(
              activity.water || 0
            )
          : 0,

      shopping:
        activity.activity_type ===
        "Shopping"
          ? Number(
              activity.shopping || 0
            )
          : 0,

      travel:
        activity.activity_type ===
        "Travel"
          ? Number(
              activity.travel || 0
            )
          : 0,

      heating_cooling:
        activity.activity_type ===
        "Heating & Cooling"
          ? Number(
              activity.heating_cooling ||
                0
            )
          : 0,

      recycling:
        activity.activity_type ===
        "Recycling"
          ? Number(
              activity.recycling || 0
            )
          : 0,

      activity_date:
        activity.activity_date,
    };
  };


// =====================================================
// SUBMIT
// =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    const storedUser =
      localStorage.getItem("user");


    let user = null;

    try {

      user =
        storedUser
          ? JSON.parse(storedUser)
          : null;

    } catch (error) {

      console.error(
        "User Parse Error:",
        error
      );

    }


    if (!user?.id) {

      navigate("/login");

      return;
    }


    if (!validateForm()) {
      return;
    }


    try {

      setSaving(true);


      const payload =
        buildPayload(user);


      if (editId) {

        await updateActivity(
          editId,
          payload
        );

        toast.success(
          "Activity updated successfully"
        );

      } else {

        await addActivity(
          payload
        );

        toast.success(
          "Activity added successfully"
        );
      }


      setActivity(
        initialFormState
      );

      setEditId(null);

      setShowForm(false);

      await loadActivities();

    } catch (error) {

      console.error(
        "Save Activity Error:",
        error?.response?.data ||
          error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to save activity"
      );

    } finally {

      setSaving(false);

    }
  };


// =====================================================
// DELETE
// =====================================================

  const handleDelete = async () => {

    if (!deleteId) {
      return;
    }


    try {

      await deleteActivity(
        deleteId
      );

      toast.success(
        "Activity deleted successfully"
      );

      setDeleteId(null);

      await loadActivities();

    } catch (error) {

      console.error(
        "Delete Failed:",
        error?.response?.data ||
          error
      );

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );

    }
  };


// =====================================================
// EDIT
// =====================================================

  const handleEditClick = (
    item
  ) => {

    setActivity({

      activity_type:
        item.activity_type || "",

      transport_type:
        item.transport_type || "",

      distance:
        item.distance ?? "",

      electricity:
        item.electricity ?? "",

      waste:
        item.waste ?? "",

      food:
        item.food ?? "",

      water:
        item.water ?? "",

      shopping:
        item.shopping ?? "",

      travel:
        item.travel ?? "",

      heating_cooling:
        item.heating_cooling ?? "",

      recycling:
        item.recycling ?? "",

      activity_date:
        item.activity_date || "",
    });


    setEditId(item.id);

    setShowForm(true);


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


// =====================================================
// CANCEL
// =====================================================

  const handleCancelForm = () => {

    setEditId(null);

    setActivity(
      initialFormState
    );

    setShowForm(false);
  };


// =====================================================
// SEARCH + FILTER
// =====================================================

  const filteredActivities =
    useMemo(() => {

      return activities.filter(
        (item) => {

          const search =
            searchTerm
              .toLowerCase()
              .trim();


          const searchableText = [
            item.activity_type,
            item.transport_type,
            item.activity_date,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


          const matchesSearch =
            searchableText.includes(
              search
            );


          const matchesCategory =
            selectedCategory ===
              "All Categories" ||
            item.activity_type ===
              selectedCategory;


          return (
            matchesSearch &&
            matchesCategory
          );

        }
      );

    }, [
      activities,
      searchTerm,
      selectedCategory,
    ]);


// =====================================================
// SUMMARY
// =====================================================

  const totalActivities =
    activities.length;


  const totalCarbon =
    activities.reduce(
      (sum, item) =>
        sum +
        Number(
          item.carbon_emission || 0
        ),
      0
    );


  const activeCategories =
    new Set(
      activities.map(
        (item) =>
          item.activity_type
      )
    ).size;


  const latestActivity =
    activities.length > 0
      ? activities[0]
      : null;


// =====================================================
// DATE FORMAT
// =====================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "-";
    }


    const d =
      new Date(date);


    if (
      Number.isNaN(
        d.getTime()
      )
    ) {
      return date;
    }


    return d.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


// =====================================================
// CATEGORY ICON
// =====================================================

  const getActivityIcon = (
    type
  ) => {

    return (
      CATEGORY_CONFIG[type]
        ?.icon || <FaLeaf />
    );
  };


// =====================================================
// CATEGORY STYLE
// =====================================================

  const getCategoryStyle = (
    type
  ) => {

    return (
      CATEGORY_CONFIG[type]
        ?.badge ||
      "bg-slate-50 text-slate-700 border-slate-100"
    );
  };


// =====================================================
// DETAILS
// =====================================================

  const getActivityDetails = (
    item
  ) => {

    switch (
      item.activity_type
    ) {

      case "Transportation":
        return `${item.transport_type || "Transport"} • ${item.distance || 0} KM`;

      case "Electricity":
        return `${item.electricity || 0} KWh`;

      case "Waste":
        return `${item.waste || 0} KG`;

      case "Food":
        return `${item.food || 0} KG`;

      case "Water":
        return `${item.water || 0} Liters`;

      case "Shopping":
        return `₹${Number(item.shopping || 0).toFixed(2)}`;

      case "Travel":
        return `${item.travel || 0} KM`;

      case "Heating & Cooling":
        return `${item.heating_cooling || 0} Hours`;

      case "Recycling":
        return `${item.recycling || 0} KG`;

      default:
        return "-";
    }
  };


// =====================================================
// FORM FIELD
// =====================================================

  const renderInputField = () => {

    const type =
      activity.activity_type;


    if (
      !type ||
      type === "Transportation"
    ) {
      return null;
    }


    const config =
      CATEGORY_CONFIG[type];


    const fieldMap = {
      Electricity: "electricity",
      Waste: "waste",
      Food: "food",
      Water: "water",
      Shopping: "shopping",
      Travel: "travel",
      "Heating & Cooling":
        "heating_cooling",
      Recycling: "recycling",
    };


    const fieldName =
      fieldMap[type];


    if (!fieldName) {
      return null;
    }


    const placeholders = {
      Electricity:
        "Enter electricity consumption",

      Waste:
        "Enter waste quantity",

      Food:
        "Enter food quantity",

      Water:
        "Enter water usage",

      Shopping:
        "Enter shopping amount",

      Travel:
        "Enter travel distance",

      "Heating & Cooling":
        "Enter usage hours",

      Recycling:
        "Enter recycled quantity",
    };


    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

        <label className="mb-2 block text-sm font-bold text-slate-700">
          {config.fieldLabel}
        </label>

        <div className="relative">

          <input
            type="number"
            name={fieldName}
            value={
              activity[fieldName]
            }
            onChange={handleChange}
            placeholder={
              placeholders[type]
            }
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            required
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
            {config.unit}
          </span>

        </div>

        <p className="mt-2 text-xs text-slate-400">
          Enter the amount you want to track.
        </p>

      </div>
    );
  };


// =====================================================
// RETURN
// =====================================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F4F8F5]">

        <div className="relative overflow-hidden">

          {/* BACKGROUND */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-green-100/40 blur-3xl" />


          <div className="relative mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 text-lg text-white shadow-lg">
                    <FaLeaf />
                  </div>

                  <div>

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
                      Carbon Tracker
                    </p>

                    <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      Activities
                    </h1>

                  </div>

                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Track your daily lifestyle choices and understand how they affect your carbon footprint.
                </p>

              </div>


              <button
                type="button"
                onClick={() => {

                  setEditId(null);

                  setActivity(
                    initialFormState
                  );

                  setShowForm(true);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });

                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#087F55] to-[#0AA76B] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <FaPlus />
                Add Activity
              </button>

            </div>


            {/* ================================================= */}
            {/* SUMMARY */}
            {/* ================================================= */}

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
                title="Total Activities"
                value={totalActivities}
                icon={<FaCalendarAlt />}
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
                description="Recorded activities"
              />

              <SummaryCard
                title="Total CO₂"
                value={totalCarbon.toFixed(2)}
                suffix="kg"
                icon={<FaChartLine />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
                description="Combined carbon impact"
              />

              <SummaryCard
                title="Active Categories"
                value={activeCategories}
                icon={<FaLeaf />}
                iconBg="bg-green-50"
                iconColor="text-green-600"
                description="Categories you've used"
              />

              <SummaryCard
                title="Latest Activity"
                value={
                  latestActivity
                    ? latestActivity.activity_type
                    : "None"
                }
                icon={
                  latestActivity
                    ? getActivityIcon(
                        latestActivity.activity_type
                      )
                    : <FaLeaf />
                }
                iconBg="bg-violet-50"
                iconColor="text-violet-600"
                description={
                  latestActivity
                    ? formatDate(
                        latestActivity.activity_date
                      )
                    : "No activity yet"
                }
                textValue
              />

            </div>


            {/* ================================================= */}
            {/* ADD / EDIT FORM */}
            {/* ================================================= */}

            {showForm && (

              <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)]">

                <div className="border-b border-slate-100 bg-gradient-to-r from-[#063B2A] to-[#087F55] px-6 py-6 text-white sm:px-8">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-200">
                        Carbon Tracker
                      </p>

                      <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                        {editId
                          ? "Update Activity"
                          : "Add New Activity"}
                      </h2>

                      <p className="mt-2 max-w-xl text-sm text-green-100">
                        Record an activity and keep your sustainability data up to date.
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={
                        handleCancelForm
                      }
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
                    >
                      <FaTimes />
                    </button>

                  </div>

                </div>


                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-5 p-6 sm:p-8 md:grid-cols-2"
                >

                  {/* ACTIVITY TYPE */}

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Activity Type
                    </label>

                    <select
                      name="activity_type"
                      value={
                        activity.activity_type
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                      required
                    >

                      <option value="">
                        Select Activity
                      </option>

                      {CATEGORIES.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </div>


                  {/* TRANSPORT */}

                  {activity.activity_type ===
                    "Transportation" && (

                    <>
                      <div>

                        <label className="mb-2 block text-sm font-bold text-slate-700">
                          Transport Type
                        </label>

                        <select
                          name="transport_type"
                          value={
                            activity.transport_type
                          }
                          onChange={
                            handleChange
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                          required
                        >

                          <option value="">
                            Select Transport
                          </option>

                          <option value="Bike">
                            Bike
                          </option>

                          <option value="Car">
                            Car
                          </option>

                          <option value="Bus">
                            Bus
                          </option>

                          <option value="Train">
                            Train
                          </option>

                        </select>

                      </div>


                      <div>

                        <label className="mb-2 block text-sm font-bold text-slate-700">
                          Distance
                        </label>

                        <div className="relative">

                          <input
                            type="number"
                            name="distance"
                            value={
                              activity.distance
                            }
                            onChange={
                              handleChange
                            }
                            placeholder="Enter distance"
                            min="0"
                            step="0.1"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-16 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            required
                          />

                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                            KM
                          </span>

                        </div>

                      </div>
                    </>
                  )}


                  {/* CATEGORY INPUT */}

                  {renderInputField()}


                  {/* DATE */}

                  <div>

                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Activity Date
                    </label>

                    <input
                      type="date"
                      name="activity_date"
                      value={
                        activity.activity_date
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                      required
                    />

                  </div>


                  {/* BUTTONS */}

                  <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row">

                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 rounded-2xl bg-gradient-to-r from-[#087F55] to-[#0AA76B] py-3.5 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {saving
                        ? "Saving..."
                        : editId
                        ? "Update Activity"
                        : "Save Activity"}

                    </button>


                    <button
                      type="button"
                      onClick={
                        handleCancelForm
                      }
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-7 py-3.5 font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            )}


            {/* ================================================= */}
            {/* HISTORY */}
            {/* ================================================= */}

            <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)]">

              {/* HEADER */}

              <div className="border-b border-slate-100 p-6 sm:p-8">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                  <div>

                    <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                      Your Carbon Activities
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Review and manage your recorded activities.
                    </p>

                  </div>


                  <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">
                    {filteredActivities.length} Records
                  </div>

                </div>


                {/* SEARCH */}

                <div className="mt-6 flex flex-col gap-3 md:flex-row">

                  <div className="relative flex-1">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={
                        searchTerm
                      }
                      onChange={(e) =>
                        setSearchTerm(
                          e.target.value
                        )
                      }
                      placeholder="Search activity, transport or date..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />

                  </div>


                  <select
                    value={
                      selectedCategory
                    }
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 md:w-64"
                  >

                    <option>
                      All Categories
                    </option>

                    {CATEGORIES.map(
                      (category) => (
                        <option
                          key={category}
                        >
                          {category}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>


              {/* TABLE */}

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead>

                    <tr className="border-b border-slate-100 bg-[#F8FBF9]">

                      <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Activity
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Category
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Details
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        CO₂ Impact
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Date
                      </th>

                      <th className="px-6 py-4 text-right text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-slate-100">

                    {loading ? (

                      <tr>

                        <td
                          colSpan="6"
                          className="py-20 text-center"
                        >

                          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

                          <p className="mt-4 text-sm font-semibold text-slate-500">
                            Loading activities...
                          </p>

                        </td>

                      </tr>

                    ) : filteredActivities.length >
                      0 ? (

                      filteredActivities.map(
                        (item) => {

                          const config =
                            CATEGORY_CONFIG[
                              item.activity_type
                            ];


                          return (

                            <tr
                              key={item.id}
                              className="group transition hover:bg-[#F8FBF9]"
                            >

                              {/* ACTIVITY */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                  <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                      config?.iconBg ||
                                      "bg-slate-50"
                                    } ${
                                      config?.iconColor ||
                                      "text-slate-600"
                                    }`}
                                  >
                                    {getActivityIcon(
                                      item.activity_type
                                    )}
                                  </div>


                                  <div>

                                    <p className="font-extrabold text-slate-900">

                                      {item.activity_type ===
                                      "Transportation"
                                        ? item.transport_type ||
                                          "Transport"
                                        : item.activity_type}

                                    </p>

                                    <p className="mt-1 text-[11px] font-medium text-slate-400">
                                      Activity #{item.id}
                                    </p>

                                  </div>

                                </div>

                              </td>


                              {/* CATEGORY */}

                              <td className="px-6 py-5">

                                <span
                                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getCategoryStyle(
                                    item.activity_type
                                  )}`}
                                >
                                  {item.activity_type}
                                </span>

                              </td>


                              {/* DETAILS */}

                              <td className="px-6 py-5 text-sm font-medium text-slate-600">

                                {getActivityDetails(
                                  item
                                )}

                              </td>


                              {/* CARBON */}

                              <td className="px-6 py-5">

                                <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">

                                  <FaLeaf className="text-emerald-600" />

                                  <span className="font-extrabold text-emerald-700">

                                    {Number(
                                      item.carbon_emission ||
                                        0
                                    ).toFixed(2)}

                                  </span>

                                  <span className="text-xs font-semibold text-slate-400">
                                    kg
                                  </span>

                                </div>

                              </td>


                              {/* DATE */}

                              <td className="px-6 py-5 text-sm font-medium text-slate-600">

                                {formatDate(
                                  item.activity_date
                                )}

                              </td>


                              {/* ACTIONS */}

                              <td className="px-6 py-5">

                                <div className="flex justify-end gap-2">

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEditClick(
                                        item
                                      )
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-100"
                                    title="Edit activity"
                                  >
                                    <FaEdit />
                                  </button>


                                  <button
                                    type="button"
                                    onClick={() =>
                                      setDeleteId(
                                        item.id
                                      )
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100"
                                    title="Delete activity"
                                  >
                                    <FaTrashAlt />
                                  </button>

                                </div>

                              </td>

                            </tr>
                          );
                        }
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="6"
                          className="py-20 text-center"
                        >

                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600">
                            <FaLeaf />
                          </div>

                          <h3 className="mt-5 text-lg font-extrabold text-slate-800">
                            No Activities Found
                          </h3>

                          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {searchTerm ||
                            selectedCategory !==
                              "All Categories"
                              ? "Try changing your search or category filter."
                              : "Add your first activity to start tracking your carbon footprint."}
                          </p>

                          {!searchTerm &&
                            selectedCategory ===
                              "All Categories" && (

                              <button
                                type="button"
                                onClick={() =>
                                  setShowForm(true)
                                }
                                className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
                              >
                                Add First Activity
                              </button>

                            )}

                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        </div>

      </main>


      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteId && (

        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-[2rem] border border-white/20 bg-white p-7 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500">
              <FaExclamationTriangle />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              Delete Activity?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This activity will be permanently removed from your activity history.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-red-600"
              >
                Delete Activity
              </button>

            </div>

          </div>

        </div>

      )}


      <Footer />

    </>
  );
}


// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  title,
  value,
  suffix,
  icon,
  iconBg,
  iconColor,
  description,
  textValue = false,
}) {

  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] border border-slate-100 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)]">

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-green-500" />

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h3
            className={`mt-3 ${
              textValue
                ? "truncate text-xl"
                : "text-3xl"
            } font-black tracking-tight text-slate-900`}
          >
            {value}

            {suffix && (
              <span className="ml-1 text-sm font-bold text-slate-400">
                {suffix}
              </span>
            )}
          </h3>

          <p className="mt-2 text-xs font-medium text-slate-400">
            {description}
          </p>

        </div>


        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor} text-lg transition duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


export default Activity;