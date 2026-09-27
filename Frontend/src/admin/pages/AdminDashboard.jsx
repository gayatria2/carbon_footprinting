import {
  useEffect,
  useState,
} from "react";

import {
  FaUsers,
  FaClipboardList,
  FaLeaf,
  FaCalendarDay,
  FaBolt,
  FaBus,
  FaTrash,
  FaChartPie,
  FaUtensils,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminStatCard from "../components/AdminStatCard";

import {
  getAdminDashboard,
} from "../services/adminDashboardService";


function AdminDashboard() {

  const [
    dashboard,
    setDashboard
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {

    loadDashboard();

  }, []);


  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await getAdminDashboard();


      console.log(
        "ADMIN DASHBOARD:",
        response?.data
      );


      if (
        response?.data?.success
      ) {

        setDashboard(
          response.data.data
        );

      } else {

        setError(
          response?.data?.message ||
          "Unable to load dashboard."
        );

      }

    } catch (err) {

      console.error(
        "ADMIN DASHBOARD ERROR:",
        err?.response?.data ||
        err
      );


      setError(
        err?.response?.data?.message ||
        "Unable to load admin dashboard."
      );

    } finally {

      setLoading(false);

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
        bg-slate-950
      ">

        <div className="text-center">

          <div className="
            mx-auto
            h-14
            w-14
            animate-spin
            rounded-full
            border-4
            border-emerald-900
            border-t-emerald-400
          " />


          <p className="
            mt-5
            font-semibold
            text-slate-400
          ">
            Loading Admin Dashboard...
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="
        min-h-screen
        bg-slate-100
      ">

        <AdminSidebar />

        <main className="
          min-h-screen
          lg:ml-72
        ">

          <AdminNavbar />

          <div className="
            flex
            min-h-[70vh]
            items-center
            justify-center
            px-6
          ">

            <div className="
              max-w-lg
              rounded-3xl
              bg-white
              p-8
              text-center
              shadow-xl
            ">

              <FaLeaf className="
                mx-auto
                text-4xl
                text-red-400
              " />


              <h2 className="
                mt-4
                text-2xl
                font-black
                text-slate-900
              ">
                Dashboard unavailable
              </h2>


              <p className="
                mt-2
                text-sm
                text-slate-500
              ">
                {error}
              </p>


              <button
                type="button"
                onClick={loadDashboard}
                className="
                  mt-6
                  rounded-xl
                  bg-emerald-600
                  px-5
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-emerald-700
                "
              >
                Try Again
              </button>

            </div>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // DATA
  // =====================================================

  const totalUsers =
    Number(
      dashboard?.totalUsers || 0
    );


  const totalActivities =
    Number(
      dashboard?.totalActivities || 0
    );


  const totalCarbon =
    Number(
      dashboard?.totalCarbon || 0
    );


  const todayActivities =
    Number(
      dashboard?.todayActivities || 0
    );


  const todayCarbon =
    Number(
      dashboard?.todayCarbon || 0
    );


  const categoryCarbon =
    dashboard?.categoryCarbon || [];


  const recentActivities =
    dashboard?.recentActivities || [];


  const recentUsers =
    dashboard?.recentUsers || [];


  // =====================================================
  // CATEGORY ICON
  // =====================================================

  const getCategoryIcon = (
    category
  ) => {

    switch (category) {

      case "Transportation":
        return <FaBus />;

      case "Electricity":
        return <FaBolt />;

      case "Waste":
        return <FaTrash />;

      case "Food":
        return <FaUtensils />;

      default:
        return <FaLeaf />;

    }

  };


  return (

    <div className="
      min-h-screen
      bg-[#F4F7F5]
    ">

      {/* SIDEBAR */}

      <AdminSidebar />


      {/* MAIN */}

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
              PAGE HEADER
          ================================================= */}

          <div className="
            mb-8
            flex
            flex-col
            gap-4
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
                Overview
              </p>


              <h1 className="
                mt-2
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
              ">
                Admin Dashboard
              </h1>


              <p className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              ">
                Monitor users, activities and carbon emissions across the Carbon Tracker platform.
              </p>

            </div>


            <div className="
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50
              px-4
              py-3
            ">

              <p className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-emerald-600
              ">
                Today's Carbon
              </p>


              <p className="
                mt-1
                text-xl
                font-black
                text-emerald-800
              ">

                {todayCarbon.toFixed(2)}

                <span className="
                  ml-1
                  text-xs
                  font-bold
                  text-emerald-600
                ">
                  kg CO₂
                </span>

              </p>

            </div>

          </div>


          {/* =================================================
              STATS
          ================================================= */}

          <div className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          ">


            <AdminStatCard
              title="Total Users"
              value={totalUsers}
              subtitle="Registered users"
              icon={<FaUsers />}
              iconClass="
                bg-blue-100
                text-blue-700
              "
            />


            <AdminStatCard
              title="Total Activities"
              value={totalActivities}
              subtitle="All recorded activities"
              icon={<FaClipboardList />}
              iconClass="
                bg-violet-100
                text-violet-700
              "
            />


            <AdminStatCard
              title="Total Carbon"
              value={`${totalCarbon.toFixed(2)} kg`}
              subtitle="Platform-wide emissions"
              icon={<FaLeaf />}
              iconClass="
                bg-emerald-100
                text-emerald-700
              "
            />


            <AdminStatCard
              title="Today's Activities"
              value={todayActivities}
              subtitle="Activities recorded today"
              icon={<FaCalendarDay />}
              iconClass="
                bg-orange-100
                text-orange-700
              "
            />

          </div>


          {/* =================================================
              SECOND ROW
          ================================================= */}

          <div className="
            mt-8
            grid
            grid-cols-1
            gap-8
            xl:grid-cols-3
          ">


            {/* =================================================
                CATEGORY CARBON
            ================================================= */}

            <section className="
              rounded-[2rem]
              border
              border-slate-100
              bg-white
              p-6
              shadow-sm
              xl:col-span-1
            ">

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-600
                  ">
                    Carbon Breakdown
                  </p>


                  <h2 className="
                    mt-1
                    text-xl
                    font-black
                    text-slate-900
                  ">
                    By Category
                  </h2>

                </div>


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

                  <FaChartPie />

                </div>

              </div>


              <div className="
                mt-6
                space-y-4
              ">

                {categoryCarbon.length === 0 ? (

                  <div className="
                    rounded-2xl
                    bg-slate-50
                    p-6
                    text-center
                    text-sm
                    text-slate-400
                  ">
                    No category data available.
                  </div>

                ) : (

                  categoryCarbon.map(
                    (item, index) => {

                      const value =
                        Number(
                          item.total || 0
                        );


                      return (

                        <div
                          key={`${item.activity_type}-${index}`}
                        >

                          <div className="
                            mb-2
                            flex
                            items-center
                            justify-between
                            gap-3
                          ">

                            <div className="
                              flex
                              items-center
                              gap-2
                            ">

                              <span className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-slate-50
                                text-emerald-600
                              ">

                                {getCategoryIcon(
                                  item.activity_type
                                )}

                              </span>


                              <span className="
                                text-sm
                                font-bold
                                text-slate-700
                              ">
                                {item.activity_type}
                              </span>

                            </div>


                            <span className="
                              text-sm
                              font-black
                              text-slate-900
                            ">

                              {value.toFixed(2)}
                              {" "}kg

                            </span>

                          </div>


                          <div className="
                            h-2
                            overflow-hidden
                            rounded-full
                            bg-slate-100
                          ">

                            <div
                              className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-emerald-500
                                to-green-400
                              "
                              style={{
                                width: `${
                                  totalCarbon > 0
                                    ? Math.min(
                                        (value /
                                          totalCarbon) *
                                          100,
                                        100
                                      )
                                    : 0
                                }%`,
                              }}
                            />

                          </div>

                        </div>

                      );

                    }
                  )

                )}

              </div>

            </section>


            {/* =================================================
                RECENT ACTIVITIES
            ================================================= */}

            <section className="
              overflow-hidden
              rounded-[2rem]
              border
              border-slate-100
              bg-white
              shadow-sm
              xl:col-span-2
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
                    Monitoring
                  </p>


                  <h2 className="
                    mt-1
                    text-xl
                    font-black
                    text-slate-900
                  ">
                    Recent Activities
                  </h2>

                </div>


                <a
                  href="/admin/activities"
                  className="
                    text-sm
                    font-bold
                    text-emerald-600
                    hover:text-emerald-800
                  "
                >
                  View All
                </a>

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
                        Activity
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

                    </tr>

                  </thead>


                  <tbody>

                    {recentActivities.length === 0 ? (

                      <tr>

                        <td
                          colSpan="4"
                          className="
                            px-6
                            py-12
                            text-center
                            text-sm
                            text-slate-400
                          "
                        >
                          No recent activities found.
                        </td>

                      </tr>

                    ) : (

                      recentActivities.map(
                        (activity) => (

                          <tr
                            key={activity.id}
                            className="
                              border-b
                              border-slate-50
                              transition
                              hover:bg-emerald-50/30
                            "
                          >

                            <td className="
                              px-6
                              py-4
                            ">

                              <p className="
                                text-sm
                                font-bold
                                text-slate-800
                              ">
                                {activity.full_name ||
                                  "Unknown User"}
                              </p>


                              <p className="
                                mt-0.5
                                text-xs
                                text-slate-400
                              ">
                                {activity.email || "-"}
                              </p>

                            </td>


                            <td className="
                              px-6
                              py-4
                            ">

                              <span className="
                                inline-flex
                                rounded-lg
                                bg-slate-100
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-slate-600
                              ">
                                {activity.activity_type}
                              </span>

                            </td>


                            <td className="
                              px-6
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
                              px-6
                              py-4
                              text-sm
                              font-medium
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

            </section>

          </div>


          {/* =================================================
              RECENT USERS
          ================================================= */}

          <section className="
            mt-8
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
                  Platform
                </p>


                <h2 className="
                  mt-1
                  text-xl
                  font-black
                  text-slate-900
                ">
                  Recent Users
                </h2>

              </div>


              <a
                href="/admin/users"
                className="
                  text-sm
                  font-bold
                  text-emerald-600
                  hover:text-emerald-800
                "
              >
                View All
              </a>

            </div>


            <div className="
              grid
              grid-cols-1
              gap-4
              p-6
              md:grid-cols-2
              xl:grid-cols-4
            ">

              {recentUsers.length === 0 ? (

                <div className="
                  col-span-full
                  rounded-2xl
                  bg-slate-50
                  p-8
                  text-center
                  text-sm
                  text-slate-400
                ">
                  No users found.
                </div>

              ) : (

                recentUsers.map(
                  (user) => (

                    <div
                      key={user.id}
                      className="
                        rounded-2xl
                        border
                        border-slate-100
                        bg-[#F8FBF9]
                        p-5
                        transition
                        hover:-translate-y-0.5
                        hover:shadow-md
                      "
                    >

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <div className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-emerald-100
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
                            truncate
                            text-xs
                            text-slate-400
                          ">
                            {user.email}
                          </p>

                        </div>

                      </div>


                      <div className="
                        mt-4
                        border-t
                        border-slate-100
                        pt-3
                      ">

                        <p className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                        ">
                          Joined
                        </p>


                        <p className="
                          mt-1
                          text-xs
                          font-bold
                          text-slate-600
                        ">
                          {formatDate(
                            user.created_at
                          )}
                        </p>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </section>


        </div>

      </main>

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


  const parsedDate =
    new Date(date);


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return "-";

  }


  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

}


export default AdminDashboard;