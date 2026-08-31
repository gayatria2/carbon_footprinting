import { useEffect, useState } from "react";

import {
  FaTrophy,
  FaMedal,
  FaLeaf,
  FaChartLine,
  FaFire,
  FaUsers,
  FaArrowDown,
  FaAward,
  FaUserCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getLeaderboard,
} from "../services/leaderboardService";

function Leaderboard() {

  const [leaderboard, setLeaderboard] =
    useState([]);

  const [topThree, setTopThree] =
    useState([]);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {

    try {

      setLoading(true);
      setError("");

      const storedUser =
        localStorage.getItem("user");

      const user = storedUser
        ? JSON.parse(storedUser)
        : null;

      if (!user?.id) {

        setError(
          "User not found. Please login again."
        );

        return;
      }

      const res =
        await getLeaderboard(user.id);

      console.log(
        "Leaderboard Data:",
        res.data
      );

      const data =
        res.data?.data || {};

      setLeaderboard(
        data.leaderboard || []
      );

      setTopThree(
        data.topThree || []
      );

      setCurrentUser(
        data.currentUser || null
      );

    } catch (err) {

      console.error(
        "Leaderboard Error:",
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load leaderboard."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // MEDAL
  // =====================================================

  const getRankIcon = (rank) => {

    if (rank === 1) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
          <FaTrophy />
        </div>
      );
    }

    if (rank === 2) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center">
          <FaMedal />
        </div>
      );
    }

    if (rank === 3) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
          <FaMedal />
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center font-extrabold">
        {rank}
      </div>
    );
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#F4F8F5]">

          <section className="bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] px-6 py-16">

            <div className="max-w-7xl mx-auto animate-pulse">

              <div className="h-7 w-48 bg-white/20 rounded-full" />

              <div className="h-14 w-[500px] max-w-full bg-white/20 rounded-xl mt-6" />

              <div className="h-5 w-[550px] max-w-full bg-white/10 rounded mt-5" />

            </div>

          </section>

          <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="h-48 bg-white rounded-[2rem] animate-pulse"
                />

              ))}

            </div>

          </div>

        </main>

        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F4F8F5]">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] text-white">

          <div className="absolute -top-28 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-40 -left-24 w-[30rem] h-[30rem] bg-emerald-200/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-16">

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">

              <div>

                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">

                  <FaTrophy />

                  Carbon Tracker Leaderboard

                </div>

                <h1 className="mt-6 text-4xl md:text-6xl font-extrabold">

                  Lead the
                  <br />

                  <span className="text-green-200">
                    Green Challenge
                  </span>

                </h1>

                <p className="mt-5 text-lg text-green-50 max-w-2xl">

                  Compare your carbon footprint with other
                  users and discover how sustainable your
                  choices are.

                </p>

              </div>


              <div className="hidden md:flex w-28 h-28 rounded-[2rem] bg-white/10 border border-white/20 items-center justify-center text-5xl shadow-2xl">

                <FaTrophy />

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (

          <div className="max-w-7xl mx-auto px-6 pt-8">

            <div className="bg-red-50 border border-red-100 text-red-700 rounded-2xl px-5 py-4">

              <p className="font-semibold">
                {error}
              </p>

              <button
                onClick={loadLeaderboard}
                className="mt-2 underline font-bold text-sm"
              >
                Try Again
              </button>

            </div>

          </div>
        )}


        {/* ================================================= */}
        {/* CURRENT USER */}
        {/* ================================================= */}

        {currentUser && (

          <section className="max-w-7xl mx-auto px-6 pt-10">

            <div className="relative overflow-hidden bg-white rounded-[2rem] border border-gray-100 shadow-sm p-7">

              <div className="absolute right-0 top-0 w-48 h-48 bg-green-100/50 rounded-full blur-3xl" />

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">

                    <FaLeaf />

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Your Current Rank
                    </p>

                    <h2 className="text-3xl font-extrabold text-gray-900">

                      #{currentUser.rank}

                    </h2>

                  </div>

                </div>


                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-green-50 rounded-2xl px-5 py-4">

                    <p className="text-xs text-gray-500">
                      Total Carbon
                    </p>

                    <p className="text-xl font-extrabold text-green-700 mt-1">

                      {Number(
                        currentUser.totalCarbon || 0
                      ).toFixed(2)}

                      <span className="text-xs ml-1">
                        kg
                      </span>

                    </p>

                  </div>


                  <div className="bg-blue-50 rounded-2xl px-5 py-4">

                    <p className="text-xs text-gray-500">
                      Activities
                    </p>

                    <p className="text-xl font-extrabold text-blue-700 mt-1">

                      {currentUser.totalActivities}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>
        )}


        {/* ================================================= */}
        {/* TOP 3 */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-6 py-14">

          <div className="text-center mb-10">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">

              <FaAward />

              Top Performers

            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-gray-900">

              Green Champions

            </h2>

            <p className="mt-2 text-gray-500">
              The users with the lowest carbon footprint.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

            {topThree.map((user, index) => {

              const rank = index + 1;

              const isFirst = rank === 1;

              return (

                <div
                  key={user.id}
                  className={`relative bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center p-7 hover:-translate-y-2 hover:shadow-xl transition-all ${
                    isFirst
                      ? "md:-translate-y-5 md:scale-105"
                      : ""
                  }`}
                >

                  {isFirst && (

                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-yellow-400 text-yellow-950 text-xs font-extrabold shadow-lg">

                      ★ CHAMPION

                    </div>

                  )}


                  <div className="flex justify-center">

                    {getRankIcon(rank)}

                  </div>


                  <div className="w-20 h-20 mx-auto mt-5 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 border-4 border-white shadow-lg flex items-center justify-center">

                    <FaUserCircle className="text-5xl text-green-600" />

                  </div>


                  <h3 className="mt-5 text-xl font-extrabold text-gray-900">

                    {user.full_name}

                  </h3>


                  <p className="text-sm text-gray-400 mt-1">
                    Rank #{rank}
                  </p>


                  <div className="mt-6 bg-[#F4F8F5] rounded-2xl px-4 py-4">

                    <p className="text-xs text-gray-500">
                      Total Carbon
                    </p>

                    <p className="text-2xl font-extrabold text-green-700 mt-1">

                      {Number(
                        user.totalCarbon || 0
                      ).toFixed(2)}

                      <span className="text-sm ml-1">
                        kg CO₂
                      </span>

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* ================================================= */}
        {/* FULL LEADERBOARD */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-6 pb-16">

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">

            <div className="p-7 border-b border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">

                    <FaUsers />

                    ALL USERS

                  </span>

                  <h2 className="mt-4 text-2xl font-extrabold text-gray-900">

                    Complete Leaderboard

                  </h2>

                </div>

              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-[#F7FAF8]">

                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-bold">
                      Rank
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-bold">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500 font-bold">
                      Activities
                    </th>

                    <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-gray-500 font-bold">
                      Carbon
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {leaderboard.map((user, index) => {

                    const isMe =
                      user.isCurrentUser;

                    return (

                      <tr
                        key={user.id}
                        className={`border-t border-gray-100 transition ${
                          isMe
                            ? "bg-green-50"
                            : "hover:bg-gray-50"
                        }`}
                      >

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            {getRankIcon(
                              user.rank
                            )}

                          </div>

                        </td>


                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">

                              <FaUserCircle />

                            </div>

                            <div>

                              <p className="font-bold text-gray-900">

                                {user.full_name}

                              </p>

                              {isMe && (
                                <span className="text-xs font-bold text-green-600">
                                  You
                                </span>
                              )}

                            </div>

                          </div>

                        </td>


                        <td className="px-6 py-5 text-gray-600 font-medium">

                          {user.totalActivities}

                        </td>


                        <td className="px-6 py-5 text-right">

                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 font-extrabold">

                            <FaLeaf />

                            {Number(
                              user.totalCarbon || 0
                            ).toFixed(2)}

                            <span className="text-xs font-semibold">
                              kg
                            </span>

                          </span>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <section className="px-6 pb-20">

          <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] p-8 md:p-12 text-center text-white shadow-2xl">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl">

              <FaLeaf />

            </div>

            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold">

              Ready to Improve Your Rank?

            </h2>

            <p className="mt-4 text-green-50 text-lg max-w-2xl mx-auto">

              Track your activities regularly and make
              sustainable choices to reduce your carbon footprint.

            </p>

            <Link
              to="/activity"
              className="inline-flex items-center gap-3 mt-8 bg-white text-[#087F55] px-7 py-3.5 rounded-xl font-bold hover:bg-green-50 transition"
            >

              Add Activity

              <FaArrowDown />

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Leaderboard;