import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import {
  getAdminAnalytics,
} from "../services/adminAnalyticsService";

import {
  FaLeaf,
  FaUsers,
  FaChartLine,
  FaChartPie,
  FaBus,
  FaBolt,
  FaRecycle,
  FaUtensils,
  FaShoppingBag,
  FaPlane,
  FaHome,
  FaArrowDown,
} from "react-icons/fa";


// ===============================
// FORMAT NUMBER
// ===============================
const formatNumber = (value) => {
  return Number(value || 0).toFixed(2);
};


// ===============================
// CATEGORY ICON
// ===============================
const getCategoryIcon = (category) => {
  switch (category) {
    case "Transportation":
      return <FaBus />;

    case "Electricity":
      return <FaBolt />;

    case "Waste":
      return <FaRecycle />;

    case "Recycling":
      return <FaRecycle />;

    case "Food":
      return <FaUtensils />;

    case "Shopping":
      return <FaShoppingBag />;

    case "Travel":
      return <FaPlane />;

    case "Heating & Cooling":
      return <FaHome />;

    default:
      return <FaLeaf />;
  }
};


// ===============================
// MAIN
// ===============================
const AdminAnalytics = () => {

  const [analytics, setAnalytics] =
    useState({
      daily: [],
      weekly: [],
      monthly: [],
      categories: [],
      activityCounts: [],
      topUsers: [],
    });

  const [loading, setLoading] =
    useState(true);

  const [period, setPeriod] =
    useState("daily");


  // ===============================
  // FETCH DATA
  // ===============================
  useEffect(() => {
    const fetchAnalytics = async () => {

      try {
        const response =
          await getAdminAnalytics();

        if (response.data.success) {
          setAnalytics(
            response.data.data
          );
        }

      } catch (error) {

        console.error(
          "Analytics Error:",
          error
        );

      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

  }, []);


  // ===============================
  // CURRENT CHART DATA
  // ===============================
  const chartData =
    period === "daily"
      ? analytics.daily
      : period === "weekly"
      ? analytics.weekly
      : analytics.monthly;


  // ===============================
  // MAX VALUES
  // ===============================
  const maxCarbon =
    Math.max(
      ...chartData.map(
        (item) =>
          Number(item.carbon || 0)
      ),
      1
    );


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">

        <AdminSidebar />

        <main className="lg:ml-72">

          <AdminNavbar />

          <div className="flex items-center justify-center h-[70vh]">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

              <p className="text-slate-500">
                Loading analytics...
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

          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <div className="mb-8">

            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
              Carbon Insights
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Admin Analytics
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor emission trends and
              user activity across the platform.
            </p>

          </div>


          {/* ========================= */}
          {/* OVERVIEW CARDS */}
          {/* ========================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Carbon
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {formatNumber(
                      analytics.categories.reduce(
                        (sum, item) =>
                          sum +
                          Number(
                            item.carbon || 0
                          ),
                        0
                      )
                    )}{" "}
                    kg
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  <FaLeaf />
                </div>

              </div>

            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Categories
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {analytics.categories.length}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  <FaChartPie />
                </div>

              </div>

            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Active Users
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {analytics.topUsers.length}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  <FaUsers />
                </div>

              </div>

            </div>

          </div>


          {/* ========================= */}
          {/* EMISSION TREND */}
          {/* ========================= */}

        {/* ========================= */}
{/* EMISSION TREND */}
{/* ========================= */}

<div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">

  {/* HEADER */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

    <div>
      <h2 className="text-xl font-bold text-slate-900">
        Carbon Emission Trend
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Carbon emission recorded over time
      </p>
    </div>


    {/* PERIOD BUTTONS */}
    <div className="flex bg-slate-100 rounded-xl p-1">

      {["daily", "weekly", "monthly"].map((item) => (
        <button
          key={item}
          onClick={() => setPeriod(item)}
          className={`
            px-5 py-2 rounded-lg text-sm font-semibold
            capitalize transition-all
            ${
              period === item
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }
          `}
        >
          {item}
        </button>
      ))}

    </div>

  </div>


  {/* CHART */}
  {chartData.length === 0 ? (

    <div className="h-[320px] flex items-center justify-center">

      <div className="text-center">

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">

          <FaChartLine className="text-slate-400 text-xl" />

        </div>

        <p className="text-slate-500 font-medium">
          No emission data available
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Add some activities to view the trend.
        </p>

      </div>

    </div>

  ) : (

    <div className="relative">

      {/* Y AXIS */}

      <div className="absolute left-0 top-0 bottom-12 w-12 flex flex-col justify-between text-[11px] text-slate-400">

        <span>
          {maxCarbon.toFixed(2)}
        </span>

        <span>
          {(maxCarbon * 0.75).toFixed(2)}
        </span>

        <span>
          {(maxCarbon * 0.5).toFixed(2)}
        </span>

        <span>
          {(maxCarbon * 0.25).toFixed(2)}
        </span>

        <span>
          0
        </span>

      </div>


      {/* GRAPH AREA */}

      <div className="ml-14">

        <div className="h-[320px] relative">

          {/* GRID LINES */}

          <div className="absolute inset-0 flex flex-col justify-between pb-12 pointer-events-none">

            <div className="border-t border-slate-100 w-full"></div>

            <div className="border-t border-slate-100 w-full"></div>

            <div className="border-t border-slate-100 w-full"></div>

            <div className="border-t border-slate-100 w-full"></div>

            <div className="border-t border-slate-100 w-full"></div>

          </div>


          {/* BARS */}

          <div className="absolute left-0 right-0 bottom-0 h-[270px] flex items-end gap-4 md:gap-6 px-2 overflow-x-auto">

            {chartData.map((item, index) => {

              const value =
                Number(item.carbon || 0);

              const barHeight =
                maxCarbon > 0
                  ? (value / maxCarbon) * 240
                  : 0;


              let label = "";

              if (period === "daily") {

                label =
                  new Date(
                    item.date
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  );

              }

              if (period === "weekly") {

                label =
                  `Week ${item.week}`;

              }

              if (period === "monthly") {

                label =
                  new Date(
                    item.year,
                    item.month - 1
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      year: "numeric",
                    }
                  );

              }


              return (

                <div
                  key={index}
                  className="min-w-[60px] md:min-w-[72px] flex-1 h-full flex flex-col justify-end items-center group"
                >

                  {/* VALUE */}
                  <div
                    className="
                      mb-2
                      text-xs
                      font-bold
                      text-slate-600
                      opacity-0
                      group-hover:opacity-100
                      transition
                    "
                  >
                    {value.toFixed(2)} kg
                  </div>


                  {/* BAR */}
                  <div
                    className="
                      w-10
                      md:w-12
                      bg-emerald-500
                      hover:bg-emerald-600
                      rounded-t-xl
                      transition-all
                      duration-300
                      cursor-pointer
                      relative
                    "
                    style={{
                      height: `${Math.max(
                        barHeight,
                        12
                      )}px`,
                    }}
                  >

                    {/* TOP DOT */}

                    <div
                      className="
                        absolute
                        -top-1
                        left-1/2
                        -translate-x-1/2
                        w-3
                        h-3
                        bg-emerald-700
                        rounded-full
                      "
                    ></div>


                    {/* TOOLTIP */}

                    <div
                      className="
                        absolute
                        -top-12
                        left-1/2
                        -translate-x-1/2
                        bg-slate-900
                        text-white
                        text-xs
                        px-3
                        py-1.5
                        rounded-lg
                        whitespace-nowrap
                        opacity-0
                        group-hover:opacity-100
                        transition
                        z-20
                        shadow-lg
                      "
                    >
                      {value.toFixed(2)} kg
                    </div>

                  </div>


                  {/* DATE */}

                  <div
                    className="
                      mt-4
                      text-[11px]
                      md:text-xs
                      text-slate-400
                      whitespace-nowrap
                    "
                  >
                    {label}
                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>


      {/* X AXIS TITLE */}

      <div className="text-center text-xs text-slate-400 mt-2">
        Time period
      </div>

    </div>

  )}

</div>


          {/* ========================= */}
          {/* CATEGORY SECTION */}
          {/* ========================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">


            {/* CATEGORY CARBON */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaChartPie />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Carbon by Category
                  </h2>

                  <p className="text-sm text-slate-500">
                    Which activities generate more emissions
                  </p>
                </div>

              </div>


              <div className="space-y-5">

                {analytics.categories.map(
                  (item, index) => {

                    const max =
                      Number(
                        analytics.categories[0]?.carbon ||
                        1
                      );

                    const width =
                      (
                        Number(item.carbon || 0) /
                        max
                      ) *
                      100;

                    return (

                      <div
                        key={index}
                      >

                        <div className="flex items-center justify-between mb-2">

                          <div className="flex items-center gap-2">

                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              {getCategoryIcon(
                                item.category
                              )}
                            </span>

                            <span className="text-sm font-medium text-slate-700">
                              {item.category}
                            </span>

                          </div>

                          <span className="font-semibold text-slate-900 text-sm">
                            {formatNumber(
                              item.carbon
                            )}{" "}
                            kg
                          </span>

                        </div>


                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${width}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </div>


            {/* ACTIVITY COUNT */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaChartLine />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Activity Distribution
                  </h2>

                  <p className="text-sm text-slate-500">
                    Number of activities per category
                  </p>
                </div>

              </div>


              <div className="space-y-5">

                {analytics.activityCounts.map(
                  (item, index) => {

                    const max =
                      Number(
                        analytics.activityCounts[0]
                          ?.activity_count || 1
                      );

                    const width =
                      (
                        Number(
                          item.activity_count
                        ) /
                        max
                      ) *
                      100;

                    return (

                      <div
                        key={index}
                      >

                        <div className="flex justify-between mb-2">

                          <span className="text-sm font-medium text-slate-700">
                            {item.category}
                          </span>

                          <span className="text-sm font-semibold text-slate-900">
                            {item.activity_count}
                          </span>

                        </div>

                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${width}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </div>

          </div>


          {/* ========================= */}
          {/* TOP USERS */}
          {/* ========================= */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FaUsers />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Top Users by Carbon
                  </h2>

                  <p className="text-sm text-slate-500">
                    Users with the highest recorded emissions
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
                      Carbon
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {analytics.topUsers.map(
                    (user, index) => (

                      <tr
                        key={user.id}
                        className="hover:bg-slate-50 transition"
                      >

                        <td className="px-6 py-4">

                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-700"
                              : index === 1
                              ? "bg-slate-200 text-slate-700"
                              : index === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            {index + 1}
                          </div>

                        </td>


                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
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


                        <td className="px-6 py-4 text-sm text-slate-600">
                          {user.total_activities}
                        </td>


                        <td className="px-6 py-4">

                          <span className="font-bold text-emerald-600">
                            {formatNumber(
                              user.total_carbon
                            )}{" "}
                            kg
                          </span>

                        </td>

                      </tr>

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

export default AdminAnalytics;





































