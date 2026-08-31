import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaChartLine,
  FaLeaf,
  FaArrowUp,
  FaCalendarDay,
} from "react-icons/fa";


function CarbonChart({ dashboard }) {

  // =====================================================
  // PREPARE CHART DATA
  // =====================================================

  const data = (
    dashboard?.lineChart || []
  ).map((item) => ({
    day: new Date(
      item.activity_date
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),

    carbon: Number(
      item.carbon || 0
    ),
  }));


  // =====================================================
  // TOTAL CARBON
  // =====================================================

  const totalChartCarbon =
    data.reduce(
      (sum, item) =>
        sum + item.carbon,
      0
    );


  // =====================================================
  // HIGHEST DAY
  // =====================================================

  const highestDay =
    data.length > 0
      ? data.reduce(
          (max, item) =>
            item.carbon > max.carbon
              ? item
              : max,
          data[0]
        )
      : null;


  // =====================================================
  // AVERAGE
  // =====================================================

  const averageCarbon =
    data.length > 0
      ? totalChartCarbon / data.length
      : 0;


  return (
    <section className="relative mt-7 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)]">

      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-green-100/40 blur-3xl" />


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="relative border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6 lg:px-8">

        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          {/* TITLE */}

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087F55] to-[#16A36F] text-lg text-white shadow-lg shadow-emerald-100">
              <FaChartLine />
            </div>


            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  Carbon Trend
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  Live Data

                </span>

              </div>


              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Daily carbon emission overview
              </p>

            </div>

          </div>


          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-2 gap-3 sm:flex">

            {/* TOTAL */}

            <div className="min-w-[125px] rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">

              <div className="flex items-center gap-2">

                <FaLeaf className="text-xs text-emerald-600" />

                <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                  Total
                </p>

              </div>

              <p className="mt-1 text-xl font-black text-emerald-900">

                {totalChartCarbon.toFixed(2)}

                <span className="ml-1 text-xs font-bold text-emerald-600">
                  kg
                </span>

              </p>

            </div>


            {/* PEAK */}

            {highestDay && (

              <div className="min-w-[125px] rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">

                <div className="flex items-center gap-2">

                  <FaArrowUp className="text-xs text-slate-500" />

                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Peak
                  </p>

                </div>

                <p className="mt-1 text-xl font-black text-slate-800">

                  {highestDay.carbon.toFixed(2)}

                  <span className="ml-1 text-xs font-bold text-slate-400">
                    kg
                  </span>

                </p>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* CHART */}
      {/* ================================================= */}

      <div className="relative px-3 pb-4 pt-5 sm:px-5 sm:pb-6 lg:px-8">

        {data.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={370}
          >

            <AreaChart
              data={data}
              margin={{
                top: 15,
                right: 12,
                left: 0,
                bottom: 8,
              }}
            >

              {/* ================================================= */}
              {/* GRADIENT */}
              {/* ================================================= */}

              <defs>

                <linearGradient
                  id="carbonPremiumGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#0B8F5D"
                    stopOpacity={0.32}
                  />

                  <stop
                    offset="55%"
                    stopColor="#12A66C"
                    stopOpacity={0.14}
                  />

                  <stop
                    offset="100%"
                    stopColor="#12A66C"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>


              {/* ================================================= */}
              {/* GRID */}
              {/* ================================================= */}

              <CartesianGrid
                stroke="#E8EEE9"
                strokeDasharray="3 5"
                vertical={false}
              />


              {/* ================================================= */}
              {/* X AXIS */}
              {/* ================================================= */}

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                dy={10}
              />


              {/* ================================================= */}
              {/* Y AXIS */}
              {/* ================================================= */}

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                width={48}
              />


              {/* ================================================= */}
              {/* TOOLTIP */}
              {/* ================================================= */}

              <Tooltip
                cursor={{
                  stroke: "#0B8F5D",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                  opacity: 0.35,
                }}

                contentStyle={{
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  padding: "12px 14px",
                  boxShadow:
                    "0 18px 40px rgba(15,23,42,0.14)",
                }}

                labelStyle={{
                  color: "#0F172A",
                  fontWeight: 800,
                  marginBottom: 5,
                }}

                itemStyle={{
                  color: "#087F55",
                  fontWeight: 700,
                }}

                formatter={(value) => [
                  `${Number(value).toFixed(2)} kg CO₂`,
                  "Carbon",
                ]}
              />


              {/* ================================================= */}
              {/* AREA */}
              {/* ================================================= */}

              <Area
                type="monotone"
                dataKey="carbon"
                stroke="#087F55"
                strokeWidth={3.5}
                fill="url(#carbonPremiumGradient)"
                fillOpacity={1}

                activeDot={{
                  r: 8,
                  fill: "#087F55",
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                }}

                dot={{
                  r: 4.5,
                  fill: "#16A36F",
                  stroke: "#FFFFFF",
                  strokeWidth: 2.5,
                }}

                animationDuration={1300}
              />

            </AreaChart>

          </ResponsiveContainer>

        ) : (

          /* ================================================= */
          /* EMPTY STATE */
          /* ================================================= */

          <div className="flex h-[370px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 shadow-sm">
              <FaLeaf />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-slate-800">
              No Carbon Data Yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Add your activities to start
              visualizing your daily carbon
              emission trend.
            </p>

          </div>

        )}

      </div>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      {data.length > 0 && (

        <div className="border-t border-slate-100 bg-[#F8FBF9] px-5 py-4 sm:px-7 lg:px-8">

          <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2 text-slate-500">

              <FaCalendarDay className="text-emerald-600" />

              <span>

                <span className="font-bold text-slate-700">
                  {data.length}
                </span>{" "}
                recorded day
                {data.length !== 1
                  ? "s"
                  : ""}{" "}
                of carbon activity

              </span>

            </div>


            <div className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="font-semibold text-emerald-700">
                Average {averageCarbon.toFixed(2)} kg/day
              </span>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default CarbonChart;