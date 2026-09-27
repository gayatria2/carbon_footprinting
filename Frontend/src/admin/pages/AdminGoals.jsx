import { useEffect, useState } from "react";

import {
  FaBullseye,
  FaSearch,
  FaEye,
  FaTrash,
  FaCalendarAlt,
  FaLeaf,
  FaTimes,
  FaUser,
  FaChartLine,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import {
  getAdminGoals,
  getAdminGoalById,
  deleteAdminGoal,
} from "../services/adminGoalService";


const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};


const AdminGoals = () => {

  const [goals, setGoals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =====================================================
  // LOAD GOALS
  // =====================================================

  const loadGoals = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getAdminGoals();

      if (response.data.success) {

        setGoals(
          response.data.data || []
        );

      }

    } catch (err) {

      console.error(
        "Admin Goals Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to load goals"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadGoals();
  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredGoals =
    goals.filter((goal) => {

      const value =
        search.toLowerCase();

      return (
        goal.full_name
          ?.toLowerCase()
          .includes(value) ||

        goal.email
          ?.toLowerCase()
          .includes(value) ||

        String(
          goal.target_reduction
        )
          .includes(value)
      );
    });


  // =====================================================
  // VIEW
  // =====================================================

  const handleView = async (id) => {

    try {

      const response =
        await getAdminGoalById(id);

      if (response.data.success) {

        setSelectedGoal(
          response.data.data
        );

        setShowModal(true);

      }

    } catch (err) {

      console.error(
        "Goal Details Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to load goal details"
      );
    }
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this goal?"
      );

    if (!confirmed) return;


    try {

      await deleteAdminGoal(id);

      setGoals((prev) =>
        prev.filter(
          (goal) =>
            goal.id !== id
        )
      );

      setSuccess(
        "Goal deleted successfully!"
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);

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
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-100">

        <AdminSidebar />

        <main className="lg:ml-72">

          <AdminNavbar />

          <div className="min-h-[70vh] flex items-center justify-center">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

              <p className="mt-4 text-slate-500 font-medium">
                Loading goals...
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-100">

      <AdminSidebar />

      <main className="lg:ml-72">

        <AdminNavbar />


        <div className="p-6 lg:p-8">

          {/* HEADER */}

          <div className="mb-8">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">

                <FaBullseye />

              </div>

              <div>

                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">

                  Goal Management

                </p>

                <h1 className="text-3xl font-bold text-slate-900">

                  User Goals

                </h1>

              </div>

            </div>


            <p className="text-slate-500 mt-3">

              Monitor carbon reduction goals
              created by users.

            </p>

          </div>


          {/* ALERT */}

          {error && (

            <div className="mb-5 flex justify-between items-center bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4">

              <span>
                {error}
              </span>

              <button
                onClick={() =>
                  setError("")
                }
              >
                <FaTimes />
              </button>

            </div>

          )}


          {success && (

            <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4">

              {success}

            </div>

          )}


          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Total Goals
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {goals.length}
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaBullseye />
                </div>

              </div>

            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Active Goals
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">

                    {
                      goals.filter(
                        (goal) =>
                          goal.status ===
                          "Active"
                      ).length
                    }

                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaChartLine />
                </div>

              </div>

            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Avg. Reduction Target
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">

                    {goals.length
                      ? (
                          goals.reduce(
                            (
                              sum,
                              goal
                            ) =>
                              sum +
                              Number(
                                goal.target_reduction ||
                                0
                              ),
                            0
                          ) /
                          goals.length
                        ).toFixed(1)
                      : "0.0"}

                    %

                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FaLeaf />
                </div>

              </div>

            </div>

          </div>


          {/* SEARCH */}

          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">

            <div className="relative max-w-md">

              <FaSearch className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                placeholder="Search user or target..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />

            </div>

          </div>


          {/* TABLE */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      User
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Reduction
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Duration
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Carbon
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredGoals.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="py-16 text-center text-slate-400"
                      >

                        <FaBullseye className="mx-auto text-3xl mb-3 opacity-40" />

                        No goals found.

                      </td>

                    </tr>

                  ) : (

                    filteredGoals.map(
                      (goal) => (

                        <tr
                          key={goal.id}
                          className="hover:bg-slate-50 transition"
                        >

                          {/* USER */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">

                                {goal.full_name
                                  ?.charAt(0)
                                  ?.toUpperCase()}

                              </div>


                              <div>

                                <p className="font-semibold text-slate-900">

                                  {
                                    goal.full_name
                                  }

                                </p>

                                <p className="text-xs text-slate-500">

                                  {
                                    goal.email
                                  }

                                </p>

                              </div>

                            </div>

                          </td>


                          {/* REDUCTION */}

                          <td className="px-6 py-5">

                            <span className="font-bold text-emerald-600">

                              {
                                goal.target_reduction
                              }%

                            </span>

                          </td>


                          {/* DURATION */}

                          <td className="px-6 py-5">

                            <div className="text-sm">

                              <p className="text-slate-700">
                                {
                                  formatDate(
                                    goal.start_date
                                  )
                                }
                              </p>

                              <p className="text-slate-400 text-xs mt-1">
                                to
                              </p>

                              <p className="text-slate-700">
                                {
                                  formatDate(
                                    goal.end_date
                                  )
                                }
                              </p>

                            </div>

                          </td>


                          {/* CARBON */}

                          <td className="px-6 py-5">

                            <span className="font-semibold text-slate-700">

                              {
                                Number(
                                  goal.current_carbon ||
                                  0
                                ).toFixed(2)
                              }{" "}
                              kg

                            </span>

                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${
                                goal.status ===
                                "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >

                              {
                                goal.status
                              }

                            </span>

                          </td>


                          {/* ACTIONS */}

                          <td className="px-6 py-5">

                            <div className="flex justify-end gap-2">

                              <button
                                onClick={() =>
                                  handleView(
                                    goal.id
                                  )
                                }
                                className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                                title="View"
                              >

                                <FaEye />

                              </button>


                              <button
                                onClick={() =>
                                  handleDelete(
                                    goal.id
                                  )
                                }
                                className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                                title="Delete"
                              >

                                <FaTrash />

                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>


      {/* ================================================= */}
      {/* VIEW MODAL */}
      {/* ================================================= */}

      {showModal &&
        selectedGoal && (

          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

              {/* HEADER */}

              <div className="p-6 border-b border-slate-100 flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Goal Details
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    User Goal
                  </h2>

                </div>


                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedGoal(null);
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
                >

                  <FaTimes />

                </button>

              </div>


              <div className="p-6 space-y-6">

                {/* USER */}

                <div className="bg-slate-50 rounded-2xl p-5">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">

                      <FaUser />

                    </div>


                    <div>

                      <p className="font-bold text-slate-900">
                        {
                          selectedGoal.goal
                            .full_name
                        }
                      </p>

                      <p className="text-sm text-slate-500">
                        {
                          selectedGoal.goal
                            .email
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* GOAL INFO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="rounded-2xl border border-slate-200 p-5">

                    <p className="text-sm text-slate-500">
                      Target Reduction
                    </p>

                    <p className="text-2xl font-bold text-emerald-600 mt-1">

                      {
                        selectedGoal.goal
                          .target_reduction
                      }%

                    </p>

                  </div>


                  <div className="rounded-2xl border border-slate-200 p-5">

                    <p className="text-sm text-slate-500">
                      Current Carbon
                    </p>

                    <p className="text-2xl font-bold text-slate-900 mt-1">

                      {
                        Number(
                          selectedGoal.currentCarbon ||
                          0
                        ).toFixed(2)
                      } kg

                    </p>

                  </div>


                  <div className="rounded-2xl border border-slate-200 p-5">

                    <p className="text-sm text-slate-500">
                      Start Date
                    </p>

                    <p className="font-semibold text-slate-900 mt-1">

                      {
                        formatDate(
                          selectedGoal.goal
                            .start_date
                        )
                      }

                    </p>

                  </div>


                  <div className="rounded-2xl border border-slate-200 p-5">

                    <p className="text-sm text-slate-500">
                      End Date
                    </p>

                    <p className="font-semibold text-slate-900 mt-1">

                      {
                        formatDate(
                          selectedGoal.goal
                            .end_date
                        )
                      }

                    </p>

                  </div>

                </div>


                {/* ACTIVITIES */}

                <div>

                  <h3 className="font-bold text-slate-900 mb-4">

                    User Activity History

                  </h3>


                  {selectedGoal.activities
                    ?.length === 0 ? (

                    <p className="text-sm text-slate-400 text-center py-8">
                      No activities recorded.
                    </p>

                  ) : (

                    <div className="space-y-3">

                      {selectedGoal.activities
                        ?.slice(0, 8)
                        .map(
                          (activity) => (

                            <div
                              key={
                                activity.id
                              }
                              className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3"
                            >

                              <div>

                                <p className="font-semibold text-slate-800">

                                  {
                                    activity.activity_type
                                  }

                                </p>

                                <p className="text-xs text-slate-400">

                                  {
                                    formatDate(
                                      activity.created_at
                                    )
                                  }

                                </p>

                              </div>


                              <span className="font-bold text-emerald-600">

                                {
                                  Number(
                                    activity.carbon_emission ||
                                    0
                                  ).toFixed(2)
                                }{" "}
                                kg

                              </span>

                            </div>

                          )
                        )}

                    </div>

                  )}

                </div>


                {/* DELETE */}

                <button
                  onClick={async () => {

                    await handleDelete(
                      selectedGoal.goal.id
                    );

                    setShowModal(false);

                  }}
                  className="w-full rounded-xl bg-red-50 text-red-600 py-3 font-semibold hover:bg-red-100 transition"
                >

                  <FaTrash className="inline mr-2" />

                  Delete Goal

                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
};

export default AdminGoals;