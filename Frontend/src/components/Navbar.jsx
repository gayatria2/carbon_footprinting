// import { useEffect, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// import {
//   FaLeaf,
//   FaHome,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaBell,
//   FaBars,
//   FaTimes,
//   FaCheck,
//   FaTrash,
//   FaCalendarCheck,
//   FaBullseye,
//   FaLightbulb,
//   FaTrophy,
// } from "react-icons/fa";

// import { MdOutlineDirectionsCar } from "react-icons/md";
// import { IoStatsChart } from "react-icons/io5";
// import { BsBullseye, BsLightbulb } from "react-icons/bs";
// import { GiPodiumWinner } from "react-icons/gi";

// import {
//   getNotifications,
//   getUnreadCount,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from "../services/notificationService";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Notification states
//   const [notificationOpen, setNotificationOpen] =
//     useState(false);

//   const [notifications, setNotifications] = useState([]);

//   const [unreadCount, setUnreadCount] = useState(0);

//   const notificationRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // =====================================================
//   // USER
//   // =====================================================

//   const storedUser = localStorage.getItem("user");

//   const user = storedUser
//     ? JSON.parse(storedUser)
//     : null;

//   const userId = user?.id;

//   // =====================================================
//   // LOGOUT
//   // =====================================================

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setIsOpen(false);

//     navigate("/");
//   };

//   // =====================================================
//   // MENU
//   // =====================================================

//   const menu = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: <FaHome />,
//     },
//     {
//       name: "Activity",
//       path: "/activity",
//       icon: <MdOutlineDirectionsCar />,
//     },
//     {
//       name: "Analytics",
//       path: "/analytics",
//       icon: <IoStatsChart />,
//     },
//     {
//       name: "Goals",
//       path: "/goal",
//       icon: <BsBullseye />,
//     },
//     {
//       name: "Recommendation",
//       path: "/recommendation",
//       icon: <BsLightbulb />,
//     },
//     {
//       name: "Leaderboard",
//       path: "/leaderboard",
//       icon: <GiPodiumWinner />,
//     },
//   ];

//   // =====================================================
//   // LOAD NOTIFICATIONS
//   // =====================================================

//   const loadNotifications = async () => {
//     if (!userId) return;

//     try {
//       const res = await getNotifications(userId);

//       setNotifications(res.data?.data || []);
//     } catch (error) {
//       console.error(
//         "Notification Load Error:",
//         error?.response?.data || error
//       );
//     }
//   };

//   // =====================================================
//   // LOAD UNREAD COUNT
//   // =====================================================

//   const loadUnreadCount = async () => {
//     if (!userId) return;

//     try {
//       const res = await getUnreadCount(userId);

//       setUnreadCount(
//         Number(res.data?.unreadCount || 0)
//       );
//     } catch (error) {
//       console.error(
//         "Unread Count Error:",
//         error?.response?.data || error
//       );
//     }
//   };

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     if (!userId) return;

//     loadNotifications();
//     loadUnreadCount();

//     const interval = setInterval(() => {
//       loadUnreadCount();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [userId]);

//   // =====================================================
//   // CLOSE DROPDOWN ON OUTSIDE CLICK
//   // =====================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setNotificationOpen(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   // =====================================================
//   // NOTIFICATION CLICK
//   // =====================================================

//   const handleNotificationClick = async (notification) => {
//     try {
//       if (!notification.is_read) {
//         await markNotificationAsRead(
//           notification.id
//         );

//         setNotifications((prev) =>
//           prev.map((item) =>
//             item.id === notification.id
//               ? { ...item, is_read: 1 }
//               : item
//           )
//         );

//         setUnreadCount((prev) =>
//           prev > 0 ? prev - 1 : 0
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Mark Notification Error:",
//         error?.response?.data || error
//       );
//     }
//   };

//   // =====================================================
//   // MARK ALL
//   // =====================================================

//   const handleMarkAllRead = async () => {
//     if (!userId || unreadCount === 0) return;

//     try {
//       await markAllNotificationsAsRead(userId);

//       setNotifications((prev) =>
//         prev.map((item) => ({
//           ...item,
//           is_read: 1,
//         }))
//       );

//       setUnreadCount(0);
//     } catch (error) {
//       console.error(
//         "Mark All Error:",
//         error?.response?.data || error
//       );
//     }
//   };

//   // =====================================================
//   // NOTIFICATION ICON
//   // =====================================================

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "activity":
//         return (
//           <FaCalendarCheck className="text-green-600" />
//         );

//       case "goal":
//         return (
//           <FaBullseye className="text-blue-600" />
//         );

//       case "recommendation":
//         return (
//           <FaLightbulb className="text-yellow-500" />
//         );

//       case "leaderboard":
//         return (
//           <FaTrophy className="text-orange-500" />
//         );

//       default:
//         return (
//           <FaLeaf className="text-emerald-600" />
//         );
//     }
//   };

//   // =====================================================
//   // TIME FORMAT
//   // =====================================================

//   const formatTime = (date) => {
//     if (!date) return "";

//     const notificationDate = new Date(date);

//     if (Number.isNaN(notificationDate.getTime())) {
//       return "";
//     }

//     return notificationDate.toLocaleString("en-IN", {
//       day: "numeric",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#042F22] via-[#087F55] to-[#063B2A] border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">

//       <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

//         <div className="h-[76px] flex items-center justify-between gap-4">

//           {/* ================================================= */}
//           {/* LOGO */}
//           {/* ================================================= */}

//           <Link
//             to="/dashboard"
//             onClick={() => setIsOpen(false)}
//             className="group flex items-center gap-3 flex-shrink-0"
//           >
//             <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
//               <FaLeaf className="text-xl sm:text-2xl text-[#0B6E4F]" />
//             </div>

//             <div>
//               <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white">
//                 Carbon Tracker
//               </h1>

//               <p className="hidden sm:block text-[10px] lg:text-xs text-emerald-100">
//                 Track • Reduce • Sustain
//               </p>
//             </div>
//           </Link>

//           {/* ================================================= */}
//           {/* DESKTOP MENU */}
//           {/* ================================================= */}

//           <ul className="hidden lg:flex items-center gap-1 xl:gap-2">

//             {menu.map((item) => {
//               const isActive =
//                 location.pathname === item.path;

//               return (
//                 <li key={item.name}>
//                   <Link
//                     to={item.path}
//                     className={`
//                       flex items-center gap-2
//                       px-3 xl:px-4 py-2.5
//                       rounded-xl
//                       text-sm font-semibold
//                       transition-all duration-300
//                       ${
//                         isActive
//                           ? "bg-white text-[#087F55] shadow-lg"
//                           : "text-emerald-50 hover:bg-white/10 hover:text-white"
//                       }
//                     `}
//                   >
//                     {item.icon}
//                     <span>{item.name}</span>
//                   </Link>
//                 </li>
//               );
//             })}

//           </ul>

//           {/* ================================================= */}
//           {/* RIGHT */}
//           {/* ================================================= */}

//           <div className="flex items-center gap-2 sm:gap-3">

//             {/* ================================================= */}
//             {/* NOTIFICATION */}
//             {/* ================================================= */}

//             <div
//               ref={notificationRef}
//               className="relative"
//             >

//               <button
//                 type="button"
//                 onClick={() =>
//                   setNotificationOpen(
//                     (prev) => !prev
//                   )
//                 }
//                 className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/15 hover:scale-105 transition"
//               >

//                 <FaBell />

//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-red-500 border-2 border-[#087F55] text-[9px] flex items-center justify-center text-white font-extrabold">
//                     {unreadCount > 99
//                       ? "99+"
//                       : unreadCount}
//                   </span>
//                 )}

//               </button>


//               {/* ================================================= */}
//               {/* DROPDOWN */}
//               {/* ================================================= */}

//               {notificationOpen && (
//                 <div className="absolute right-0 mt-3 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

//                   {/* Header */}

//                   <div className="px-5 py-4 bg-gradient-to-r from-[#063B2A] to-[#087F55] text-white">

//                     <div className="flex items-center justify-between">

//                       <div>
//                         <h3 className="font-extrabold text-lg">
//                           Notifications
//                         </h3>

//                         <p className="text-xs text-green-100 mt-1">
//                           {unreadCount > 0
//                             ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
//                             : "You're all caught up"}
//                         </p>
//                       </div>

//                       {unreadCount > 0 && (
//                         <button
//                           onClick={handleMarkAllRead}
//                           className="text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg font-semibold"
//                         >
//                           Mark all read
//                         </button>
//                       )}

//                     </div>

//                   </div>


//                   {/* Notifications */}

//                   <div className="max-h-[390px] overflow-y-auto">

//                     {notifications.length > 0 ? (

//                       notifications.map(
//                         (notification) => (

//                           <button
//                             key={notification.id}
//                             type="button"
//                             onClick={() =>
//                               handleNotificationClick(
//                                 notification
//                               )
//                             }
//                             className={`w-full text-left px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition ${
//                               !notification.is_read
//                                 ? "bg-green-50/70"
//                                 : "bg-white"
//                             }`}
//                           >

//                             <div className="flex gap-3">

//                               <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center">
//                                 {getNotificationIcon(
//                                   notification.type
//                                 )}
//                               </div>

//                               <div className="flex-1 min-w-0">

//                                 <div className="flex items-start justify-between gap-2">

//                                   <p className="font-bold text-gray-900 text-sm">
//                                     {notification.title}
//                                   </p>

//                                   {!notification.is_read && (
//                                     <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
//                                   )}

//                                 </div>

//                                 <p className="text-xs text-gray-500 mt-1 leading-relaxed">
//                                   {notification.message}
//                                 </p>

//                                 <p className="text-[10px] text-gray-400 mt-2">
//                                   {formatTime(
//                                     notification.created_at
//                                   )}
//                                 </p>

//                               </div>

//                             </div>

//                           </button>

//                         )
//                       )

//                     ) : (

//                       <div className="py-12 px-6 text-center">

//                         <div className="w-14 h-14 mx-auto rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
//                           <FaCheck />
//                         </div>

//                         <h4 className="mt-4 font-bold text-gray-800">
//                           No notifications
//                         </h4>

//                         <p className="text-xs text-gray-500 mt-1">
//                           New updates will appear here.
//                         </p>

//                       </div>

//                     )}

//                   </div>

//                 </div>
//               )}

//             </div>


//             {/* ================================================= */}
//             {/* PROFILE */}
//             {/* ================================================= */}

//             <Link
//               to="/profile"
//               onClick={() => setIsOpen(false)}
//               className="group flex items-center gap-2 bg-white/10 border border-white/10 hover:bg-white/15 rounded-xl px-2.5 sm:px-3 py-2 transition"
//             >

//               <FaUserCircle className="text-white text-2xl" />

//               <div className="hidden xl:block text-left">

//                 <p className="text-[10px] text-emerald-100">
                  
//                 </p>

//                 <p className="text-sm text-white font-bold">
//                   {user?.name || "Gayatri"}
//                 </p>

//               </div>

//             </Link>


//             {/* ================================================= */}
//             {/* LOGOUT */}
//             {/* ================================================= */}

//             <button
//               type="button"
//               onClick={logout}
//               className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3.5 py-2.5 rounded-xl font-semibold text-sm transition"
//             >
//               <FaSignOutAlt />

//               <span className="hidden xl:inline">
//                 Logout
//               </span>
//             </button>


//             {/* ================================================= */}
//             {/* MOBILE */}
//             {/* ================================================= */}

//             <button
//               type="button"
//               onClick={() =>
//                 setIsOpen(!isOpen)
//               }
//               className="lg:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center"
//             >
//               {isOpen ? (
//                 <FaTimes />
//               ) : (
//                 <FaBars />
//               )}
//             </button>

//           </div>
//         </div>


//         {/* ================================================= */}
//         {/* MOBILE MENU */}
//         {/* ================================================= */}

//         {isOpen && (
//           <div className="lg:hidden pb-4">

//             <div className="rounded-2xl bg-[#063B2A] border border-white/10 p-2">

//               {menu.map((item) => {

//                 const isActive =
//                   location.pathname === item.path;

//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.path}
//                     onClick={() =>
//                       setIsOpen(false)
//                     }
//                     className={`
//                       flex items-center gap-3
//                       px-4 py-3 rounded-xl
//                       font-semibold text-sm
//                       ${
//                         isActive
//                           ? "bg-white text-[#087F55]"
//                           : "text-white hover:bg-white/10"
//                       }
//                     `}
//                   >
//                     <span className="text-lg">
//                       {item.icon}
//                     </span>

//                     {item.name}
//                   </Link>
//                 );
//               })}

//               <button
//                 type="button"
//                 onClick={logout}
//                 className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm"
//               >
//                 <FaSignOutAlt />
//                 Logout
//               </button>

//             </div>
//           </div>
//         )}

//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaLeaf,
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaTimes,
  FaCheck,
  FaCalendarCheck,
  FaBullseye,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";

import { MdOutlineDirectionsCar } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { BsBullseye, BsLightbulb } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notificationService";

import toast from "react-hot-toast";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const notificationRef =
    useRef(null);

  const location = useLocation();
  const navigate = useNavigate();


  // =====================================================
  // USER
  // =====================================================

  const storedUser =
    localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error(
      "User Parse Error:",
      error
    );
    user = null;
  }

  const userId = user?.id;

  const userName =
    user?.full_name ||
    user?.name ||
    "User";


  // =====================================================
  // MENU
  // =====================================================

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: <MdOutlineDirectionsCar />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <IoStatsChart />,
    },
    {
      name: "Goals",
      path: "/goal",
      icon: <BsBullseye />,
    },
    {
      name: "Recommendation",
      path: "/recommendation",
      icon: <BsLightbulb />,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <GiPodiumWinner />,
    },
  ];


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsOpen(false);
    setNotificationOpen(false);

    toast.success(
      "Logged out successfully"
    );

    navigate("/");
  };


  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  const loadNotifications = async () => {
    if (!userId) return;

    try {
      const res =
        await getNotifications(userId);

      setNotifications(
        res.data?.data || []
      );

    } catch (error) {
      console.error(
        "Notification Load Error:",
        error?.response?.data || error
      );
    }
  };


  // =====================================================
  // LOAD UNREAD COUNT
  // =====================================================

  const loadUnreadCount = async () => {
    if (!userId) return;

    try {
      const res =
        await getUnreadCount(userId);

      setUnreadCount(
        Number(
          res.data?.unreadCount || 0
        )
      );

    } catch (error) {
      console.error(
        "Unread Count Error:",
        error?.response?.data || error
      );
    }
  };


  // =====================================================
  // INITIAL LOAD + AUTO REFRESH
  // =====================================================

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    loadNotifications();
    loadUnreadCount();

    const interval =
      setInterval(() => {
        loadUnreadCount();
      }, 30000);

    return () =>
      clearInterval(interval);

  }, [userId]);


  // =====================================================
  // CLOSE NOTIFICATION OUTSIDE CLICK
  // =====================================================

  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(
            event.target
          )
        ) {
          setNotificationOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  // =====================================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // =====================================================

  useEffect(() => {
    setIsOpen(false);
    setNotificationOpen(false);
  }, [location.pathname]);


  // =====================================================
  // NOTIFICATION CLICK
  // =====================================================

  const handleNotificationClick =
    async (notification) => {

      try {
        if (!notification.is_read) {

          await markNotificationAsRead(
            notification.id
          );

          setNotifications(
            (prev) =>
              prev.map((item) =>
                item.id ===
                notification.id
                  ? {
                      ...item,
                      is_read: 1,
                    }
                  : item
              )
          );

          setUnreadCount(
            (prev) =>
              prev > 0
                ? prev - 1
                : 0
          );
        }

        setNotificationOpen(false);

      } catch (error) {

        console.error(
          "Mark Notification Error:",
          error?.response?.data ||
            error
        );

      }
    };


  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const handleMarkAllRead =
    async () => {

      if (
        !userId ||
        unreadCount === 0
      ) {
        return;
      }

      try {

        await markAllNotificationsAsRead(
          userId
        );

        setNotifications(
          (prev) =>
            prev.map((item) => ({
              ...item,
              is_read: 1,
            }))
        );

        setUnreadCount(0);

        toast.success(
          "All notifications marked as read"
        );

      } catch (error) {

        console.error(
          "Mark All Error:",
          error?.response?.data ||
            error
        );

        toast.error(
          "Unable to update notifications"
        );
      }
    };


  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (
    type
  ) => {

    switch (type) {

      case "activity":
        return (
          <FaCalendarCheck className="text-emerald-600" />
        );

      case "goal":
        return (
          <FaBullseye className="text-blue-600" />
        );

      case "recommendation":
        return (
          <FaLightbulb className="text-amber-500" />
        );

      case "leaderboard":
        return (
          <FaTrophy className="text-orange-500" />
        );

      default:
        return (
          <FaLeaf className="text-emerald-600" />
        );
    }
  };


  // =====================================================
  // TIME FORMAT
  // =====================================================

  const formatTime = (date) => {

    if (!date) return "";

    const notificationDate =
      new Date(date);

    if (
      Number.isNaN(
        notificationDate.getTime()
      )
    ) {
      return "";
    }

    return notificationDate.toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  // =====================================================
  // RETURN
  // =====================================================

  return (
    <nav className="sticky top-0 z-[100] border-b border-white/10 bg-gradient-to-r from-[#03291E] via-[#076B49] to-[#063B2A] shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">

      {/* ================================================= */}
      {/* MAIN NAV */}
      {/* ================================================= */}

      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-7">

        <div className="flex h-[74px] items-center justify-between gap-3">


          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            to="/dashboard"
            className="group flex shrink-0 items-center gap-3"
          >

            <div className="relative">

              <div className="absolute inset-0 rounded-2xl bg-emerald-300/20 blur-md transition group-hover:bg-emerald-300/30" />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white shadow-lg transition duration-300 group-hover:scale-105 sm:h-12 sm:w-12">

                <FaLeaf className="text-xl text-[#0B6E4F] sm:text-2xl" />

              </div>

            </div>


            <div>

              <h1 className="text-lg font-extrabold tracking-tight text-white sm:text-xl lg:text-2xl">
                Carbon Tracker
              </h1>

              <p className="hidden text-[10px] font-medium text-emerald-100 sm:block lg:text-xs">
                Track • Reduce • Sustain
              </p>

            </div>

          </Link>


          {/* ================================================= */}
          {/* DESKTOP MENU */}
          {/* ================================================= */}

          <ul className="hidden items-center gap-1 lg:flex xl:gap-2">

            {menu.map((item) => {

              const isActive =
                location.pathname ===
                item.path;

              return (
                <li key={item.name}>

                  <Link
                    to={item.path}
                    className={`
                      group relative flex items-center gap-2
                      rounded-xl px-3 py-2.5
                      text-sm font-semibold
                      transition-all duration-300
                      xl:px-4
                      ${
                        isActive
                          ? "bg-white text-[#087F55] shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                          : "text-emerald-50 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >

                    <span className="text-[15px] transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>

                    <span>
                      {item.name}
                    </span>

                  </Link>

                </li>
              );
            })}

          </ul>


          {/* ================================================= */}
          {/* RIGHT SECTION */}
          {/* ================================================= */}

          <div className="flex items-center gap-2 sm:gap-3">


            {/* ================================================= */}
            {/* NOTIFICATIONS */}
            {/* ================================================= */}

            <div
              ref={notificationRef}
              className="relative"
            >

              <button
                type="button"
                onClick={() =>
                  setNotificationOpen(
                    (prev) => !prev
                  )
                }
                aria-label="Notifications"
                className={`
                  relative flex h-10 w-10 items-center justify-center
                  rounded-xl border
                  transition-all duration-300
                  ${
                    notificationOpen
                      ? "border-white/20 bg-white/20"
                      : "border-white/10 bg-white/10 hover:bg-white/15"
                  }
                `}
              >

                <FaBell className="text-[17px] text-white" />

                {unreadCount > 0 && (

                  <span className="absolute -right-1 -top-1 flex min-h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-[#076B49] bg-red-500 px-1 text-[9px] font-extrabold text-white shadow-lg">

                    {unreadCount > 99
                      ? "99+"
                      : unreadCount}

                  </span>
                )}

              </button>


              {/* ================================================= */}
              {/* NOTIFICATION DROPDOWN */}
              {/* ================================================= */}

              {notificationOpen && (

                <div className="absolute right-0 mt-3 w-[390px] max-w-[calc(100vw-24px)] overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.20)]">

                  {/* HEADER */}

                  <div className="bg-gradient-to-r from-[#063B2A] via-[#087F55] to-[#0AA76B] px-5 py-4 text-white">

                    <div className="flex items-center justify-between gap-3">

                      <div>

                        <div className="flex items-center gap-2">

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                            <FaBell className="text-sm" />
                          </div>

                          <h3 className="text-lg font-extrabold">
                            Notifications
                          </h3>

                        </div>

                        <p className="mt-2 text-xs text-green-100">

                          {unreadCount > 0
                            ? `${unreadCount} unread notification${
                                unreadCount > 1
                                  ? "s"
                                  : ""
                              }`
                            : "You're all caught up"}

                        </p>

                      </div>


                      {unreadCount > 0 && (

                        <button
                          type="button"
                          onClick={
                            handleMarkAllRead
                          }
                          className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20"
                        >
                          Mark all read
                        </button>

                      )}

                    </div>

                  </div>


                  {/* NOTIFICATION LIST */}

                  <div className="max-h-[410px] overflow-y-auto">

                    {notifications.length > 0 ? (

                      notifications.map(
                        (notification) => (

                          <button
                            key={
                              notification.id
                            }
                            type="button"
                            onClick={() =>
                              handleNotificationClick(
                                notification
                              )
                            }
                            className={`
                              w-full border-b border-slate-100 px-4 py-4 text-left transition
                              ${
                                !notification.is_read
                                  ? "bg-emerald-50/80 hover:bg-emerald-50"
                                  : "bg-white hover:bg-slate-50"
                              }
                            `}
                          >

                            <div className="flex gap-3">

                              {/* ICON */}

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100">

                                {getNotificationIcon(
                                  notification.type
                                )}

                              </div>


                              {/* CONTENT */}

                              <div className="min-w-0 flex-1">

                                <div className="flex items-start justify-between gap-2">

                                  <p className="truncate text-sm font-bold text-slate-900">

                                    {notification.title}

                                  </p>

                                  {!notification.is_read && (

                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                                  )}

                                </div>


                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">

                                  {notification.message}

                                </p>


                                <p className="mt-2 text-[10px] font-medium text-slate-400">

                                  {formatTime(
                                    notification.created_at
                                  )}

                                </p>

                              </div>

                            </div>

                          </button>

                        )
                      )

                    ) : (

                      <div className="px-6 py-14 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">

                          <FaCheck />

                        </div>

                        <h4 className="mt-4 text-sm font-extrabold text-slate-800">
                          No notifications
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          New updates will appear here.
                        </p>

                      </div>

                    )}

                  </div>

                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* PROFILE */}
            {/* ================================================= */}

            <Link
              to="/profile"
              className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-2.5 py-2 transition duration-300 hover:bg-white/15 sm:px-3"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/15 ring-1 ring-white/10">

                <FaUserCircle className="text-xl text-white sm:text-2xl" />

              </div>


              <div className="hidden text-left xl:block">

                <p className="text-[10px] font-medium text-emerald-100">
                  {/* Welcome back */}
                </p>

                <p className="max-w-[90px] truncate text-sm font-extrabold text-white">
                  {userName}
                </p>

              </div>

            </Link>


            {/* ================================================= */}
            {/* LOGOUT */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={logout}
              aria-label="Logout"
              className="hidden items-center gap-2 rounded-xl bg-red-500 px-3.5 py-2.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-xl md:flex"
            >

              <FaSignOutAlt />

              <span className="hidden xl:inline">
                Logout
              </span>

            </button>


            {/* ================================================= */}
            {/* MOBILE BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={() =>
                setIsOpen(
                  (prev) => !prev
                )
              }
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
            >

              {isOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}

            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {isOpen && (

          <div className="pb-4 lg:hidden">

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#063B2A]/95 p-2 shadow-2xl backdrop-blur-xl">

              {menu.map((item) => {

                const isActive =
                  location.pathname ===
                  item.path;

                return (

                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className={`
                      flex items-center gap-3
                      rounded-xl px-4 py-3
                      text-sm font-semibold
                      transition-all
                      ${
                        isActive
                          ? "bg-white text-[#087F55] shadow-lg"
                          : "text-white hover:bg-white/10"
                      }
                    `}
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-base">
                      {item.icon}
                    </span>

                    <span>
                      {item.name}
                    </span>

                  </Link>
                );
              })}


              {/* MOBILE LOGOUT */}

              <button
                type="button"
                onClick={logout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <FaSignOutAlt />
                </span>

                Logout

              </button>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;