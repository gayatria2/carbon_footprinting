// import {
//   FaLeaf,
//   FaCar,
//   FaBolt,
//   FaTrash,
//   FaUtensils,
//   FaChartLine,
//   FaBullseye,
//   FaLightbulb,
//   FaArrowRight,
//   FaCheckCircle,
// } from "react-icons/fa";

// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div className="min-h-screen bg-[#F5F8F6]">

//       {/* ================================================= */}
//       {/* NAVBAR */}
//       {/* ================================================= */}

//       <nav className="fixed top-0 left-0 right-0 z-50 bg-[#063B2A] shadow-lg">

//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//           {/* LOGO */}

//           <Link
//             to="/"
//             className="flex items-center gap-3"
//           >

//             <div className="w-11 h-11 rounded-full bg-[#08A66A] flex items-center justify-center text-white shadow-md">
//               <FaLeaf className="text-xl" />
//             </div>

//             <div>
//               <h1 className="text-xl font-bold text-white">
//                 Carbon Tracker
//               </h1>

//               <p className="text-xs text-green-200">
//                 Track • Reduce • Sustain
//               </p>
//             </div>

//           </Link>

//           {/* LINKS */}

//           <div className="hidden md:flex items-center gap-8">

//             <a
//               href="#about"
//               className="text-sm text-green-100 hover:text-white transition"
//             >
//               About
//             </a>

//             <a
//               href="#features"
//               className="text-sm text-green-100 hover:text-white transition"
//             >
//               Features
//             </a>

//             <a
//               href="#categories"
//               className="text-sm text-green-100 hover:text-white transition"
//             >
//               Categories
//             </a>

//           </div>

//           {/* SIGN IN */}

//           <Link
//             to="/register"
//             className="flex items-center gap-2 bg-white text-[#087F55] px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition"
//           >
//             Sign In
//             <FaArrowRight className="text-xs" />
//           </Link>

//         </div>

//       </nav>


//       {/* ================================================= */}
//       {/* HERO SECTION */}
//       {/* ================================================= */}

//       <section className="pt-28 bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F]">

//         <div className="max-w-7xl mx-auto px-6 py-24 md:py-28">

//           <div className="max-w-4xl mx-auto text-center">

//             {/* BADGE */}

//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm text-white mb-7">

//               <FaLeaf />

//               Smart Carbon Management

//             </div>


//             {/* TITLE */}

//             <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">

//               Track Your Carbon Footprint

//             </h1>

//             <h2 className="mt-3 text-3xl md:text-4xl font-bold text-green-200">

//               Build a Greener Future

//             </h2>


//             {/* DESCRIPTION */}

//             <p className="mt-7 text-lg md:text-xl text-green-50 max-w-3xl mx-auto leading-relaxed">

//               Carbon Tracker is a web application that helps
//               users track their daily activities, calculate
//               carbon emissions and understand their environmental
//               impact.

//             </p>


//             {/* BUTTONS */}

//             <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">

//               <Link
//                 to="/register"
//                 className="inline-flex items-center justify-center gap-3 bg-white text-[#087F55] px-8 py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition"
//               >
//                 Get Started
//                 <FaArrowRight />
//               </Link>

//               <a
//                 href="#about"
//                 className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
//               >
//                 Learn More
//               </a>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ================================================= */}
//       {/* ABOUT PROJECT */}
//       {/* ================================================= */}

//       <section
//         id="about"
//         className="max-w-6xl mx-auto px-6 py-20"
//       >

//         <div className="text-center max-w-3xl mx-auto">

//           <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
//             ABOUT THE PROJECT
//           </span>

//           <h2 className="mt-5 text-4xl font-extrabold text-gray-900">

//             What is Carbon Tracker?

//           </h2>

//           <p className="mt-5 text-lg text-gray-600 leading-relaxed">

//             Carbon Tracker is designed to help users monitor
//             their personal carbon footprint in a simple and
//             understandable way.

//           </p>

//           <p className="mt-4 text-gray-600 leading-relaxed">

//             Users can record transportation, electricity,
//             waste and food related activities. The application
//             calculates the associated carbon emissions and
//             presents the information through dashboards,
//             analytics and goal tracking.

//           </p>

//         </div>

//       </section>


//       {/* ================================================= */}
//       {/* FEATURES */}
//       {/* ================================================= */}

//       <section
//         id="features"
//         className="bg-white py-20 border-y border-gray-100"
//       >

//         <div className="max-w-7xl mx-auto px-6">

//           <div className="text-center">

//             <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
//               FEATURES
//             </span>

//             <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
//               What You Can Do
//             </h2>

//             <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
//               Everything you need to understand and improve
//               your carbon footprint.
//             </p>

//           </div>


//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

//             {/* CARD 1 */}

//             <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7">

//               <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">
//                 <FaChartLine />
//               </div>

//               <h3 className="mt-6 text-xl font-bold text-gray-900">
//                 Track Activities
//               </h3>

//               <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//                 Record your daily activities and monitor
//                 the carbon emissions generated from them.
//               </p>

//             </div>


//             {/* CARD 2 */}

//             <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7">

//               <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
//                 <FaChartLine />
//               </div>

//               <h3 className="mt-6 text-xl font-bold text-gray-900">
//                 View Analytics
//               </h3>

//               <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//                 Understand your daily, weekly and monthly
//                 carbon emission patterns.
//               </p>

//             </div>


//             {/* CARD 3 */}

//             <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7">

//               <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl">
//                 <FaBullseye />
//               </div>

//               <h3 className="mt-6 text-xl font-bold text-gray-900">
//                 Set Goals
//               </h3>

//               <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//                 Create carbon reduction goals and track
//                 your progress toward achieving them.
//               </p>

//             </div>


//             {/* CARD 4 */}

//             <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7">

//               <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
//                 <FaLightbulb />
//               </div>

//               <h3 className="mt-6 text-xl font-bold text-gray-900">
//                 Get Recommendations
//               </h3>

//               <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//                 Discover practical suggestions for making
//                 more sustainable choices.
//               </p>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ================================================= */}
//       {/* CATEGORIES */}
//       {/* ================================================= */}

//       <section
//         id="categories"
//         className="max-w-7xl mx-auto px-6 py-20"
//       >

//         <div className="text-center">

//           <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
//             EMISSION CATEGORIES
//           </span>

//           <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
//             Track Different Sources
//           </h2>

//           <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
//             Monitor the main activities that contribute to
//             your carbon footprint.
//           </p>

//         </div>


//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

//           {/* TRANSPORTATION */}

//           <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">

//             <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">
//               <FaCar />
//             </div>

//             <h3 className="mt-6 text-xl font-bold text-gray-900">
//               Transportation
//             </h3>

//             <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//               Track emissions generated from different
//               transportation methods.
//             </p>

//           </div>


//           {/* ELECTRICITY */}

//           <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">

//             <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
//               <FaBolt />
//             </div>

//             <h3 className="mt-6 text-xl font-bold text-gray-900">
//               Electricity
//             </h3>

//             <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//               Monitor electricity consumption measured
//               in kWh and its carbon impact.
//             </p>

//           </div>


//           {/* WASTE */}

//           <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">

//             <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl">
//               <FaTrash />
//             </div>

//             <h3 className="mt-6 text-xl font-bold text-gray-900">
//               Waste
//             </h3>

//             <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//               Record your waste generation and understand
//               its effect on the environment.
//             </p>

//           </div>


//           {/* FOOD */}

//           <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">

//             <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-2xl">
//               <FaUtensils />
//             </div>

//             <h3 className="mt-6 text-xl font-bold text-gray-900">
//               Food
//             </h3>

//             <p className="mt-3 text-gray-500 text-sm leading-relaxed">
//               Track food related activities and understand
//               their contribution to carbon emissions.
//             </p>

//           </div>

//         </div>

//       </section>


//       {/* ================================================= */}
//       {/* HOW IT WORKS */}
//       {/* ================================================= */}

//       <section className="bg-[#063B2A] py-20">

//         <div className="max-w-5xl mx-auto px-6">

//           <div className="text-center">

//             <h2 className="text-4xl font-extrabold text-white">
//               How It Works
//             </h2>

//             <p className="mt-3 text-green-100">
//               Simple steps to start managing your carbon footprint.
//             </p>

//           </div>


//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

//             <div className="text-center">

//               <div className="mx-auto w-14 h-14 rounded-full bg-[#08A66A] text-white flex items-center justify-center text-xl font-bold">
//                 1
//               </div>

//               <h3 className="mt-5 text-xl font-bold text-white">
//                 Sign In
//               </h3>

//               <p className="mt-3 text-green-100 text-sm">
//                 Create an account or sign in to access
//                 your personal carbon dashboard.
//               </p>

//             </div>


//             <div className="text-center">

//               <div className="mx-auto w-14 h-14 rounded-full bg-[#08A66A] text-white flex items-center justify-center text-xl font-bold">
//                 2
//               </div>

//               <h3 className="mt-5 text-xl font-bold text-white">
//                 Add Activities
//               </h3>

//               <p className="mt-3 text-green-100 text-sm">
//                 Record transportation, electricity, waste
//                 and food activities.
//               </p>

//             </div>


//             <div className="text-center">

//               <div className="mx-auto w-14 h-14 rounded-full bg-[#08A66A] text-white flex items-center justify-center text-xl font-bold">
//                 3
//               </div>

//               <h3 className="mt-5 text-xl font-bold text-white">
//                 Reduce Your Impact
//               </h3>

//               <p className="mt-3 text-green-100 text-sm">
//                 Use analytics and goals to make better
//                 and more sustainable choices.
//               </p>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ================================================= */}
//       {/* FINAL CTA */}
//       {/* ================================================= */}

//       <section className="px-6 py-20 bg-[#F5F8F6]">

//         <div className="max-w-4xl mx-auto text-center">

//           <FaLeaf className="mx-auto text-4xl text-[#087F55]" />

//           <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
//             Start Your Sustainable Journey
//           </h2>

//           <p className="mt-4 text-gray-600 text-lg">
//             Understand your carbon footprint and take
//             meaningful steps toward a greener lifestyle.
//           </p>

//           <Link
//             to="/login"
//             className="inline-flex items-center gap-3 mt-8 bg-[#087F55] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#063B2A] transition"
//           >
//             Get Started
//             <FaArrowRight />
//           </Link>

//         </div>

//       </section>


//       {/* ================================================= */}
//       {/* FOOTER */}
//       {/* ================================================= */}

//       <footer className="bg-[#063B2A] text-white">

//         <div className="max-w-7xl mx-auto px-6 py-10">

//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">

//             <div className="flex items-center gap-3">

//               <div className="w-10 h-10 rounded-xl bg-[#08A66A] flex items-center justify-center">
//                 <FaLeaf />
//               </div>

//               <div>

//                 <p className="font-bold">
//                   Carbon Tracker
//                 </p>

//                 <p className="text-xs text-green-200">
//                   Track • Reduce • Sustain
//                 </p>

//               </div>

//             </div>

//             <p className="text-sm text-green-200 text-center">
//               Build better habits. Reduce emissions. Protect our planet.
//             </p>

//           </div>

//         </div>

//       </footer>

//     </div>
//   );
// }

// export default Home;



import {
  FaLeaf,
  FaCar,
  FaBolt,
  FaTrash,
  FaUtensils,
  FaChartLine,
  FaBullseye,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#F5F8F6]">

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#063B2A] shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-full bg-[#08A66A] flex items-center justify-center text-white shadow-md">
              <FaLeaf className="text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Carbon Tracker
              </h1>

              <p className="text-xs text-green-200">
                Track • Reduce • Sustain
              </p>
            </div>

          </Link>


          {/* NAVIGATION */}

          <div className="hidden md:flex items-center gap-8">

            <a
              href="#about"
              className="text-sm text-green-100 hover:text-white transition"
            >
              About
            </a>

            <a
              href="#features"
              className="text-sm text-green-100 hover:text-white transition"
            >
              Features
            </a>

            <a
              href="#categories"
              className="text-sm text-green-100 hover:text-white transition"
            >
              Categories
            </a>

          </div>


          {/* SIGN IN */}

          <Link
            to="/login"
            className="flex items-center gap-2 bg-white text-[#087F55] px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            Sign In
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

      </nav>


      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}

      <section className="relative pt-28 min-h-[700px] overflow-hidden">

        {/* ONLINE IMAGE */}

        <img
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2000&q=85"
          alt="Green sustainable environment"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#063B2A]/95 via-[#063B2A]/75 to-[#087F55]/40"></div>


        {/* HERO CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">

          <div className="max-w-3xl">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm text-white mb-7">

              <FaLeaf />

              Smart Carbon Management

            </div>


            {/* TITLE */}

            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">

              Track Your Carbon Footprint

            </h1>


            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-green-200">

              Build a Greener Future

            </h2>


            {/* DESCRIPTION */}

            <p className="mt-7 text-lg md:text-xl text-green-50 max-w-2xl leading-relaxed">

              Carbon Tracker helps you track your daily
              activities, calculate carbon emissions and
              understand your environmental impact.

            </p>


            {/* BUTTONS */}

            <div className="mt-9 flex flex-col sm:flex-row gap-4">

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#087F55] px-8 py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition"
              >
                Get Started
                <FaArrowRight />
              </Link>


              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* ABOUT PROJECT */}
      {/* ===================================================== */}

      <section
        id="about"
        className="max-w-6xl mx-auto px-6 py-20"
      >

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}

          <div className="relative">

            <div className="rounded-[2rem] overflow-hidden shadow-xl">

              <img
                src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85"
                alt="Green nature"
                className="w-full h-[380px] object-cover"
              />

            </div>

          </div>


          {/* CONTENT */}

          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
              ABOUT THE PROJECT
            </span>


            <h2 className="mt-5 text-4xl font-extrabold text-gray-900">

              What is Carbon Tracker?

            </h2>


            <p className="mt-5 text-lg text-gray-600 leading-relaxed">

              Carbon Tracker is designed to help users monitor
              their personal carbon footprint in a simple and
              understandable way.

            </p>


            <p className="mt-4 text-gray-600 leading-relaxed">

              Users can record transportation, electricity,
              waste and food related activities. The application
              calculates the associated carbon emissions and
              presents the information through dashboards,
              analytics and goal tracking.

            </p>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* FEATURES */}
      {/* ===================================================== */}

      <section
        id="features"
        className="bg-white py-20 border-y border-gray-100"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
              FEATURES
            </span>

            <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
              What You Can Do
            </h2>

            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Everything you need to understand and improve
              your carbon footprint.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            {/* TRACK ACTIVITIES */}

            <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">
                <FaChartLine />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Track Activities
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Record your daily activities and monitor
                the carbon emissions generated from them.
              </p>

            </div>


            {/* ANALYTICS */}

            <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
                <FaChartLine />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                View Analytics
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Understand your daily, weekly and monthly
                carbon emission patterns.
              </p>

            </div>


            {/* GOALS */}

            <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl">
                <FaBullseye />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Set Goals
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Create carbon reduction goals and track
                your progress toward achieving them.
              </p>

            </div>


            {/* RECOMMENDATIONS */}

            <div className="bg-[#F8FBF9] border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
                <FaLightbulb />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Recommendations
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Discover practical suggestions for making
                more sustainable choices.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* EMISSION CATEGORIES */}
      {/* ===================================================== */}

      <section
        id="categories"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
            EMISSION CATEGORIES
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
            Track Different Sources
          </h2>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Monitor the main activities that contribute to
            your carbon footprint.
          </p>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          {/* TRANSPORTATION */}

          <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">
              <FaCar />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Transportation
            </h3>

            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              Track emissions generated from different
              transportation methods.
            </p>

          </div>


          {/* ELECTRICITY */}

          <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
              <FaBolt />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Electricity
            </h3>

            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              Monitor electricity consumption measured
              in kWh and its carbon impact.
            </p>

          </div>


          {/* WASTE */}

          <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl">
              <FaTrash />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Waste
            </h3>

            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              Record your waste generation and understand
              its effect on the environment.
            </p>

          </div>


          {/* FOOD */}

          <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-2xl">
              <FaUtensils />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Food
            </h3>

            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              Track food related activities and understand
              their contribution to carbon emissions.
            </p>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================== */}

      <section className="bg-[#063B2A] py-20">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center">

            <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-green-200 text-xs font-bold">
              SIMPLE PROCESS
            </span>

            <h2 className="mt-5 text-4xl font-extrabold text-white">
              How It Works
            </h2>

            <p className="mt-3 text-green-100">
              Simple steps to start managing your carbon footprint.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            {/* STEP 1 */}

            <div className="text-center">

              <div className="mx-auto w-14 h-14 rounded-full bg-[#08A66A] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Sign In
              </h3>

              <p className="mt-3 text-green-100 text-sm">
                Create an account or sign in to access
                your personal carbon dashboard.
              </p>

            </div>


            {/* STEP 2 */}

            <div className="text-center">

              <div className="mx-auto w-14 h-14 rounded-full bg-[#08A66A] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Add Activities
              </h3>

              <p className="mt-3 text-green-100 text-sm">
                Record transportation, electricity, waste
                and food activities.
              </p>

            </div>


            {/* STEP 3 */}

            <div className="text-center">

              <div className="mx-auto w-14 h-14 rounded-full bg-[#08A66A] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Reduce Your Impact
              </h3>

              <p className="mt-3 text-green-100 text-sm">
                Use analytics and goals to make better
                and more sustainable choices.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section className="px-6 py-20 bg-[#F5F8F6]">

        <div className="max-w-4xl mx-auto text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-[#087F55] flex items-center justify-center text-3xl">
            <FaLeaf />
          </div>


          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Start Your Sustainable Journey
          </h2>


          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Understand your carbon footprint and take
            meaningful steps toward a greener lifestyle.
          </p>


          <Link
            to="/register"
            className="inline-flex items-center gap-3 mt-8 bg-[#087F55] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#063B2A] transition shadow-lg"
          >
            Get Started
            <FaArrowRight />
          </Link>

        </div>

      </section>


      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="bg-[#063B2A] text-white">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#08A66A] flex items-center justify-center">
                <FaLeaf />
              </div>

              <div>

                <p className="font-bold">
                  Carbon Tracker
                </p>

                <p className="text-xs text-green-200">
                  Track • Reduce • Sustain
                </p>

              </div>

            </div>


            {/* MESSAGE */}

            <p className="text-sm text-green-200 text-center">
              Build better habits. Reduce emissions. Protect our planet.
            </p>


            {/* COPYRIGHT */}

            <p className="text-xs text-green-300">
              © 2026 Carbon Tracker
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;