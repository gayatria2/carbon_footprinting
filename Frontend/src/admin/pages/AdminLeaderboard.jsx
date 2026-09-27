import { useEffect, useState } from "react";

import {
  FaTrophy,
  FaLeaf,
  FaUsers,
  FaChartLine,
  FaMedal,
  FaSearch,
  FaFire,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import {
  getAdminLeaderboard,
  getAdminLeaderboardSummary,
} from "../services/adminLeaderboardService";


const AdminLeaderboard = () => {

  const [leaderboard, setLeaderboard] =
    useState([]);

  const [summary, setSummary] =
    useState({
      total_users: 0,
      total_activities: 0,
      total_carbon: 0,
      average_carbon: 0,
    });

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    const loadLeaderboard = async () => {

      try {

        setLoading(true);
        setError("");


        const [
          leaderboardResponse,
          summaryResponse,
        ] = await Promise.all([

          getAdminLeaderboard(),

          getAdminLeaderboardSummary(),

        ]);


        if (
          leaderboardResponse.data.success
        ) {

          setLeaderboard(
            leaderboardResponse.data.data || []
          );

        }


        if (
          summaryResponse.data.success
        ) {

          setSummary(
            summaryResponse.data.data || {}
          );

        }

      } catch (err) {

        console.error(
          "Admin Leaderboard Error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          "Failed to load leaderboard"
        );

      } finally {

        setLoading(false);

      }

    };


    loadLeaderboard();

  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredUsers =
    leaderboard.filter((user) => {

      const value =
        search.toLowerCase();

      return (

        user.full_name
          ?.toLowerCase()
          .includes(value)

        ||

        user.email
          ?.toLowerCase()
          .includes(value)

      );

    });


  // =====================================================
  // TOP USERS
  // =====================================================

  const first =
    leaderboard[0];

  const second =
    leaderboard[1];

  const third =
    leaderboard[2];


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-100">

        <AdminSidebar />

        <main className="lg:ml-72">

          <AdminNavbar />

          <div className="min-h-[75vh] flex items-center justify-center">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

              <p className="mt-4 text-slate-500 font-medium">
                Loading leaderboard...
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


          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-8">

            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
              Performance
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Community Leaderboard
            </h1>

            <p className="text-slate-500 mt-2">
              Compare users based on their
              recorded carbon footprint.
            </p>

          </div>


          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {error && (

            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 px-5 py-4">

              {error}

            </div>

          )}


          {/* ================================================= */}
          {/* SUMMARY CARDS */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">


            {/* USERS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Total Users
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {Number(
                      summary.total_users || 0
                    )}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                  <FaUsers />

                </div>

              </div>

            </div>


            {/* ACTIVITIES */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Total Activities
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {Number(
                      summary.total_activities || 0
                    )}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">

                  <FaChartLine />

                </div>

              </div>

            </div>


            {/* CARBON */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Total Carbon
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">

                    {Number(
                      summary.total_carbon || 0
                    ).toFixed(2)}

                    <span className="text-sm text-slate-400 ml-1">
                      kg
                    </span>

                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">

                  <FaLeaf />

                </div>

              </div>

            </div>


            {/* AVERAGE */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Average Carbon
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">

                    {Number(
                      summary.average_carbon || 0
                    ).toFixed(2)}

                    <span className="text-sm text-slate-400 ml-1">
                      kg
                    </span>

                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">

                  <FaFire />

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* TOP 3 */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


            {/* SECOND */}

            {second && (

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

                <div className="flex justify-center">

                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-2xl">

                    <FaMedal />

                  </div>

                </div>


                <div className="text-center mt-4">

                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    2nd Place
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-2">

                    {second.full_name}

                  </h3>

                  <p className="text-sm text-slate-500 mt-1">

                    {second.email}

                  </p>


                  <div className="mt-5">

                    <p className="text-3xl font-extrabold text-emerald-600">

                      {Number(
                        second.total_carbon
                      ).toFixed(2)}

                      <span className="text-sm text-slate-400 ml-1">
                        kg
                      </span>

                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Total Carbon
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* FIRST */}

            {first && (

              <div className="bg-gradient-to-br from-[#063B2A] to-[#087F55] text-white rounded-3xl shadow-xl p-7 md:-translate-y-3">

                <div className="flex justify-center">

                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl">

                    <FaTrophy />

                  </div>

                </div>


                <div className="text-center mt-4">

                  <p className="text-xs font-bold uppercase tracking-widest text-green-100">
                    🏆 Top Performer
                  </p>

                  <h3 className="text-2xl font-extrabold mt-2">

                    {first.full_name}

                  </h3>

                  <p className="text-sm text-green-100 mt-1">

                    {first.email}

                  </p>


                  <div className="mt-5">

                    <p className="text-4xl font-extrabold">

                      {Number(
                        first.total_carbon
                      ).toFixed(2)}

                      <span className="text-sm text-green-100 ml-1">
                        kg
                      </span>

                    </p>

                    <p className="text-xs text-green-100 mt-1">
                      Lowest Carbon Footprint
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* THIRD */}

            {third && (

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

                <div className="flex justify-center">

                  <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-2xl">

                    <FaMedal />

                  </div>

                </div>


                <div className="text-center mt-4">

                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    3rd Place
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-2">

                    {third.full_name}

                  </h3>

                  <p className="text-sm text-slate-500 mt-1">

                    {third.email}

                  </p>


                  <div className="mt-5">

                    <p className="text-3xl font-extrabold text-emerald-600">

                      {Number(
                        third.total_carbon
                      ).toFixed(2)}

                      <span className="text-sm text-slate-400 ml-1">
                        kg
                      </span>

                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Total Carbon
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">

            <div className="relative max-w-lg">

              <FaSearch className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search user by name or email..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />

            </div>

          </div>


          {/* ================================================= */}
          {/* TABLE */}
          {/* ================================================= */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">

                  <FaTrophy />

                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Leaderboard Rankings
                  </h2>

                  <p className="text-sm text-slate-500">
                    Lowest carbon footprint ranks higher
                  </p>

                </div>

              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Rank
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      User
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Activities
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Total Carbon
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Avg / Activity
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredUsers.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-16 text-slate-400"
                      >

                        <FaTrophy className="mx-auto text-3xl opacity-40 mb-3" />

                        No users found.

                      </td>

                    </tr>

                  ) : (

                    filteredUsers.map(
                      (user) => (

                        <tr
                          key={user.id}
                          className="hover:bg-slate-50 transition"
                        >

                          {/* RANK */}

                          <td className="px-6 py-5">

                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                                user.rank === 1
                                  ? "bg-yellow-100 text-yellow-700"
                                  : user.rank === 2
                                  ? "bg-slate-200 text-slate-700"
                                  : user.rank === 3
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >

                              {user.rank}

                            </div>

                          </td>


                          {/* USER */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">

                                {user.full_name
                                  ?.charAt(0)
                                  ?.toUpperCase()}

                              </div>


                              <div>

                                <p className="font-semibold text-slate-900">

                                  {user.full_name}

                                </p>

                                <p className="text-xs text-slate-500">

                                  {user.email}

                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ACTIVITIES */}

                          <td className="px-6 py-5">

                            <span className="text-sm font-semibold text-slate-700">

                              {user.total_activities}

                            </span>

                          </td>


                          {/* CARBON */}

                          <td className="px-6 py-5">

                            <span className="font-bold text-emerald-600">

                              {Number(
                                user.total_carbon
                              ).toFixed(2)}

                              {" "}kg

                            </span>

                          </td>


                          {/* AVERAGE */}

                          <td className="px-6 py-5">

                            <span className="text-sm text-slate-600">

                              {Number(
                                user.average_carbon
                              ).toFixed(2)}

                              {" "}kg

                            </span>

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

    </div>
  );
};


export default AdminLeaderboard;