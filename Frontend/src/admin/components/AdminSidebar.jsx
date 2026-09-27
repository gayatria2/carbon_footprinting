import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaChartPie,
  FaBullseye,
  FaTrophy,
  FaCoins,
  FaFileAlt,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";


function AdminSidebar() {

  const navigate = useNavigate();


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    localStorage.removeItem("admin");

    navigate("/admin/login");

  };


  // =====================================================
  // MENU
  // =====================================================

  const menuItems = [

    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },

    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },

    {
      name: "Activities",
      path: "/admin/activities",
      icon: <FaClipboardList />,
    },

    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <FaChartPie />,
    },

    {
      name: "Goals",
      path: "/admin/goals",
      icon: <FaBullseye />,
    },

    {
      name: "Leaderboard",
      path: "/admin/leaderboard",
      icon: <FaTrophy />,
    },

    {
      name: "Emission Factors",
      path: "/admin/emission-factors",
      icon: <FaCoins />,
    },

    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FaFileAlt />,
    },

  ];


  return (

    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        hidden
        h-screen
        w-72
        flex-col
        border-r
        border-emerald-900/30
        bg-slate-950
        text-white
        lg:flex
      "
    >

      {/* =================================================
          BRAND
      ================================================= */}

      <div className="
        border-b
        border-white/10
        px-6
        py-6
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-400
            to-green-600
            text-xl
            shadow-lg
          ">

            <FaLeaf />

          </div>


          <div>

            <h1 className="
              text-xl
              font-black
            ">
              Carbon Tracker
            </h1>


            <p className="
              mt-0.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-emerald-400
            ">
              Admin Panel
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="
        flex-1
        space-y-1
        overflow-y-auto
        px-4
        py-6
      ">

        <p className="
          mb-3
          px-3
          text-[10px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-slate-500
        ">
          Management
        </p>


        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >

            <span className="
              text-base
              transition
              group-hover:scale-110
            ">

              {item.icon}

            </span>


            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* =================================================
          ADMIN PROFILE / LOGOUT
      ================================================= */}

      <div className="
        border-t
        border-white/10
        p-4
      ">

        <div className="
          mb-3
          rounded-2xl
          bg-white/5
          p-4
        ">

          <p className="
            text-xs
            font-bold
            text-emerald-400
          ">
            Administrator
          </p>


          <p className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-white
          ">
            Carbon Tracker Admin
          </p>

        </div>


        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-semibold
            text-slate-400
            transition
            hover:bg-red-500/10
            hover:text-red-400
          "
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>

  );

}


export default AdminSidebar;