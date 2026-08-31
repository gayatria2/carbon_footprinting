import { useEffect, useState } from "react";

import {
  FaLeaf,
  FaChartLine,
  FaCalendarAlt,
  FaFire,
  FaCar,
  FaBolt,
  FaTrash,
  FaUtensils,
  FaTint,
  FaShoppingBag,
  FaPlane,
  FaTemperatureHigh,
  FaRecycle,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getAnalytics } from "../services/analyticsService";


// =====================================================
// CATEGORY CONFIG
// =====================================================

const CATEGORY_CONFIG = {

  Transportation: {
    icon: <FaCar />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-50 to-white",
  },

  Electricity: {
    icon: <FaBolt />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    gradient: "from-blue-50 to-white",
  },

  Waste: {
    icon: <FaTrash />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    gradient: "from-orange-50 to-white",
  },

  Food: {
    icon: <FaUtensils />,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    gradient: "from-red-50 to-white",
  },

  Water: {
    icon: <FaTint />,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    gradient: "from-cyan-50 to-white",
  },

  Shopping: {
    icon: <FaShoppingBag />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    gradient: "from-violet-50 to-white",
  },

  Travel: {
    icon: <FaPlane />,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    gradient: "from-sky-50 to-white",
  },

  "Heating & Cooling": {
    icon: <FaTemperatureHigh />,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    gradient: "from-rose-50 to-white",
  },

  Recycling: {
    icon: <FaRecycle />,
    iconBg: "bg-lime-50",
    iconColor: "text-lime-700",
    gradient: "from-lime-50 to-white",
  },

};


// =====================================================
// PIE COLORS
// =====================================================

const COLORS = [
  "#0B8F5D",
  "#2563EB",
  "#F97316",
  "#DC2626",
  "#06B6D4",
  "#7C3AED",
  "#0284C7",
  "#E11D48",
  "#65A30D",
];


// =====================================================
// ANALYTICS
// =====================================================

function Analytics() {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");


  // =====================================================
  // LOAD ANALYTICS
  // =====================================================

  const loadAnalytics = async (id) => {

    try {

      setLoading(true);

      setErrorMessage("");


      const res =
        await getAnalytics(id);


      console.log(
        "Analytics Data:",
        res.data?.data
      );


      if (!res.data?.success) {

        setErrorMessage(
          res.data?.message ||
          "Unable to load analytics."
        );

        return;
      }


      setAnalytics(
        res.data?.data || {}
      );

    } catch (error) {

      console.error(
        "Analytics Error:",
        error?.response?.data ||
        error
      );


      setErrorMessage(
        error?.response?.data?.message ||
        "Unable to load analytics."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

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

      setLoading(false);

      setErrorMessage(
        "User information not found. Please login again."
      );

      return;
    }


    loadAnalytics(user.id);

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#F4F8F5]">

        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">

          <div className="w-full max-w-md rounded-[2rem] border border-white bg-white p-10 text-center shadow-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">

              <FaLeaf />

            </div>


            <div className="mx-auto mt-6 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />


            <h2 className="mt-5 text-xl font-black text-slate-900">
              Loading Analytics
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Preparing your carbon insights...
            </p>

          </div>

        </div>

        <Footer />

      </div>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (!analytics) {

    return (
      <div className="min-h-screen bg-[#F4F8F5]">

        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">

          <div className="w-full max-w-lg rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500">
              <FaFire />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-900">
              Analytics unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {errorMessage}
            </p>


            <button
              type="button"
              onClick={() => {

                const storedUser =
                  localStorage.getItem(
                    "user"
                  );


                try {

                  const user =
                    storedUser
                      ? JSON.parse(
                          storedUser
                        )
                      : null;


                  if (user?.id) {
                    loadAnalytics(
                      user.id
                    );
                  }

                } catch (error) {

                  console.error(
                    "Retry Error:",
                    error
                  );

                }

              }}
              className="mt-6 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg"
            >
              Try Again
            </button>

          </div>

        </div>

        <Footer />

      </div>
    );
  }


  // =====================================================
  // DAILY DATA
  // =====================================================

  const dailyData =
    (analytics.dailyCarbon || []).map(
      (item) => ({

        date:
          new Date(
            item.activity_date
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
            }
          ),

        carbon:
          Number(item.carbon || 0),

      })
    );


  // =====================================================
  // WEEKLY DATA
  // =====================================================

  const weeklyData =
    (analytics.weeklyCarbon || []).map(
      (item, index) => ({

        week:
          item.weekStart
            ? new Date(
                item.weekStart
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                }
              )
            : `Week ${index + 1}`,

        carbon:
          Number(item.carbon || 0),

      })
    );


  // =====================================================
  // MONTHLY DATA
  // =====================================================

  const monthlyData =
    (analytics.monthlyCarbon || []).map(
      (item) => ({

        month:
          item.monthName,

        carbon:
          Number(item.carbon || 0),

      })
    );


  // =====================================================
  // CATEGORY DATA
  // =====================================================

  const categoryData = [

    {
      name: "Transportation",
      value:
        Number(
          analytics.transportationCarbon || 0
        ),
    },

    {
      name: "Electricity",
      value:
        Number(
          analytics.electricityCarbon || 0
        ),
    },

    {
      name: "Waste",
      value:
        Number(
          analytics.wasteCarbon || 0
        ),
    },

    {
      name: "Food",
      value:
        Number(
          analytics.foodCarbon || 0
        ),
    },

    {
      name: "Water",
      value:
        Number(
          analytics.waterCarbon || 0
        ),
    },

    {
      name: "Shopping",
      value:
        Number(
          analytics.shoppingCarbon || 0
        ),
    },

    {
      name: "Travel",
      value:
        Number(
          analytics.travelCarbon || 0
        ),
    },

    {
      name: "Heating & Cooling",
      value:
        Number(
          analytics.heatingCoolingCarbon || 0
        ),
    },

    {
      name: "Recycling",
      value:
        Number(
          analytics.recyclingCarbon || 0
        ),
    },

  ].filter(
    (item) =>
      item.value > 0
  );


  // =====================================================
  // TOTALS
  // =====================================================

  const totalActivities =
    Number(
      analytics.totalActivities || 0
    );


  const totalCarbon =
    Number(
      analytics.totalCarbon || 0
    );


  const averageCarbon =
    totalActivities > 0
      ? totalCarbon /
        totalActivities
      : 0;


  const highestCategory =
    analytics.highestCategory
      ?.activity_type ||
    "No Data";


  const highestCarbon =
    Number(
      analytics.highestCategory
        ?.carbon || 0
    );


  const highestPercentage =
    totalCarbon > 0
      ? (
          (highestCarbon /
            totalCarbon) *
          100
        ).toFixed(1)
      : 0;


  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F8F5]">

      <Navbar />


      <main>

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] text-white">

          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />


          <div className="relative mx-auto max-w-[1500px] px-6 py-12 lg:px-8">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide backdrop-blur-md sm:text-sm">

                  <FaLeaf />

                  Carbon Footprint Analytics

                </div>


                <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                  Analytics Dashboard
                </h1>


                <p className="mt-4 max-w-2xl text-sm leading-7 text-green-50 sm:text-base lg:text-lg">
                  Understand your carbon footprint, discover emission patterns and make smarter sustainable choices.
                </p>

              </div>


              <div className="hidden h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-4xl shadow-2xl backdrop-blur-lg md:flex">
                <FaChartLine />
              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <div className="relative mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

          <div className="relative">


            {/* ================================================= */}
            {/* SUMMARY CARDS */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
                title="Total Carbon"
                value={totalCarbon.toFixed(2)}
                suffix="kg"
                icon={<FaLeaf />}
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
                description="Total recorded impact"
              />


              <SummaryCard
                title="Total Activities"
                value={totalActivities}
                icon={<FaCalendarAlt />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
                description="Activities tracked"
              />


              <SummaryCard
                title="Highest Emission"
                value={highestCategory}
                suffix={`${highestCarbon.toFixed(2)} kg`}
                icon={<FaFire />}
                iconBg="bg-orange-50"
                iconColor="text-orange-600"
                description={`${highestPercentage}% of total impact`}
                textValue
              />


              <SummaryCard
                title="Average Carbon"
                value={averageCarbon.toFixed(2)}
                suffix="kg"
                icon={<FaChartLine />}
                iconBg="bg-green-50"
                iconColor="text-green-600"
                description="Average per activity"
              />

            </div>


            {/* ================================================= */}
            {/* CATEGORY CARDS */}
            {/* ================================================= */}

            <section className="mt-8">

              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <h2 className="text-2xl font-black tracking-tight text-slate-900">
                    Emission Categories
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Compare the carbon contribution of every tracked activity.
                  </p>

                </div>


                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  kg CO₂
                </span>

              </div>


              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {categoryData.map(
                  (item) => {

                    const config =
                      CATEGORY_CONFIG[
                        item.name
                      ];


                    const percentage =
                      totalCarbon > 0
                        ? (
                            (item.value /
                              totalCarbon) *
                            100
                          )
                        : 0;


                    return (

                      <div
                        key={item.name}
                        className={`group relative overflow-hidden rounded-[1.6rem] border border-slate-100 bg-gradient-to-br ${config.gradient} p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)]`}
                      >

                        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-green-500" />


                        <div className="flex items-start justify-between gap-4">

                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconBg} ${config.iconColor} text-lg transition duration-300 group-hover:scale-110`}
                          >
                            {config.icon}
                          </div>


                          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-extrabold text-slate-400">
                            {percentage.toFixed(1)}%
                          </span>

                        </div>


                        <p className="mt-5 text-sm font-bold text-slate-500">
                          {item.name}
                        </p>


                        <h3 className="mt-2 text-2xl font-black text-slate-900">
                          {item.value.toFixed(2)}

                          <span className="ml-1 text-xs font-bold text-slate-400">
                            kg
                          </span>

                        </h3>


                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-700"
                            style={{
                              width:
                                `${Math.min(
                                  percentage,
                                  100
                                )}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </section>


            {/* ================================================= */}
            {/* DAILY */}
            {/* ================================================= */}

            <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-8">

              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-2xl font-black tracking-tight text-slate-900">
                    Daily Carbon Trend
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your carbon emissions day by day.
                  </p>

                </div>


                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">
                  Daily Overview
                </span>

              </div>


              {dailyData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height={360}
                >

                  <LineChart
                    data={dailyData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 5"
                      stroke="#E8EEE9"
                      vertical={false}
                    />


                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#64748B",
                        fontSize: 12,
                      }}
                    />


                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#64748B",
                        fontSize: 12,
                      }}
                    />


                    <Tooltip
                      contentStyle={{
                        border:
                          "1px solid #E2E8F0",
                        borderRadius:
                          "16px",
                        background:
                          "#FFFFFF",
                        boxShadow:
                          "0 18px 40px rgba(15,23,42,0.14)",
                      }}
                      formatter={(value) => [
                        `${Number(
                          value
                        ).toFixed(2)} kg CO₂`,
                        "Carbon",
                      ]}
                    />


                    <Line
                      type="monotone"
                      dataKey="carbon"
                      stroke="#087F55"
                      strokeWidth={3.5}
                      dot={{
                        r: 5,
                        fill: "#0B8F5D",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 8,
                      }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              ) : (

                <EmptyChart text="No daily carbon data available." />

              )}

            </section>


            {/* ================================================= */}
            {/* WEEKLY + MONTHLY */}
            {/* ================================================= */}

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">


              {/* WEEKLY */}

              <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-8">

                <div className="mb-6">

                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                    Weekly
                  </span>

                  <h2 className="mt-3 text-2xl font-black text-slate-900">
                    Weekly Carbon
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Compare your carbon emissions across weeks.
                  </p>

                </div>


                {weeklyData.length > 0 ? (

                  <ResponsiveContainer
                    width="100%"
                    height={320}
                  >

                    <BarChart
                      data={weeklyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 5"
                        stroke="#E8EEE9"
                        vertical={false}
                      />


                      <XAxis
                        dataKey="week"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#64748B",
                          fontSize: 11,
                        }}
                      />


                      <YAxis
                        axisLine={false}
                        tickLine={false}
                      />


                      <Tooltip
                        formatter={(value) => [
                          `${Number(
                            value
                          ).toFixed(2)} kg CO₂`,
                          "Carbon",
                        ]}
                      />


                      <Bar
                        dataKey="carbon"
                        fill="#2563EB"
                        radius={[
                          10,
                          10,
                          0,
                          0,
                        ]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                ) : (

                  <EmptyChart text="No weekly carbon data available." />

                )}

              </section>


              {/* MONTHLY */}

              <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-8">

                <div className="mb-6">

                  <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-orange-700">
                    Monthly
                  </span>

                  <h2 className="mt-3 text-2xl font-black text-slate-900">
                    Monthly Carbon
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    View your long-term carbon emission pattern.
                  </p>

                </div>


                {monthlyData.length > 0 ? (

                  <ResponsiveContainer
                    width="100%"
                    height={320}
                  >

                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 5"
                        stroke="#E8EEE9"
                        vertical={false}
                      />


                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#64748B",
                          fontSize: 11,
                        }}
                      />


                      <YAxis
                        axisLine={false}
                        tickLine={false}
                      />


                      <Tooltip
                        formatter={(value) => [
                          `${Number(
                            value
                          ).toFixed(2)} kg CO₂`,
                          "Carbon",
                        ]}
                      />


                      <Bar
                        dataKey="carbon"
                        fill="#F97316"
                        radius={[
                          10,
                          10,
                          0,
                          0,
                        ]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                ) : (

                  <EmptyChart text="No monthly carbon data available." />

                )}

              </section>

            </div>


            {/* ================================================= */}
            {/* CATEGORY PIE */}
            {/* ================================================= */}

            <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-8">

              <div className="mb-5">

                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Breakdown
                </span>

                <h2 className="mt-3 text-2xl font-black text-slate-900">
                  Carbon Distribution
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Carbon contribution across all tracked activity categories.
                </p>

              </div>


              {categoryData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height={470}
                >

                  <PieChart>

                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius={150}
                      innerRadius={85}
                      paddingAngle={4}
                      label={({
                        name,
                        percent,
                      }) =>
                        `${name} ${(
                          percent * 100
                        ).toFixed(0)}%`
                      }
                      labelLine={false}
                    >

                      {categoryData.map(
                        (entry, index) => (

                          <Cell
                            key={`cell-${index}`}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                            stroke="#FFFFFF"
                            strokeWidth={4}
                          />

                        )
                      )}

                    </Pie>


                    <Tooltip
                      contentStyle={{
                        border:
                          "1px solid #E2E8F0",
                        borderRadius:
                          "16px",
                        background:
                          "#FFFFFF",
                        boxShadow:
                          "0 18px 40px rgba(15,23,42,0.14)",
                      }}
                      formatter={(value) => [
                        `${Number(
                          value
                        ).toFixed(2)} kg CO₂`,
                        "Carbon",
                      ]}
                    />


                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop:
                          "18px",
                        fontSize:
                          "12px",
                        fontWeight:
                          600,
                      }}
                    />

                  </PieChart>

                </ResponsiveContainer>

              ) : (

                <EmptyChart text="No category data available." />

              )}

            </section>


            {/* ================================================= */}
            {/* INSIGHT */}
            {/* ================================================= */}

            <section className="relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] p-7 text-white shadow-2xl sm:p-9">

              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="relative">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg backdrop-blur-md">
                    <FaLeaf />
                  </div>


                  <div>

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-200">
                      Smart Insight
                    </p>

                    <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                      Carbon Insight
                    </h2>

                  </div>

                </div>


                <p className="mt-6 max-w-4xl text-lg leading-8 text-green-50 sm:text-xl">

                  Your highest carbon emission comes from{" "}

                  <span className="font-black text-white">
                    {highestCategory}
                  </span>{" "}

                  with{" "}

                  <span className="font-black text-white">
                    {highestCarbon.toFixed(2)} kg
                  </span>{" "}

                  of carbon emissions.

                </p>


                <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-green-50 backdrop-blur-md">

                  <FaArrowDown />

                  Focus on reducing activity in this category.

                </div>

              </div>

            </section>


            {/* ================================================= */}
            {/* CATEGORY LEGEND LIST */}
            {/* ================================================= */}

            {categoryData.length > 0 && (

              <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-8">

                <div className="mb-6">

                  <h2 className="text-2xl font-black text-slate-900">
                    Category Summary
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Detailed contribution of each active category.
                  </p>

                </div>


                <div className="space-y-4">

                  {categoryData.map(
                    (item, index) => {

                      const percentage =
                        totalCarbon > 0
                          ? (
                              (item.value /
                                totalCarbon) *
                              100
                            )
                          : 0;


                      const config =
                        CATEGORY_CONFIG[
                          item.name
                        ];


                      return (

                        <div
                          key={item.name}
                          className="rounded-2xl border border-slate-100 bg-[#F8FBF9] p-4"
                        >

                          <div className="flex items-center gap-3">

                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.iconBg} ${config.iconColor}`}
                            >
                              {config.icon}
                            </div>


                            <div className="min-w-0 flex-1">

                              <div className="flex items-center justify-between gap-4">

                                <p className="truncate text-sm font-extrabold text-slate-800">
                                  {item.name}
                                </p>


                                <p className="whitespace-nowrap text-sm font-black text-slate-900">
                                  {item.value.toFixed(2)} kg
                                </p>

                              </div>


                              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">

                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                                  style={{
                                    width:
                                      `${Math.min(
                                        percentage,
                                        100
                                      )}%`,
                                  }}
                                />

                              </div>


                              <div className="mt-2 flex justify-between">

                                <span className="text-[11px] font-medium text-slate-400">
                                  Carbon contribution
                                </span>

                                <span className="text-[11px] font-bold text-emerald-700">
                                  {percentage.toFixed(1)}%
                                </span>

                              </div>

                            </div>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              </section>

            )}

          </div>

        </div>

      </main>


      <Footer />

    </div>
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
    <div className="group relative overflow-hidden rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)]">

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
              <span className="ml-2 text-xs font-bold text-slate-400">
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


// =====================================================
// EMPTY CHART
// =====================================================

function EmptyChart({
  text,
}) {

  return (
    <div className="flex h-[300px] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">
          <FaLeaf />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}


export default Analytics;