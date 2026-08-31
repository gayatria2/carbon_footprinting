import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  FaChartPie,
  FaLeaf,
  FaArrowUp,
} from "react-icons/fa";


const COLORS = [
  "#0B8F5D",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
];


function CarbonPieChart({ dashboard }) {

  // =====================================================
  // PREPARE DATA
  // =====================================================

  const data = (
    dashboard?.pieChart || []
  ).map((item) => ({
    name: item.activity_type,
    value: Number(
      item.total || 0
    ),
  }));


  // =====================================================
  // TOTAL CARBON
  // =====================================================

  const totalCarbon =
    data.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );


  // =====================================================
  // HIGHEST CATEGORY
  // =====================================================

  const highestCategory =
    data.length > 0
      ? data.reduce(
          (max, item) =>
            item.value > max.value
              ? item
              : max,
          data[0]
        )
      : null;


  // =====================================================
  // HIGHEST CATEGORY %
  // =====================================================

  const highestPercentage =
    highestCategory &&
    totalCarbon > 0
      ? (
          (highestCategory.value /
            totalCarbon) *
          100
        ).toFixed(1)
      : 0;


  return (
    <section className="relative mt-7 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)]">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-green-100/35 blur-3xl" />


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="relative border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6 lg:px-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          {/* TITLE */}

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087F55] to-[#16A36F] text-lg text-white shadow-lg shadow-emerald-100">
              <FaChartPie />
            </div>


            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Carbon Distribution
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  Overview

                </span>

              </div>


              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Understand which activity categories contribute most to your carbon footprint.
              </p>

            </div>

          </div>


          {/* TOTAL */}

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3">

            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
              Total Carbon
            </p>

            <p className="mt-1 text-xl font-black text-emerald-900">

              {totalCarbon.toFixed(2)}

              <span className="ml-1 text-xs font-bold text-emerald-600">
                kg CO₂
              </span>

            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* CHART */}
      {/* ================================================= */}

      <div className="relative px-4 pb-5 pt-4 sm:px-6 lg:px-8 lg:pb-7">

        {data.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={410}
          >

            <PieChart>

              {/* ================================================= */}
              {/* DONUT */}
              {/* ================================================= */}

              <Pie
                data={data}
                cx="50%"
                cy="45%"
                outerRadius={142}
                innerRadius={88}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"

                label={({
                  name,
                  percent,
                }) =>
                  `${name} ${(
                    percent * 100
                  ).toFixed(0)}%`
                }

                labelLine={false}
                animationDuration={1300}
                stroke="#FFFFFF"
                strokeWidth={3}
              >

                {data.map(
                  (entry, index) => (
                    <Cell
                      key={
                        `carbon-cell-${index}`
                      }
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


              {/* ================================================= */}
              {/* CENTER */}
              {/* ================================================= */}

              <text
                x="50%"
                y="41%"
                textAnchor="middle"
                dominantBaseline="middle"
              >

                <tspan
                  x="50%"
                  dy="-3"
                  fontSize="13"
                  fontWeight="600"
                  fill="#64748B"
                >
                  Total Impact
                </tspan>

                <tspan
                  x="50%"
                  dy="31"
                  fontSize="28"
                  fontWeight="900"
                  fill="#0F172A"
                >
                  {totalCarbon.toFixed(2)}
                </tspan>

                <tspan
                  x="50%"
                  dy="20"
                  fontSize="11"
                  fontWeight="700"
                  fill="#94A3B8"
                >
                  kg CO₂
                </tspan>

              </text>


              {/* ================================================= */}
              {/* TOOLTIP */}
              {/* ================================================= */}

              <Tooltip
                contentStyle={{
                  border:
                    "1px solid #E2E8F0",
                  borderRadius:
                    "16px",
                  background:
                    "#FFFFFF",
                  padding:
                    "12px 14px",
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
              {/* LEGEND */}
              {/* ================================================= */}

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
                  color:
                    "#475569",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        ) : (

          /* ================================================= */
          /* EMPTY STATE */
          /* ================================================= */

          <div className="flex h-[410px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 shadow-sm">
              <FaLeaf />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-slate-800">
              No Carbon Data Yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Add some activities to see how your carbon emissions are distributed across different categories.
            </p>

          </div>

        )}

      </div>


      {/* ================================================= */}
      {/* HIGHEST CATEGORY */}
      {/* ================================================= */}

      {highestCategory && (

        <div className="border-t border-slate-100 bg-[#F8FBF9] px-5 py-4 sm:px-7 lg:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaArrowUp />
              </div>


              <div>

                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Highest Emission Source
                </p>

                <p className="mt-0.5 text-sm font-extrabold text-slate-800">
                  {highestCategory.name}
                </p>

              </div>

            </div>


            <div className="flex items-end gap-4 sm:items-center">

              <div className="text-right">

                <p className="text-lg font-black text-emerald-700">
                  {highestCategory.value.toFixed(2)}
                  <span className="ml-1 text-xs font-bold text-emerald-600">
                    kg CO₂
                  </span>
                </p>

              </div>


              <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
                {highestPercentage}%
              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default CarbonPieChart;