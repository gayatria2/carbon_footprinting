import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FaSearch,
    FaClipboardList,
    FaLeaf,
    FaUser,
    FaCalendarAlt,
    FaTrash,
    FaEye,
    FaTimes,
    FaBus,
    FaBolt,
    FaRecycle,
    FaUtensils,
    FaShoppingBag,
    FaPlane,
    FaHome,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import {
    getAdminActivities,
    getAdminActivityById,
    deleteAdminActivity,
} from "../services/adminActivityService";


// =====================================================
// ADMIN ACTIVITIES
// =====================================================

function AdminActivities() {

    const [
        activities,
        setActivities
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        search,
        setSearch
    ] = useState("");


    const [
        category,
        setCategory
    ] = useState("All");


    const [
        selectedActivity,
        setSelectedActivity
    ] = useState(null);


    const [
        detailsLoading,
        setDetailsLoading
    ] = useState(false);


    const [
        deletingId,
        setDeletingId
    ] = useState(null);


    // =====================================================
    // LOAD ACTIVITIES
    // =====================================================

    useEffect(() => {

        loadActivities();

    }, []);


    const loadActivities = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getAdminActivities();


            console.log(
                "ADMIN ACTIVITIES:",
                response?.data
            );


            if (
                response?.data?.success
            ) {

                setActivities(
                    response.data.data || []
                );

            } else {

                setError(
                    response?.data?.message ||
                    "Unable to load activities."
                );

            }

        } catch (err) {

            console.error(
                "ADMIN ACTIVITIES ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Unable to load activities."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // CATEGORIES
    // =====================================================

    const categories =
        useMemo(() => {

            const unique =
                [
                    ...new Set(
                        activities
                            .map(
                                (item) =>
                                    item.activity_type
                            )
                            .filter(Boolean)
                    )
                ];


            return [
                "All",
                ...unique
            ];

        }, [activities]);


    // =====================================================
    // FILTER
    // =====================================================

    const filteredActivities =
        useMemo(() => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();


            return activities.filter(
                (activity) => {

                    const matchesSearch =
                        !searchValue ||

                        String(
                            activity.full_name ||
                            ""
                        )
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        String(
                            activity.email ||
                            ""
                        )
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        String(
                            activity.activity_type ||
                            ""
                        )
                            .toLowerCase()
                            .includes(searchValue);


                    const matchesCategory =
                        category === "All" ||
                        activity.activity_type ===
                            category;


                    return (
                        matchesSearch &&
                        matchesCategory
                    );

                }
            );

        }, [
            activities,
            search,
            category
        ]);


    // =====================================================
    // VIEW ACTIVITY
    // =====================================================

    const handleViewActivity = async (
        id
    ) => {

        try {

            setDetailsLoading(true);

            setError("");


            const response =
                await getAdminActivityById(
                    id
                );


            if (
                response?.data?.success
            ) {

                setSelectedActivity(
                    response.data.data
                );

            } else {

                setError(
                    response?.data?.message ||
                    "Unable to load activity."
                );

            }

        } catch (err) {

            console.error(
                "ACTIVITY DETAILS ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Unable to load activity details."
            );

        } finally {

            setDetailsLoading(false);

        }

    };


    // =====================================================
    // DELETE ACTIVITY
    // =====================================================

    const handleDeleteActivity = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this activity?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(id);

            setError("");


            const response =
                await deleteAdminActivity(
                    id
                );


            if (
                response?.data?.success
            ) {

                setActivities(
                    (prev) =>
                        prev.filter(
                            (activity) =>
                                activity.id !== id
                        )
                );


                if (
                    selectedActivity?.id === id
                ) {

                    setSelectedActivity(null);

                }

            } else {

                setError(
                    response?.data?.message ||
                    "Unable to delete activity."
                );

            }

        } catch (err) {

            console.error(
                "DELETE ACTIVITY ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Unable to delete activity."
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
                        Loading activities...
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
                                Activities
                            </h1>


                            <p className="
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-6
                                text-slate-500
                            ">
                                Monitor and manage carbon footprint activities recorded by all users.
                            </p>

                        </div>


                        {/* COUNT */}

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

                                <FaClipboardList />

                            </div>


                            <div>

                                <p className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-emerald-600
                                ">
                                    Total Activities
                                </p>


                                <p className="
                                    text-xl
                                    font-black
                                    text-emerald-800
                                ">
                                    {activities.length}
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
                        FILTER BAR
                    ================================================= */}

                    <section className="
                        mb-6
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-4
                        shadow-sm
                    ">

                        <div className="
                            grid
                            grid-cols-1
                            gap-4
                            lg:grid-cols-3
                        ">


                            {/* SEARCH */}

                            <div className="
                                relative
                                lg:col-span-2
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
                                    placeholder="Search by user, email or activity..."
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


                            {/* CATEGORY */}

                            <div className="relative">

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        appearance-none
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        px-4
                                        py-3.5
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        outline-none
                                        transition
                                        focus:border-emerald-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-emerald-100
                                    "
                                >

                                    {categories.map(
                                        (item) => (

                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        TABLE
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
                                    Activity Monitoring
                                </p>


                                <h2 className="
                                    mt-1
                                    text-xl
                                    font-black
                                    text-slate-900
                                ">
                                    All User Activities
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
                                {filteredActivities.length} results
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
                                            Category
                                        </th>


                                        <th className="
                                            px-6
                                            py-4
                                            font-bold
                                        ">
                                            Details
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
                                            Date
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

                                    {filteredActivities.length === 0 ? (

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

                                                    <FaClipboardList />

                                                </div>


                                                <p className="
                                                    mt-4
                                                    font-bold
                                                    text-slate-700
                                                ">
                                                    No activities found
                                                </p>


                                                <p className="
                                                    mt-1
                                                    text-sm
                                                    text-slate-400
                                                ">
                                                    Try changing your search or category filter.
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredActivities.map(
                                            (activity) => (

                                                <tr
                                                    key={activity.id}
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
                                                            min-w-[230px]
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
                                                                bg-emerald-100
                                                                font-black
                                                                text-emerald-700
                                                            ">

                                                                {(
                                                                    activity.full_name ||
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
                                                                    {activity.full_name ||
                                                                        "Unknown User"}
                                                                </p>


                                                                <p className="
                                                                    truncate
                                                                    text-xs
                                                                    text-slate-400
                                                                ">
                                                                    {activity.email ||
                                                                        "-"}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* CATEGORY */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <CategoryBadge
                                                            type={
                                                                activity.activity_type
                                                            }
                                                        />

                                                    </td>


                                                    {/* DETAILS */}

                                                    <td className="
                                                        px-6
                                                        py-5
                                                    ">

                                                        <p className="
                                                            min-w-[150px]
                                                            text-sm
                                                            font-semibold
                                                            text-slate-600
                                                        ">
                                                            {getActivityDetails(
                                                                activity
                                                            )}
                                                        </p>

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

                                                            <FaLeaf className="
                                                                text-emerald-500
                                                            " />


                                                            <span className="
                                                                whitespace-nowrap
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

                                                        </div>

                                                    </td>


                                                    {/* DATE */}

                                                    <td className="
                                                        whitespace-nowrap
                                                        px-6
                                                        py-5
                                                        text-sm
                                                        font-medium
                                                        text-slate-500
                                                    ">

                                                        {formatDate(
                                                            activity.activity_date
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


                                                            {/* VIEW */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleViewActivity(
                                                                        activity.id
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
                                                                title="View activity"
                                                            >

                                                                <FaEye />

                                                            </button>


                                                            {/* DELETE */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDeleteActivity(
                                                                        activity.id
                                                                    )
                                                                }
                                                                disabled={
                                                                    deletingId ===
                                                                    activity.id
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
                                                                title="Delete activity"
                                                            >

                                                                {deletingId ===
                                                                activity.id ? (

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
                ACTIVITY DETAILS MODAL
            ================================================= */}

            {selectedActivity && (

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
                        max-w-2xl
                        overflow-hidden
                        rounded-[2rem]
                        bg-white
                        shadow-2xl
                    ">

                        {/* HEADER */}

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
                                    Activity Details
                                </p>


                                <h2 className="
                                    mt-1
                                    text-2xl
                                    font-black
                                    text-slate-900
                                ">
                                    {selectedActivity.activity_type}
                                </h2>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedActivity(
                                        null
                                    )
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


                        {/* BODY */}

                        <div className="
                            max-h-[calc(90vh-90px)]
                            overflow-y-auto
                            p-6
                        ">


                            {/* USER */}

                            <div className="
                                rounded-2xl
                                bg-slate-50
                                p-5
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
                                        rounded-xl
                                        bg-emerald-100
                                        text-lg
                                        font-black
                                        text-emerald-700
                                    ">

                                        {(
                                            selectedActivity.full_name ||
                                            "U"
                                        )
                                            .charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div>

                                        <p className="
                                            font-black
                                            text-slate-800
                                        ">
                                            {selectedActivity.full_name ||
                                                "Unknown User"}
                                        </p>


                                        <p className="
                                            mt-1
                                            flex
                                            items-center
                                            gap-1.5
                                            text-xs
                                            text-slate-400
                                        ">

                                            <FaEnvelope />

                                            {selectedActivity.email ||
                                                "-"}

                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* CARBON */}

                            <div className="
                                mt-5
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
                                    Carbon Emission
                                </p>


                                <p className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    text-emerald-800
                                ">

                                    {Number(
                                        selectedActivity.carbon_emission ||
                                        0
                                    ).toFixed(2)}

                                    <span className="
                                        ml-2
                                        text-sm
                                        font-bold
                                        text-emerald-600
                                    ">
                                        kg CO₂
                                    </span>

                                </p>

                            </div>


                            {/* DETAILS */}

                            <div className="
                                mt-5
                                grid
                                grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            ">

                                <DetailBox
                                    label="Activity Type"
                                    value={
                                        selectedActivity.activity_type ||
                                        "-"
                                    }
                                />


                                <DetailBox
                                    label="Date"
                                    value={
                                        formatDate(
                                            selectedActivity.activity_date
                                        )
                                    }
                                />


                                {selectedActivity.transport_type && (

                                    <DetailBox
                                        label="Transport"
                                        value={
                                            selectedActivity.transport_type
                                        }
                                    />

                                )}


                                {selectedActivity.distance !=
                                    null && (
                                        <DetailBox
                                            label="Distance"
                                            value={`${Number(
                                                selectedActivity.distance ||
                                                0
                                            )} km`}
                                        />
                                    )}


                                {selectedActivity.electricity !=
                                    null && (
                                        <DetailBox
                                            label="Electricity"
                                            value={`${Number(
                                                selectedActivity.electricity ||
                                                0
                                            )} kWh`}
                                        />
                                    )}


                                {selectedActivity.waste !=
                                    null && (
                                        <DetailBox
                                            label="Waste"
                                            value={`${Number(
                                                selectedActivity.waste ||
                                                0
                                            )} kg`}
                                        />
                                    )}


                                {selectedActivity.food !=
                                    null && (
                                        <DetailBox
                                            label="Food"
                                            value={`${Number(
                                                selectedActivity.food ||
                                                0
                                            )} kg`}
                                        />
                                    )}

                            </div>


                            {/* DELETE */}

                            <button
                                type="button"
                                onClick={() => {

                                    handleDeleteActivity(
                                        selectedActivity.id
                                    );

                                    setSelectedActivity(
                                        null
                                    );

                                }}
                                className="
                                    mt-6
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-red-50
                                    py-3
                                    font-bold
                                    text-red-600
                                    transition
                                    hover:bg-red-100
                                "
                            >

                                <FaTrash />

                                Delete Activity

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                DETAILS LOADING
            ================================================= */}

            {detailsLoading &&
                !selectedActivity && (

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
                                    Loading activity...
                                </span>

                            </div>

                        </div>

                    </div>

                )}

        </div>

    );

}


// =====================================================
// CATEGORY BADGE
// =====================================================

function CategoryBadge({
    type
}) {

    const config = {

        Transportation: {
            icon: <FaBus />,
            classes:
                "bg-blue-50 text-blue-700",
        },

        Electricity: {
            icon: <FaBolt />,
            classes:
                "bg-yellow-50 text-yellow-700",
        },

        Waste: {
            icon: <FaRecycle />,
            classes:
                "bg-red-50 text-red-600",
        },

        Food: {
            icon: <FaUtensils />,
            classes:
                "bg-orange-50 text-orange-700",
        },

        Shopping: {
            icon: <FaShoppingBag />,
            classes:
                "bg-purple-50 text-purple-700",
        },

        Travel: {
            icon: <FaPlane />,
            classes:
                "bg-cyan-50 text-cyan-700",
        },

        "Heating & Cooling": {
            icon: <FaHome />,
            classes:
                "bg-rose-50 text-rose-700",
        },

        Recycling: {
            icon: <FaRecycle />,
            classes:
                "bg-emerald-50 text-emerald-700",
        },

    };


    const current =
        config[type] || {

            icon: <FaLeaf />,

            classes:
                "bg-emerald-50 text-emerald-700",

        };


    return (

        <span className={`
            inline-flex
            items-center
            gap-2
            whitespace-nowrap
            rounded-xl
            px-3
            py-2
            text-xs
            font-bold
            ${current.classes}
        `}>

            {current.icon}

            {type || "Activity"}

        </span>

    );

}


// =====================================================
// ACTIVITY DETAILS
// =====================================================

function getActivityDetails(
    activity
) {

    if (
        activity.activity_type ===
        "Transportation"
    ) {

        return `${activity.transport_type || "Transport"} • ${Number(
            activity.distance || 0
        )} km`;

    }


    if (
        activity.activity_type ===
        "Electricity"
    ) {

        return `${Number(
            activity.electricity || 0
        )} kWh`;

    }


    if (
        activity.activity_type ===
        "Waste"
    ) {

        return `${Number(
            activity.waste || 0
        )} kg`;

    }


    if (
        activity.activity_type ===
        "Food"
    ) {

        return `${Number(
            activity.food || 0
        )} kg`;

    }


    return "Activity recorded";

}


// =====================================================
// DETAIL BOX
// =====================================================

function DetailBox({
    label,
    value,
}) {

    return (

        <div className="
            rounded-2xl
            border
            border-slate-100
            bg-[#F8FBF9]
            p-5
        ">

            <p className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-400
            ">
                {label}
            </p>


            <p className="
                mt-2
                text-sm
                font-black
                text-slate-800
            ">
                {value}
            </p>

        </div>

    );

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(
    date
) {

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


export default AdminActivities;