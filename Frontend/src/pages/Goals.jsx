import { useEffect, useState } from "react";

import {
  FaBullseye,
  FaCalendarAlt,
  FaLeaf,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaArrowDown,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
} from "../services/goalService";

function Goals() {
  // =====================================================
  // STATE
  // =====================================================

  const [goalData, setGoalData] = useState(null);

  const [form, setForm] = useState({
    target_reduction: "",
    start_date: "",
    end_date: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // USER
  // =====================================================

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const userId = user?.id;

  // =====================================================
  // LOAD GOAL
  // =====================================================

  useEffect(() => {
    if (userId) {
      loadGoal();
    } else {
      setLoading(false);

      setError(
        "User not found. Please login again."
      );
    }
  }, [userId]);

  const loadGoal = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getGoal(userId);

      console.log("Goal Data:", res.data);

      setGoalData(res.data?.data || null);

    } catch (err) {
      console.error("Goal Load Error:", err);

      setError(
        err?.response?.data?.message ||
        "Failed to load goal"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // CREATE GOAL
  // =====================================================

  const handleCreateGoal = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.target_reduction) {
      setError("Please enter target reduction");
      return;
    }

    if (!form.start_date) {
      setError("Please select start date");
      return;
    }

    if (!form.end_date) {
      setError("Please select end date");
      return;
    }

    if (
      new Date(form.end_date) <=
      new Date(form.start_date)
    ) {
      setError(
        "End date must be after start date"
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        user_id: Number(userId),
        target_reduction:
          Number(form.target_reduction),
        start_date: form.start_date,
        end_date: form.end_date,
      };

      const res = await createGoal(payload);

      console.log("Goal Created:", res.data);

      setSuccess(
        "Goal created successfully!"
      );

      setForm({
        target_reduction: "",
        start_date: "",
        end_date: "",
      });

      await loadGoal();

    } catch (err) {
      console.error(
        "Create Goal Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to create goal"
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = () => {
    if (!goalData?.goal) return;

    setForm({
      target_reduction:
        goalData.goal.target_reduction || "",

      start_date: formatDateForInput(
        goalData.goal.start_date
      ),

      end_date: formatDateForInput(
        goalData.goal.end_date
      ),
    });

    setEditMode(true);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdateGoal = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.target_reduction) {
      setError("Please enter target reduction");
      return;
    }

    if (
      !form.start_date ||
      !form.end_date
    ) {
      setError(
        "Please select both dates"
      );
      return;
    }

    if (
      new Date(form.end_date) <=
      new Date(form.start_date)
    ) {
      setError(
        "End date must be after start date"
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        target_reduction:
          Number(form.target_reduction),
        start_date: form.start_date,
        end_date: form.end_date,
      };

      await updateGoal(
        goalData.goal.id,
        payload
      );

      setSuccess(
        "Goal updated successfully!"
      );

      setEditMode(false);

      setForm({
        target_reduction: "",
        start_date: "",
        end_date: "",
      });

      await loadGoal();

    } catch (err) {
      console.error(
        "Update Goal Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to update goal"
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {
    if (!goalData?.goal?.id) return;

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this goal?"
      );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      await deleteGoal(
        goalData.goal.id
      );

      setGoalData(null);

      setSuccess(
        "Goal deleted successfully!"
      );

    } catch (err) {
      console.error(
        "Delete Goal Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to delete goal"
      );
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {
    setEditMode(false);

    setForm({
      target_reduction: "",
      start_date: "",
      end_date: "",
    });

    setError("");
    setSuccess("");
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    return d.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatDateForInput = (date) => {
    if (!date) return "";

    return new Date(date)
      .toISOString()
      .split("T")[0];
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#F4F8F5] flex items-center justify-center">

          <div className="text-center">

            <div className="w-14 h-14 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500 font-semibold">
              Loading Goal...
            </p>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  // =====================================================
  // VALUES
  // =====================================================

  const progress = Number(
    goalData?.progress?.progressPercentage || 0
  );

  const startingCarbon = Number(
    goalData?.progress?.startingCarbon || 0
  );

  const currentCarbon = Number(
    goalData?.progress?.currentCarbon || 0
  );

  const targetCarbon = Number(
    goalData?.progress?.targetCarbon || 0
  );

  const remainingDays = Number(
    goalData?.progress?.remainingDays || 0
  );

  const dailyReductionRequired =
    Number(
      goalData?.progress?.dailyReductionRequired ||
      0
    );

  const progressStatus =
    goalData?.progress?.status ||
    "No Goal";

  const targetReduction =
    Number(
      goalData?.goal?.target_reduction || 0
    );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <Navbar />

      <main className="min-h-screen bg-[#F4F8F5]">

        {/* ================================================= */}
        {/* HERO HEADER */}
        {/* ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] text-white">

          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-28 -left-20 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-12">

            <div className="flex items-center justify-between gap-6">

              <div>

                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-4 border border-white/10">

                  <FaBullseye />

                  Carbon Reduction Goals

                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold">
                  Your Goals
                </h1>

                <p className="mt-3 text-green-50 text-lg max-w-2xl">
                  Set a carbon reduction target and
                  track your progress toward a greener lifestyle.
                </p>

              </div>

              <div className="hidden md:flex w-24 h-24 rounded-3xl bg-white/10 border border-white/20 items-center justify-center text-5xl">

                <FaBullseye />

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* ================================================= */}
          {/* ALERTS */}
          {/* ================================================= */}

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 text-green-700 px-5 py-4 font-medium">
              {success}
            </div>
          )}


          {/* ================================================= */}
          {/* CREATE / EDIT */}
          {/* ================================================= */}

          {(!goalData || editMode) && (

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">

              <div className="mb-7">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-xl">

                    <FaBullseye />

                  </div>

                  <div>

                    <h2 className="text-2xl font-extrabold text-gray-900">

                      {editMode
                        ? "Update Your Goal"
                        : "Create New Goal"}

                    </h2>

                    <p className="text-gray-500 mt-1">

                      Choose how much you want to
                      reduce your carbon footprint.

                    </p>

                  </div>

                </div>

              </div>


              <form
                onSubmit={
                  editMode
                    ? handleUpdateGoal
                    : handleCreateGoal
                }
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >

                {/* TARGET */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Target Reduction (%)

                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      name="target_reduction"
                      value={
                        form.target_reduction
                      }
                      onChange={handleChange}
                      min="1"
                      max="99"
                      step="1"
                      placeholder="Example: 20"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-10 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                    <span className="absolute right-4 top-3.5 text-gray-400 font-semibold">
                      %
                    </span>

                  </div>

                </div>


                {/* START DATE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Start Date

                  </label>

                  <div className="relative">

                    <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />

                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 pl-11 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                </div>


                {/* END DATE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    End Date

                  </label>

                  <div className="relative">

                    <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />

                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 pl-11 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                </div>


                {/* BUTTONS */}

                <div className="md:col-span-3 flex flex-col sm:flex-row gap-4">

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-[#0B6E4F] to-[#08A66A] text-white py-4 font-bold shadow-lg hover:scale-[1.01] transition disabled:opacity-60"
                  >

                    {saving
                      ? "Saving..."
                      : editMode
                      ? "Update Goal"
                      : "Create Goal"}

                  </button>


                  {editMode && (

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="sm:w-48 rounded-2xl border border-gray-300 bg-white py-4 font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>
          )}


          {/* ================================================= */}
          {/* NO GOAL */}
          {/* ================================================= */}

          {!goalData && !editMode && (

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">

              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto">

                <FaBullseye />

              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mt-6">

                No Goal Set Yet

              </h2>

              <p className="text-gray-500 mt-2">

                Create your first carbon reduction
                goal to start tracking progress.

              </p>

            </div>
          )}


          {/* ================================================= */}
          {/* CURRENT GOAL */}
          {/* ================================================= */}

          {goalData && !editMode && (

            <>

              {/* GOAL HEADER */}

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">

                        <FaBullseye />

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
                          Current Goal
                        </p>

                        <h2 className="text-3xl font-extrabold text-gray-900">

                          Reduce Carbon by{" "}
                          {targetReduction}%

                        </h2>

                      </div>

                    </div>


                    <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">

                      <span>
                        Start:{" "}
                        <b className="text-gray-800">

                          {formatDate(
                            goalData.goal.start_date
                          )}

                        </b>
                      </span>


                      <span>
                        End:{" "}
                        <b className="text-gray-800">

                          {formatDate(
                            goalData.goal.end_date
                          )}

                        </b>
                      </span>

                    </div>

                  </div>


                  <div className="flex gap-3">

                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 text-blue-700 px-5 py-3 font-semibold hover:bg-blue-100"
                    >

                      <FaEdit />

                      Edit

                    </button>


                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 text-red-600 px-5 py-3 font-semibold hover:bg-red-100"
                    >

                      <FaTrash />

                      Delete

                    </button>

                  </div>

                </div>

              </div>


              {/* PROGRESS */}

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Goal Progress
                    </p>

                    <h2 className="text-3xl font-extrabold text-gray-900 mt-1">

                      {progress.toFixed(1)}%

                    </h2>

                  </div>


                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                      progressStatus ===
                      "Goal Achieved"

                        ? "bg-green-100 text-green-700"

                        : progressStatus ===
                          "Behind"

                        ? "bg-red-100 text-red-700"

                        : "bg-blue-100 text-blue-700"
                    }`}
                  >

                    {progressStatus ===
                    "Goal Achieved" ? (

                      <FaCheckCircle />

                    ) : progressStatus ===
                      "Behind" ? (

                      <FaArrowDown />

                    ) : (

                      <FaClock />

                    )}

                    {progressStatus}

                  </div>

                </div>


                <div className="w-full h-5 rounded-full bg-gray-100 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0B6E4F] to-[#08A66A] transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        Math.max(progress, 0),
                        100
                      )}%`,
                    }}
                  ></div>

                </div>


                <p className="text-gray-500 text-sm mt-3">

                  Your target is to reduce carbon
                  emissions by{" "}

                  <span className="font-semibold text-gray-800">

                    {targetReduction}%

                  </span>.

                </p>

              </div>


              {/* STATS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* STARTING CARBON */}

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-xl mb-4">

                    <FaLeaf />

                  </div>

                  <p className="text-sm text-gray-500">
                    Starting Carbon
                  </p>

                  <h3 className="text-2xl font-extrabold text-gray-900 mt-2">

                    {startingCarbon.toFixed(2)} kg

                  </h3>

                </div>


                {/* CURRENT CARBON */}

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl mb-4">

                    <FaArrowDown />

                  </div>

                  <p className="text-sm text-gray-500">
                    Current Carbon
                  </p>

                  <h3 className="text-2xl font-extrabold text-gray-900 mt-2">

                    {currentCarbon.toFixed(2)} kg

                  </h3>

                </div>


                {/* TARGET CARBON */}

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-xl mb-4">

                    <FaBullseye />

                  </div>

                  <p className="text-sm text-gray-500">
                    Target Carbon
                  </p>

                  <h3 className="text-2xl font-extrabold text-gray-900 mt-2">

                    {targetCarbon.toFixed(2)} kg

                  </h3>

                </div>


                {/* DAYS REMAINING */}

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl mb-4">

                    <FaClock />

                  </div>

                  <p className="text-sm text-gray-500">
                    Days Remaining
                  </p>

                  <h3 className="text-2xl font-extrabold text-gray-900 mt-2">

                    {remainingDays}

                  </h3>

                </div>

              </div>


              {/* DAILY REDUCTION */}

              <div className="mt-8 bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] rounded-3xl p-8 text-white shadow-xl">

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl flex-shrink-0">

                    <FaArrowDown />

                  </div>


                  <div>

                    <h2 className="text-2xl font-extrabold">
                      Daily Reduction Needed
                    </h2>

                    <p className="text-green-50 mt-2">

                      To reach your target, you need
                      to reduce approximately

                    </p>

                    <p className="text-4xl font-extrabold mt-3">

                      {dailyReductionRequired.toFixed(2)}

                      <span className="text-lg ml-2 font-medium">
                        kg CO₂ per day
                      </span>

                    </p>

                  </div>

                </div>

              </div>

            </>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Goals;