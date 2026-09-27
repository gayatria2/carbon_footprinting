import {
  useEffect,
  useState,
} from "react";

import {
  FaBell,
  FaUserShield,
  FaUsers,
  FaLeaf,
  FaBullseye,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function AdminNavbar() {

  const navigate = useNavigate();

  const [admin, setAdmin] =
    useState(null);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);


  // =================================================
  // ADMIN DATA
  // =================================================

  useEffect(() => {

    const storedAdmin =
      localStorage.getItem("admin");

    if (storedAdmin) {

      try {

        setAdmin(
          JSON.parse(storedAdmin)
        );

      } catch (error) {

        console.error(
          "Admin data error:",
          error
        );

      }

    }

  }, []);


  // =================================================
  // NOTIFICATIONS
  // =================================================

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New user registered",
      message:
        "A new user has joined Carbon Tracker.",
      time: "5 min ago",
      icon: <FaUsers />,
      read: false,
    },

    {
      id: 2,
      title: "New activity added",
      message:
        "A new carbon activity has been recorded.",
      time: "20 min ago",
      icon: <FaLeaf />,
      read: false,
    },

    {
      id: 3,
      title: "Goal updated",
      message:
        "A user has updated their carbon reduction goal.",
      time: "1 hour ago",
      icon: <FaBullseye />,
      read: false,
    },

    {
      id: 4,
      title: "Emission factor updated",
      message:
        "Emission factor data was recently reviewed.",
      time: "2 hours ago",
      icon: <FaLeaf />,
      read: true,
    },
  ]);


  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;


  // =================================================
  // MARK SINGLE NOTIFICATION AS READ
  // =================================================

  const markAsRead = (id) => {

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );

  };


  // =================================================
  // MARK ALL AS READ
  // =================================================

  const markAllAsRead = () => {

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

  };


  // =================================================
  // LOGOUT
  // =================================================

  const handleLogout = () => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    setShowProfile(false);

    navigate("/admin/login");

  };


  // =================================================
  // NOTIFICATION TOGGLE
  // =================================================

  const handleNotificationClick = () => {

    setShowNotifications(
      (previous) => !previous
    );

    setShowProfile(false);

  };


  // =================================================
  // PROFILE TOGGLE
  // =================================================

  const handleProfileClick = () => {

    setShowProfile(
      (previous) => !previous
    );

    setShowNotifications(false);

  };


  return (

    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-slate-200
        bg-white/90
        backdrop-blur-xl
      "
    >

      <div
        className="
          flex
          h-20
          items-center
          justify-between
          px-5
          sm:px-8
        "
      >

        {/* =================================================
            LEFT
        ================================================= */}

        <div>

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-emerald-600
            "
          >
            Administration
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-black
              text-slate-900
              sm:text-xl
            "
          >
            Carbon Tracker Admin
          </h2>

        </div>


        {/* =================================================
            RIGHT
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >


          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={handleNotificationClick}
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-500
                transition-all
                hover:border-emerald-200
                hover:bg-emerald-50
                hover:text-emerald-600
              "
            >

              <FaBell size={16} />


              {/* UNREAD COUNT */}

              {unreadCount > 0 && (

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[9px]
                    font-bold
                    text-white
                    shadow-sm
                  "
                >
                  {unreadCount}
                </span>

              )}

            </button>


            {/* =================================================
                NOTIFICATION DROPDOWN
            ================================================= */}

            {showNotifications && (

              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-[340px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-2xl
                  shadow-slate-300/40
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-100
                    px-5
                    py-4
                  "
                >

                  <div>

                    <h3
                      className="
                        text-sm
                        font-black
                        text-slate-900
                      "
                    >
                      Notifications
                    </h3>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        text-slate-400
                      "
                    >
                      {unreadCount} unread notification
                      {unreadCount !== 1
                        ? "s"
                        : ""}
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="
                      text-[11px]
                      font-semibold
                      text-emerald-600
                      transition
                      hover:text-emerald-700
                    "
                  >
                    Mark all read
                  </button>

                </div>


                {/* NOTIFICATION LIST */}

                <div
                  className="
                    max-h-[360px]
                    overflow-y-auto
                  "
                >

                  {notifications.length === 0 ? (

                    <div
                      className="
                        px-5
                        py-10
                        text-center
                        text-sm
                        text-slate-400
                      "
                    >
                      No notifications
                    </div>

                  ) : (

                    notifications.map(
                      (notification) => (

                        <button
                          type="button"
                          key={notification.id}
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          className={`
                            flex
                            w-full
                            gap-3
                            border-b
                            border-slate-100
                            px-5
                            py-4
                            text-left
                            transition
                            hover:bg-slate-50
                            ${
                              notification.read
                                ? "bg-white"
                                : "bg-emerald-50/60"
                            }
                          `}
                        >

                          {/* ICON */}

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-emerald-100
                              text-emerald-600
                            "
                          >
                            {notification.icon}
                          </div>


                          {/* CONTENT */}

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-2
                              "
                            >

                              <p
                                className="
                                  text-xs
                                  font-bold
                                  text-slate-800
                                "
                              >
                                {notification.title}
                              </p>


                              {!notification.read && (

                                <span
                                  className="
                                    mt-1
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    bg-emerald-500
                                  "
                                />

                              )}

                            </div>


                            <p
                              className="
                                mt-1
                                text-[11px]
                                leading-5
                                text-slate-500
                              "
                            >
                              {notification.message}
                            </p>


                            <p
                              className="
                                mt-1
                                text-[10px]
                                text-slate-400
                              "
                            >
                              {notification.time}
                            </p>

                          </div>

                        </button>

                      )
                    )

                  )}

                </div>


                {/* FOOTER */}

                <div
                  className="
                    border-t
                    border-slate-100
                    px-5
                    py-3
                    text-center
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setShowNotifications(false)
                    }
                    className="
                      text-xs
                      font-semibold
                      text-emerald-600
                      hover:text-emerald-700
                    "
                  >
                    Close notifications
                  </button>

                </div>

              </div>

            )}

          </div>


          {/* =================================================
              ADMIN PROFILE
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={handleProfileClick}
              className="
                hidden
                items-center
                gap-3
                rounded-2xl
                px-2
                py-1.5
                transition
                hover:bg-slate-50
                sm:flex
              "
            >

              {/* AVATAR */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-100
                  text-emerald-700
                "
              >

                <FaUserShield />

              </div>


              {/* ADMIN DETAILS */}

              <div className="text-left">

                <p
                  className="
                    text-sm
                    font-extrabold
                    text-slate-800
                  "
                >
                  {admin?.full_name ||
                    "Administrator"}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {admin?.email ||
                    "admin@carbontracker.com"}
                </p>

              </div>

            </button>


            {/* =================================================
                PROFILE DROPDOWN
            ================================================= */}

            {showProfile && (

              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-2xl
                  shadow-slate-300/40
                "
              >

                {/* PROFILE HEADER */}

                <div
                  className="
                    border-b
                    border-slate-100
                    bg-slate-50
                    px-5
                    py-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-100
                        text-emerald-700
                      "
                    >

                      <FaUserShield
                        size={18}
                      />

                    </div>


                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        {admin?.full_name ||
                          "Administrator"}
                      </p>

                      <p
                        className="
                          truncate
                          text-[11px]
                          text-slate-400
                        "
                      >
                        {admin?.email ||
                          "admin@carbontracker.com"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* PROFILE OPTIONS */}

                <div className="p-2">

                  {/* DASHBOARD */}

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/admin/dashboard");
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-semibold
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >

                    <FaUserShield
                      className="text-slate-400"
                    />

                    Admin Dashboard

                  </button>


                  {/* DIVIDER */}

                  <div
                    className="
                      my-2
                      border-t
                      border-slate-100
                    "
                  />


                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-semibold
                      text-red-500
                      transition
                      hover:bg-red-50
                    "
                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>

  );

}


export default AdminNavbar;