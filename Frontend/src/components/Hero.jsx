





// import { FaLeaf, FaPlusCircle, FaChartLine } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function Hero() {
//   const today = new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#16A36F] text-white shadow-2xl">

//       {/* Background effects */}
//       <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

//       <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-200/10 blur-3xl" />

//       <div className="relative p-8 sm:p-10 lg:p-14">

//         <div className="max-w-4xl">

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
//             <FaLeaf className="text-green-200" />
//             Smart Carbon Management
//           </div>

//           {/* Heading */}
//           <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
//             Welcome Back
//             <span className="block text-green-200">
//               🌍 Make Every Choice Greener
//             </span>
//           </h1>

//           {/* Description */}
//           <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-green-50">
//             Track your daily activities, understand your carbon
//             footprint and build sustainable habits for a healthier planet.
//           </p>

//           {/* Date */}
//           <div className="mt-5 flex items-center gap-2 text-sm font-medium text-green-100">
//             <span className="h-2 w-2 rounded-full bg-green-200" />
//             {today}
//           </div>

//           {/* Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-3">

//             <Link
//               to="/activity"
//               className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-[#087F55] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-2xl"
//             >
//               <FaPlusCircle className="transition group-hover:rotate-90" />
//               Add Activity
//             </Link>

//             <Link
//               to="/analytics"
//               className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
//             >
//               <FaChartLine />
//               View Analytics
//             </Link>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Hero;


import {
  FaLeaf,
  FaPlusCircle,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";


function Hero() {

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );


  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#16A36F] text-white shadow-[0_20px_60px_rgba(6,59,42,0.22)]">

      {/* ================================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-200/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[30%] top-[15%] h-32 w-32 rounded-full bg-green-300/10 blur-3xl" />


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="relative px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">


          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="max-w-3xl">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-green-50 shadow-lg backdrop-blur-md sm:text-sm">

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">

                <FaLeaf className="text-green-200" />

              </span>

              Smart Carbon Management

            </div>


            {/* HEADING */}

            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.65rem]">

              Welcome Back

              <span className="mt-2 block text-green-200">

                🌍 Make Every Choice Greener

              </span>

            </h1>


            {/* DESCRIPTION */}

            <p className="mt-5 max-w-2xl text-sm leading-7 text-green-50 sm:text-base lg:text-lg">

              Track your daily activities, understand your carbon footprint,
              and build sustainable habits for a healthier planet.

            </p>


            {/* DATE */}

            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-green-100 backdrop-blur-md sm:text-sm">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-70" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-200" />

              </span>

              {today}

            </div>


            {/* ACTION BUTTONS */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              {/* ADD ACTIVITY */}

              <Link
                to="/activity"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-[#087F55] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-2xl sm:text-base"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100">

                  <FaPlusCircle className="transition-transform duration-300 group-hover:rotate-90" />

                </span>

                Add Activity

                <FaArrowRight className="text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

              </Link>


              {/* ANALYTICS */}

              <Link
                to="/analytics"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl sm:text-base"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">

                  <FaChartLine className="transition-transform duration-300 group-hover:scale-110" />

                </span>

                View Analytics

                <FaArrowRight className="text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

              </Link>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT VISUAL CARD */}
          {/* ================================================= */}

          <div className="hidden w-full max-w-sm lg:block">

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

              {/* CARD GLOW */}

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-300/15 blur-2xl" />


              {/* ICON */}

              <div className="relative flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-green-100">
                    Sustainable Living
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold text-white">
                    Small Steps
                  </h3>

                </div>


                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl shadow-lg">

                  <FaLeaf className="text-green-200" />

                </div>

              </div>


              {/* MINI INSIGHT */}

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-medium text-green-100">
                    Daily Impact
                  </span>

                  <span className="rounded-full bg-green-200/15 px-2.5 py-1 text-[10px] font-bold text-green-100">
                    LIVE
                  </span>

                </div>


                <div className="mt-4 flex items-end justify-between">

                  <div>

                    <p className="text-3xl font-black">
                      🌱
                    </p>

                    <p className="mt-1 text-xs text-green-100">
                      Track • Reduce • Sustain
                    </p>

                  </div>


                  <div className="flex items-end gap-1">

                    <span className="h-4 w-1.5 rounded-full bg-green-200/50" />
                    <span className="h-7 w-1.5 rounded-full bg-green-200/70" />
                    <span className="h-11 w-1.5 rounded-full bg-green-200" />
                    <span className="h-8 w-1.5 rounded-full bg-emerald-100/80" />
                    <span className="h-5 w-1.5 rounded-full bg-green-200/50" />

                  </div>

                </div>

              </div>


              {/* QUOTE */}

              <p className="mt-5 text-xs leading-5 text-green-100">
                Every activity you track helps you understand
                your impact and make smarter environmental choices.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


export default Hero;