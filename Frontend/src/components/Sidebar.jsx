import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaLeaf,
    FaHome,
    FaChartLine,
    FaBullseye,
    FaLightbulb,
    FaUserCircle,
    FaSignOutAlt,
    FaPlus,
    // FaCog
} from "react-icons/fa";

import {
    GiPodiumWinner
} from "react-icons/gi";


function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };


    // =====================================================
    // SIDEBAR MENU
    // =====================================================

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />,
        },

        {
            name: "Log Activity",
            path: "/activity",
            icon: <FaPlus />,
        },

        {
            name: "Analytics",
            path: "/analytics",
            icon: <FaChartLine />,
        },

        {
            name: "Goals",
            path: "/goal",
            icon: <FaBullseye />,
        },

        {
            name: "Recommendations",
            path: "/recommendation",
            icon: <FaLightbulb />,
        },

        {
            name: "Leaderboard",
            path: "/leaderboard",
            icon: <GiPodiumWinner />,
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <FaUserCircle />,
        },

        // {
        //     name: "Settings",
        //     path: "/settings",
        //     icon: <FaCog />,
        // },

    ];


    return (
        <>

            {/* =================================================
                DESKTOP SIDEBAR
            ================================================= */}

            <aside
                className="
                    fixed
                    left-0
                    top-0
                    h-screen
                    w-64
                    bg-[#064E3B]
                    border-r
                    border-[#0B6B50]
                    text-white
                    z-50
                    hidden
                    md:flex
                    flex-col
                "
            >

                {/* =================================================
                    LOGO
                ================================================= */}

                <div
                    className="
                        px-6
                        py-6
                        border-b
                        border-[#0B6B50]
                    "
                >

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3"
                    >

                        {/* Logo Icon */}

                        <div
                            className="
                                w-11
                                h-11
                                rounded-full
                                bg-[#00B86B]
                                flex
                                items-center
                                justify-center
                                shadow-lg
                            "
                        >

                            <FaLeaf
                                className="
                                    text-xl
                                    text-white
                                "
                            />

                        </div>


                        {/* Logo Text */}

                        <div>

                            <h1
                                className="
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                "
                            >
                                Carbon Tracker
                            </h1>


                            <p
                                className="
                                    text-xs
                                    text-green-200
                                    mt-0.5
                                "
                            >
                                Track • Reduce • Sustain
                            </p>

                        </div>

                    </Link>

                </div>


                {/* =================================================
                    MENU
                ================================================= */}

                <nav
                    className="
                        flex-1
                        px-4
                        py-6
                        overflow-y-auto
                    "
                >

                    <p
                        className="
                            text-[11px]
                            uppercase
                            tracking-widest
                            text-green-300/60
                            font-semibold
                            px-4
                            mb-4
                        "
                    >
                        Menu
                    </p>


                    <div className="space-y-2">

                        {menu.map((item) => {

                            const active =
                                location.pathname ===
                                item.path;


                            return (

                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`
                                        group
                                        flex
                                        items-center
                                        gap-4
                                        px-4
                                        py-3.5
                                        rounded-2xl
                                        transition-all
                                        duration-300
                                        ${
                                            active
                                                ? "bg-[#00B86B] text-white shadow-lg shadow-green-900/30"
                                                : "text-green-100/70 hover:bg-[#09634B] hover:text-white"
                                        }
                                    `}
                                >

                                    {/* Icon */}

                                    <span
                                        className={`
                                            text-lg
                                            transition-all
                                            duration-300
                                            ${
                                                active
                                                    ? "text-white"
                                                    : "text-green-200/70 group-hover:text-[#00D084]"
                                            }
                                        `}
                                    >

                                        {item.icon}

                                    </span>


                                    {/* Name */}

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        {item.name}
                                    </span>


                                    {/* Active Dot */}

                                    {active && (

                                        <span
                                            className="
                                                ml-auto
                                                w-2
                                                h-2
                                                rounded-full
                                                bg-white
                                            "
                                        />

                                    )}

                                </Link>

                            );

                        })}

                    </div>

                </nav>


                {/* =================================================
                    BOTTOM USER
                ================================================= */}

                <div
                    className="
                        p-4
                        border-t
                        border-[#0B6B50]
                    "
                >

                    {/* User Card */}

                    <Link
                        to="/profile"
                        className="
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                            mb-3
                            rounded-2xl
                            bg-[#07553F]
                            hover:bg-[#09634B]
                            transition
                        "
                    >

                        <FaUserCircle
                            className="
                                text-3xl
                                text-green-200
                            "
                        />


                        <div className="min-w-0">

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-white
                                    truncate
                                "
                            >
                                Gayatri
                            </p>


                            <p
                                className="
                                    text-xs
                                    text-green-200/60
                                "
                            >
                                Eco User
                            </p>

                        </div>

                    </Link>


                    {/* Logout */}

                    <button
                        type="button"
                        onClick={logout}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            text-sm
                            text-green-100/70
                            hover:text-red-300
                            hover:bg-red-500/10
                            transition
                        "
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </aside>


            {/* =================================================
                MOBILE TOP BAR
            ================================================= */}

            <div
                className="
                    md:hidden
                    fixed
                    top-0
                    left-0
                    right-0
                    h-16
                    bg-[#064E3B]
                    z-50
                    flex
                    items-center
                    px-5
                    border-b
                    border-[#0B6B50]
                "
            >

                {/* Mobile Logo */}

                <div
                    className="
                        w-9
                        h-9
                        rounded-full
                        bg-[#00B86B]
                        flex
                        items-center
                        justify-center
                    "
                >

                    <FaLeaf
                        className="text-white"
                    />

                </div>


                <span
                    className="
                        ml-3
                        font-bold
                        text-lg
                        text-white
                    "
                >
                    Carbon Tracker
                </span>

            </div>

        </>
    );
}


export default Sidebar;