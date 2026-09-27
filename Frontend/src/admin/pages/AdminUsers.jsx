import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FaSearch,
    FaUsers,
    FaLeaf,
    FaCalendarCheck,
    FaEye,
    FaTrash,
    FaTimes,
    FaEnvelope,
    FaBullseye,
    FaArrowLeft,
} from "react-icons/fa";

import {
    getAdminUsers,
    getAdminUserById,
    deleteAdminUser,
} from "../services/adminUserService";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";


function AdminUsers() {

    // =====================================================
    // STATE
    // =====================================================

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [userLoading, setUserLoading] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState(null);


    // =====================================================
    // LOAD USERS
    // =====================================================

    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getAdminUsers();


            console.log(
                "ADMIN USERS:",
                response?.data
            );


            if (
                response?.data?.success
            ) {

                setUsers(
                    response.data.data || []
                );

            } else {

                setError(
                    response?.data?.message ||
                    "Unable to load users."
                );

            }

        } catch (err) {

            console.error(
                "ADMIN USERS ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredUsers =
        useMemo(() => {

            const value =
                search
                    .trim()
                    .toLowerCase();


            if (!value) {
                return users;
            }


            return users.filter(
                (user) =>
                    String(
                        user.full_name || ""
                    )
                        .toLowerCase()
                        .includes(value)

                    ||

                    String(
                        user.email || ""
                    )
                        .toLowerCase()
                        .includes(value)
            );

        }, [users, search]);


    // =====================================================
    // VIEW USER
    // =====================================================

    const handleViewUser = async (
        id
    ) => {

        try {

            setUserLoading(true);

            setError("");

            const response =
                await getAdminUserById(id);


            console.log(
                "USER DETAILS:",
                response?.data
            );


            if (
                response?.data?.success
            ) {

                setSelectedUser(
                    response.data.data
                );

            } else {

                setError(
                    response?.data?.message ||
                    "Unable to load user."
                );

            }

        } catch (err) {

            console.error(
                "USER DETAILS ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Unable to load user details."
            );

        } finally {

            setUserLoading(false);

        }

    };


    // =====================================================
    // DELETE USER
    // =====================================================

    const handleDeleteUser = async (
        id,
        name
    ) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete ${name || "this user"}? All activities of this user will also be deleted.`
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(id);

            setError("");


            const response =
                await deleteAdminUser(id);


            if (
                response?.data?.success
            ) {

                setUsers(
                    (prev) =>
                        prev.filter(
                            (user) =>
                                user.id !== id
                        )
                );


                if (
                    selectedUser?.user?.id === id
                ) {

                    setSelectedUser(null);

                }

            } else {

                setError(
                    response?.data?.message ||
                    "Unable to delete user."
                );

            }

        } catch (err) {

            console.error(
                "DELETE USER ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Unable to delete user."
            );

        } finally {

            setDeletingId(null);

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-[#F4F7F5]
            ">

                <div className="text-center">

                    <div className="
                        mx-auto
                        h-14
                        w-14
                        animate-spin
                        rounded-full
                        border-4
                        border-emerald-100
                        border-t-emerald-600
                    " />

                    <p className="
                        mt-5
                        text-sm
                        font-semibold
                        text-slate-500
                    ">
                        Loading users...
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="
            min-h-screen
            bg-[#F4F7F5]
        ">

            <AdminSidebar />


            <main className="
                min-h-screen
                lg:ml-72
            ">

                <AdminNavbar />


                <div className="
                    mx-auto
                    max-w-[1600px]
                    px-5
                    py-8
                    sm:px-8
                ">


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="
                        mb-8
                        flex
                        flex-col
                        gap-5
                        md:flex-row
                        md:items-end
                        md:justify-between
                    ">

                        <div>

                            <p className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-emerald-600
                            ">
                                Management
                            </p>


                            <h1 className="
                                mt-2
                                text-3xl
                                font-black
                                text-slate-900
                                sm:text-4xl
                            ">
                                Users
                            </h1>


                            <p className="
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-6
                                text-slate-500
                            ">
                                Manage registered Carbon Tracker users and review their activity performance.
                            </p>

                        </div>


                        {/* USER COUNT */}

                        <div className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-emerald-100
                            bg-emerald-50
                            px-4
                            py-3
                        ">

                            <div className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-600
                                text-white
                            ">

                                <FaUsers />

                            </div>


                            <div>

                                <p className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-emerald-600
                                ">
                                    Total Users
                                </p>


                                <p className="
                                    text-xl
                                    font-black
                                    text-emerald-800
                                ">
                                    {users.length}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="
                            mb-6
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            px-5
                            py-4
                            text-sm
                            font-semibold
                            text-red-600
                        ">

                            {error}

                        </div>

                    )}


                    {/* =================================================
                        SEARCH
                    ================================================= */}

                    <div className="
                        mb-6
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-4
                        shadow-sm
                    ">

                        <div className="
                            relative
                            max-w-xl
                        ">

                            <FaSearch className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            " />


                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search users by name or email..."
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    py-3.5
                                    pl-11
                                    pr-4
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    transition
                                    focus:border-emerald-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-emerald-100
                                "
                            />

                        </div>

                    </div>


                    {/* =================================================
                        USERS TABLE
                    ================================================= */}

                    <section className="
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-slate-100
                        bg-white
                        shadow-sm
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100
                            px-6
                            py-5
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-emerald-600
                                ">
                                    User Management
                                </p>


                                <h2 className="
                                    mt-1
                                    text-xl
                                    font-black
                                    text-slate-900
                                ">
                                    Registered Users
                                </h2>

                            </div>


                            <span className="
                                rounded-full
                                bg-slate-100
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-slate-500
                            ">
                                {filteredUsers.length} results
                            </span>

                        </div>


                        <div className="overflow-x-auto">

                            <table className="
                                min-w-full
                                text-left
                            ">

                                <thead>

                                    <tr className="
                                        border-b
                                        border-slate-100
                                        bg-slate-50/70
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    ">

                                        <th className="
                                            px-6
                                            py-4
                                            font-bold
                                        ">
                                            User
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            font-bold
                                        ">
                                            Preference
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            font-bold
                                        ">
                                            Activities
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            font-bold
                                        ">
                                            Carbon
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            font-bold
                                        ">
                                            Joined
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            text-right
                                            font-bold
                                        ">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredUsers.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="
                                                    px-6
                                                    py-16
                                                    text-center
                                                "
                                            >

                                                <div className="
                                                    mx-auto
                                                    flex
                                                    h-14
                                                    w-14
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-slate-100
                                                    text-xl
                                                    text-slate-400
                                                ">

                                                    <FaUsers />

                                                </div>


                                                <p className="
                                                    mt-4
                                                    font-bold
                                                    text-slate-700
                                                ">
                                                    No users found
                                                </p>


                                                <p className="
                                                    mt-1
                                                    text-sm
                                                    text-slate-400
                                                ">
                                                    Try another search term.
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredUsers.map(
                                            (user) => (

                                                <tr
                                                    key={user.id}
                                                    className="
                                                        border-b
                                                        border-slate-50
                                                        transition
                                                        hover:bg-emerald-50/20
                                                    "
                                                >

                                                    {/* USER */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            min-w-[240px]
                                                            items-center
                                                            gap-3
                                                        ">

                                                            <div className="
                                                                flex
                                                                h-11
                                                                w-11
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-xl
                                                                bg-gradient-to-br
                                                                from-emerald-100
                                                                to-green-100
                                                                font-black
                                                                text-emerald-700
                                                            ">

                                                                {(
                                                                    user.full_name ||
                                                                    "U"
                                                                )
                                                                    .charAt(0)
                                                                    .toUpperCase()}

                                                            </div>


                                                            <div className="min-w-0">

                                                                <p className="
                                                                    truncate
                                                                    text-sm
                                                                    font-black
                                                                    text-slate-800
                                                                ">
                                                                    {user.full_name}
                                                                </p>


                                                                <p className="
                                                                    mt-0.5
                                                                    flex
                                                                    items-center
                                                                    gap-1.5
                                                                    truncate
                                                                    text-xs
                                                                    text-slate-400
                                                                ">

                                                                    <FaEnvelope />

                                                                    {user.email}

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* PREFERENCE */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <span className="
                                                            inline-flex
                                                            max-w-[200px]
                                                            rounded-lg
                                                            bg-slate-100
                                                            px-3
                                                            py-1.5
                                                            text-xs
                                                            font-bold
                                                            text-slate-600
                                                        ">

                                                            {user.sustainability_preference ||
                                                                "Not set"}

                                                        </span>

                                                    </td>


                                                    {/* ACTIVITIES */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-sm
                                                            font-black
                                                            text-slate-700
                                                        ">

                                                            <FaCalendarCheck
                                                                className="
                                                                    text-blue-500
                                                                "
                                                            />

                                                            {Number(
                                                                user.totalActivities ||
                                                                0
                                                            )}

                                                        </div>

                                                    </td>


                                                    {/* CARBON */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                        ">

                                                            <FaLeaf
                                                                className="
                                                                    text-emerald-500
                                                                "
                                                            />

                                                            <span className="
                                                                text-sm
                                                                font-black
                                                                text-emerald-700
                                                            ">

                                                                {Number(
                                                                    user.totalCarbon ||
                                                                    0
                                                                ).toFixed(2)}
                                                                {" "}kg

                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* JOINED */}

                                                    <td className="
                                                        whitespace-nowrap
                                                        px-6
                                                        py-5
                                                        text-sm
                                                        font-medium
                                                        text-slate-500
                                                    ">

                                                        {formatDate(
                                                            user.created_at
                                                        )}

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            justify-end
                                                            gap-2
                                                        ">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleViewUser(
                                                                        user.id
                                                                    )
                                                                }
                                                                className="
                                                                    flex
                                                                    h-10
                                                                    w-10
                                                                    items-center
                                                                    justify-center
                                                                    rounded-xl
                                                                    bg-blue-50
                                                                    text-blue-600
                                                                    transition
                                                                    hover:bg-blue-100
                                                                "
                                                                title="View user"
                                                            >

                                                                <FaEye />

                                                            </button>


                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user.id,
                                                                        user.full_name
                                                                    )
                                                                }
                                                                disabled={
                                                                    deletingId ===
                                                                    user.id
                                                                }
                                                                className="
                                                                    flex
                                                                    h-10
                                                                    w-10
                                                                    items-center
                                                                    justify-center
                                                                    rounded-xl
                                                                    bg-red-50
                                                                    text-red-500
                                                                    transition
                                                                    hover:bg-red-100
                                                                    disabled:cursor-not-allowed
                                                                    disabled:opacity-50
                                                                "
                                                                title="Delete user"
                                                            >

                                                                {deletingId ===
                                                                user.id ? (
                                                                    <span className="
                                                                        h-4
                                                                        w-4
                                                                        animate-spin
                                                                        rounded-full
                                                                        border-2
                                                                        border-red-200
                                                                        border-t-red-500
                                                                    " />
                                                                ) : (
                                                                    <FaTrash />
                                                                )}

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>

                </div>

            </main>


            {/* =================================================
                USER DETAILS MODAL
            ================================================= */}

            {selectedUser && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    bg-slate-950/60
                    px-4
                    py-8
                    backdrop-blur-sm
                ">

                    <div className="
                        max-h-[90vh]
                        w-full
                        max-w-4xl
                        overflow-hidden
                        rounded-[2rem]
                        bg-white
                        shadow-2xl
                    ">

                        {/* MODAL HEADER */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100
                            px-6
                            py-5
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-emerald-600
                                ">
                                    User Details
                                </p>


                                <h2 className="
                                    mt-1
                                    text-2xl
                                    font-black
                                    text-slate-900
                                ">
                                    {selectedUser.user?.full_name}
                                </h2>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedUser(null)
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-slate-100
                                    text-slate-500
                                    transition
                                    hover:bg-slate-200
                                "
                            >

                                <FaTimes />

                            </button>

                        </div>


                        {/* MODAL BODY */}

                        <div className="
                            max-h-[calc(90vh-90px)]
                            overflow-y-auto
                            p-6
                        ">

                            {/* USER INFO */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-3
                            ">

                                <div className="
                                    rounded-2xl
                                    bg-slate-50
                                    p-5
                                ">

                                    <p className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    ">
                                        Email
                                    </p>


                                    <p className="
                                        mt-2
                                        break-all
                                        text-sm
                                        font-bold
                                        text-slate-700
                                    ">
                                        {selectedUser.user?.email}
                                    </p>

                                </div>


                                <div className="
                                    rounded-2xl
                                    bg-emerald-50
                                    p-5
                                ">

                                    <p className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-emerald-600
                                    ">
                                        Total Carbon
                                    </p>


                                    <p className="
                                        mt-2
                                        text-2xl
                                        font-black
                                        text-emerald-800
                                    ">
                                        {Number(
                                            selectedUser.totalCarbon ||
                                            0
                                        ).toFixed(2)}
                                        {" "}kg
                                    </p>

                                </div>


                                <div className="
                                    rounded-2xl
                                    bg-blue-50
                                    p-5
                                ">

                                    <p className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-blue-600
                                    ">
                                        Activities
                                    </p>


                                    <p className="
                                        mt-2
                                        text-2xl
                                        font-black
                                        text-blue-800
                                    ">
                                        {selectedUser.totalActivities || 0}
                                    </p>

                                </div>

                            </div>


                            {/* PREFERENCE */}

                            <div className="
                                mt-5
                                rounded-2xl
                                border
                                border-slate-100
                                bg-white
                                p-5
                            ">

                                <div className="
                                    flex
                                    items-start
                                    gap-3
                                ">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-50
                                        text-emerald-600
                                    ">

                                        <FaBullseye />

                                    </div>


                                    <div>

                                        <p className="
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-slate-400
                                        ">
                                            Sustainability Preference
                                        </p>


                                        <p className="
                                            mt-1
                                            font-black
                                            text-slate-800
                                        ">
                                            {selectedUser.user?.sustainability_preference ||
                                                "Not set"}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* ACTIVITIES */}

                            <div className="
                                mt-6
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-100
                            ">

                                <div className="
                                    border-b
                                    border-slate-100
                                    bg-slate-50
                                    px-5
                                    py-4
                                ">

                                    <h3 className="
                                        font-black
                                        text-slate-800
                                    ">
                                        Activity History
                                    </h3>

                                </div>


                                <div className="overflow-x-auto">

                                    <table className="
                                        min-w-full
                                        text-left
                                    ">

                                        <thead>

                                            <tr className="
                                                border-b
                                                border-slate-100
                                                text-xs
                                                uppercase
                                                tracking-wider
                                                text-slate-400
                                            ">

                                                <th className="
                                                    px-5
                                                    py-4
                                                    font-bold
                                                ">
                                                    Category
                                                </th>


                                                <th className="
                                                    px-5
                                                    py-4
                                                    font-bold
                                                ">
                                                    Details
                                                </th>


                                                <th className="
                                                    px-5
                                                    py-4
                                                    font-bold
                                                ">
                                                    Carbon
                                                </th>


                                                <th className="
                                                    px-5
                                                    py-4
                                                    font-bold
                                                ">
                                                    Date
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {(
                                                selectedUser.activities ||
                                                []
                                            ).length === 0 ? (

                                                <tr>

                                                    <td
                                                        colSpan="4"
                                                        className="
                                                            px-5
                                                            py-10
                                                            text-center
                                                            text-sm
                                                            text-slate-400
                                                        "
                                                    >
                                                        No activities found.
                                                    </td>

                                                </tr>

                                            ) : (

                                                selectedUser.activities.map(
                                                    (activity) => (

                                                        <tr
                                                            key={
                                                                activity.id
                                                            }
                                                            className="
                                                                border-b
                                                                border-slate-50
                                                            "
                                                        >

                                                            <td className="
                                                                px-5
                                                                py-4
                                                            ">

                                                                <span className="
                                                                    rounded-lg
                                                                    bg-emerald-50
                                                                    px-3
                                                                    py-1.5
                                                                    text-xs
                                                                    font-bold
                                                                    text-emerald-700
                                                                ">
                                                                    {
                                                                        activity.activity_type
                                                                    }
                                                                </span>

                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                                text-sm
                                                                text-slate-500
                                                            ">

                                                                {getActivityDetails(
                                                                    activity
                                                                )}

                                                            </td>


                                                            <td className="
                                                                px-5
                                                                py-4
                                                            ">

                                                                <span className="
                                                                    text-sm
                                                                    font-black
                                                                    text-emerald-700
                                                                ">

                                                                    {Number(
                                                                        activity.carbon_emission ||
                                                                        0
                                                                    ).toFixed(2)}
                                                                    {" "}kg

                                                                </span>

                                                            </td>


                                                            <td className="
                                                                whitespace-nowrap
                                                                px-5
                                                                py-4
                                                                text-sm
                                                                text-slate-500
                                                            ">

                                                                {formatDate(
                                                                    activity.activity_date
                                                                )}

                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                VIEW LOADING
            ================================================= */}

            {userLoading && !selectedUser && (

                <div className="
                    fixed
                    inset-0
                    z-[90]
                    flex
                    items-center
                    justify-center
                    bg-slate-950/30
                    backdrop-blur-sm
                ">

                    <div className="
                        rounded-2xl
                        bg-white
                        px-6
                        py-5
                        shadow-xl
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                h-5
                                w-5
                                animate-spin
                                rounded-full
                                border-2
                                border-emerald-100
                                border-t-emerald-600
                            " />

                            <span className="
                                text-sm
                                font-bold
                                text-slate-700
                            ">
                                Loading user...
                            </span>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(date) {

    if (!date) {
        return "-";
    }


    const parsed =
        new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return "-";

    }


    return parsed.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

}


// =====================================================
// ACTIVITY DETAILS
// =====================================================

function getActivityDetails(activity) {

    if (
        activity.activity_type ===
        "Transportation"
    ) {

        return `${
            activity.transport_type ||
            "Transport"
        } • ${
            Number(
                activity.distance || 0
            )
        } km`;

    }


    if (
        activity.activity_type ===
        "Electricity"
    ) {

        return `${
            Number(
                activity.electricity || 0
            )
        } kWh`;

    }


    if (
        activity.activity_type ===
        "Waste"
    ) {

        return `${
            Number(
                activity.waste || 0
            )
        } kg`;

    }


    if (
        activity.activity_type ===
        "Food"
    ) {

        return `${
            Number(
                activity.food || 0
            )
        } kg`;

    }


    // For future categories
    return "Activity recorded";

}


export default AdminUsers;