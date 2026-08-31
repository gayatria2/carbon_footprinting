import { Link } from "react-router-dom";

import {
  FaLeaf,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";


function Footer() {

  const currentYear =
    new Date().getFullYear();


  const navigationLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Add Activity",
      path: "/activity",
    },
    {
      label: "Analytics",
      path: "/analytics",
    },
    {
      label: "Goals",
      path: "/goal",
    },
  ];


  const resourceLinks = [
    {
      label: "Eco Tips",
      path: "/recommendation",
    },
    {
      label: "Leaderboard",
      path: "/leaderboard",
    },
    {
      label: "My Profile",
      path: "/profile",
    },
  ];


  return (
    <footer className="relative mt-auto overflow-hidden border-t border-emerald-800/40 bg-gradient-to-br from-[#022A1E] via-[#063B2A] to-[#021D15] text-white">

      {/* ================================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />


      {/* ================================================= */}
      {/* MAIN FOOTER */}
      {/* ================================================= */}

      <div className="relative mx-auto max-w-[1500px] px-6 pb-12 pt-16 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">


          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div className="lg:pr-6">

            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-3"
            >

              <div className="relative">

                <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-lg" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-900/30 transition duration-300 group-hover:scale-105">

                  <FaLeaf className="text-xl text-white" />

                </div>

              </div>


              <div>

                <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  Carbon Tracker
                </h2>

                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-300">
                  Track • Reduce • Sustain
                </span>

              </div>

            </Link>


            <p className="mt-6 max-w-sm text-sm leading-7 text-emerald-100/70">
              Track your carbon footprint, understand your impact,
              and build everyday habits for a greener future.
            </p>


            {/* SMALL BRAND LINE */}

            <div className="mt-6 flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs font-semibold text-emerald-200/70">
                Make every choice a little greener
              </span>

            </div>

          </div>


          {/* ================================================= */}
          {/* NAVIGATION */}
          {/* ================================================= */}

          <div>

            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Navigation
            </h3>


            <ul className="mt-6 space-y-4">

              {navigationLinks.map(
                (item) => (

                  <li key={item.path}>

                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-100/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 transition group-hover:bg-emerald-300" />

                      {item.label}

                    </Link>

                  </li>

                )
              )}

            </ul>

          </div>


          {/* ================================================= */}
          {/* RESOURCES */}
          {/* ================================================= */}

          <div>

            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Resources
            </h3>


            <ul className="mt-6 space-y-4">

              {resourceLinks.map(
                (item) => (

                  <li key={item.path}>

                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-100/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 transition group-hover:bg-emerald-300" />

                      {item.label}

                    </Link>

                  </li>

                )
              )}

            </ul>

          </div>


          {/* ================================================= */}
          {/* CONNECT */}
          {/* ================================================= */}

          <div>

            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Connect
            </h3>


            {/* EMAIL */}

            <a
              href="mailto:gayatrichavan238@gmail.com"
              className="mt-6 flex items-start gap-3 text-sm text-emerald-100/70 transition hover:text-white"
            >

              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-700/50 bg-emerald-900/40 text-emerald-300">
                <FaEnvelope />
              </span>

              <span className="break-all leading-6">
                gayatrichavan238@gmail.com
              </span>

            </a>


            {/* SOCIAL */}

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-700/50 bg-emerald-900/40 text-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-600 hover:text-white"
              >
                <FaGithub />
              </a>


             <a
              href="https://www.linkedin.com/feed/"
               target="_blank"
             rel="noopener noreferrer"
             aria-label="LinkedIn"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-700/50 bg-emerald-900/40 text-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-600 hover:text-white"
            >
  <FaLinkedin />
</a>


              <a
                href="#"
                aria-label="Twitter"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-700/50 bg-emerald-900/40 text-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-600 hover:text-white"
              >
                <FaTwitter />
              </a>

            </div>


            {/* CTA */}

            <Link
              to="/activity"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >

              Start Tracking

              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />

            </Link>

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM BAR */}
        {/* ================================================= */}

        <div className="mt-12 border-t border-emerald-800/50 pt-6">

          <div className="flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">

            <p className="text-emerald-100/50">
              © {currentYear} Carbon Tracker. All rights reserved.
            </p>


            <p className="flex items-center gap-2 text-emerald-100/50">

              Made with

              <FaHeart className="animate-pulse text-rose-500" />

              for a greener planet 🌍

            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}


export default Footer;