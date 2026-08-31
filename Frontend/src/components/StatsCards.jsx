

// import {
//   FaLeaf,
//   FaCalendarAlt,
//   FaChartBar,
//   FaTree,
// } from "react-icons/fa";

// function StatusCards({ dashboard }) {
//   const todayCarbon = Number(
//     dashboard?.todayCarbon || 0
//   );

//   const weeklyCarbon = Number(
//     dashboard?.weeklyCarbon || 0
//   );

//   const monthlyCarbon = Number(
//     dashboard?.monthlyCarbon || 0
//   );

//   const carbonSaved = Number(
//     dashboard?.carbonSaved || 0
//   );

//   const cards = [
//     {
//       title: "Today's Carbon",
//       value: todayCarbon,
//       icon: <FaLeaf />,
//       iconBg: "bg-green-100",
//       iconColor: "text-green-700",
//       valueColor: "text-gray-900",
//     },

//     {
//       title: "Weekly Carbon",
//       value: weeklyCarbon,
//       icon: <FaCalendarAlt />,
//       iconBg: "bg-blue-100",
//       iconColor: "text-blue-700",
//       valueColor: "text-gray-900",
//     },

//     {
//       title: "Monthly Carbon",
//       value: monthlyCarbon,
//       icon: <FaChartBar />,
//       iconBg: "bg-orange-100",
//       iconColor: "text-orange-600",
//       valueColor: "text-gray-900",
//     },

//     {
//       title: "Carbon Saved",
//       value: carbonSaved,
//       icon: <FaTree />,
//       iconBg: "bg-emerald-100",
//       iconColor: "text-emerald-700",
//       valueColor: "text-gray-900",
//     },
//   ];

//   return (

//     <>
//     <br/><br/>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

//       {cards.map((card) => (
//         <div
//           key={card.title}
//           className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//         >

//           <div className="flex items-start justify-between">

//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 {card.title}
//               </p>

//               <h3
//                 className={`mt-2 text-3xl font-extrabold ${card.valueColor}`}
//               >
//                 {card.value.toFixed(2)}

//                 <span className="text-sm font-semibold text-gray-400 ml-1">
//                   kg
//                 </span>
//               </h3>
//             </div>

//             <div
//               className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center text-xl group-hover:scale-110 transition`}
//             >
//               {card.icon}
//             </div>

//           </div>

//           <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">

//             <div
//               className={`h-full rounded-full ${
//                 card.title === "Today's Carbon"
//                   ? "w-[35%] bg-green-500"
//                   : card.title === "Weekly Carbon"
//                   ? "w-[50%] bg-blue-500"
//                   : card.title === "Monthly Carbon"
//                   ? "w-[70%] bg-orange-500"
//                   : "w-[45%] bg-emerald-500"
//               }`}
//             />

//           </div>

//         </div>
//       ))}

//     </div>
//     </>
//   );
// }

// export default StatusCards;



import {
  FaLeaf,
  FaCalendarAlt,
  FaChartBar,
  FaTree,
  FaArrowUp,
} from "react-icons/fa";


function StatsCards({ dashboard }) {

  const todayCarbon =
    Number(dashboard?.todayCarbon || 0);

  const weeklyCarbon =
    Number(dashboard?.weeklyCarbon || 0);

  const monthlyCarbon =
    Number(dashboard?.monthlyCarbon || 0);

  const carbonSaved =
    Number(dashboard?.carbonSaved || 0);


  const cards = [
    {
      title: "Today's Carbon",
      value: todayCarbon,
      icon: <FaLeaf />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "from-emerald-500 to-green-500",
      description: "Your emissions today",
    },

    {
      title: "Weekly Carbon",
      value: weeklyCarbon,
      icon: <FaCalendarAlt />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "from-blue-500 to-cyan-500",
      description: "This week's total",
    },

    {
      title: "Monthly Carbon",
      value: monthlyCarbon,
      icon: <FaChartBar />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      accent: "from-orange-500 to-amber-500",
      description: "This month's total",
    },

    {
      title: "Carbon Saved",
      value: carbonSaved,
      icon: <FaTree />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      accent: "from-green-500 to-emerald-500",
      description: "Estimated environmental impact",
    },
  ];


  return (
    <section className="mt-7">

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="group relative overflow-hidden rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
          >

            {/* TOP ACCENT */}

            <div
              className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${card.accent}`}
            />


            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {card.title}
                </p>

                <div className="mt-3 flex items-end gap-2">

                  <h3 className="text-3xl font-black tracking-tight text-slate-900 sm:text-[2rem]">

                    {card.value.toFixed(2)}

                  </h3>

                  <span className="pb-1 text-sm font-bold text-slate-400">
                    kg CO₂
                  </span>

                </div>

              </div>


              {/* ICON */}

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} text-xl shadow-sm transition-all duration-300 group-hover:scale-110`}
              >
                {card.icon}
              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="mt-5 flex items-center gap-2">

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[10px] text-emerald-600">
                <FaArrowUp />
              </div>

              <p className="text-xs font-medium text-slate-400">
                {card.description}
              </p>

            </div>


            {/* BOTTOM LINE */}

            <div className="mt-5 h-px w-full bg-slate-100" />


            {/* FOOTER */}

            <div className="mt-4 flex items-center justify-between">

              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Carbon Tracker
              </span>

              <span
                className={`h-2 w-2 rounded-full bg-gradient-to-r ${card.accent}`}
              />

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default StatsCards;