











import { useEffect, useState } from "react";

// import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import StatsCards from "../components/StatsCards";
import CarbonChart from "../components/CarbonChart";
import CarbonPieChart from "../components/CarbonPieChart";
import Footer from "../components/Footer";

import { getDashboard } from "../services/dashboardService";
// import Slider from "../components/Slider";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        console.log("Logged In User:", user);

        if (user?.id) {
            loadDashboard(user.id);
        }

    }, []);


    const loadDashboard = async (id) => {

        try {

            const res = await getDashboard(id);

            console.log(
                "Dashboard Data:",
                res.data.data
            );

            setDashboard(res.data.data);

        } catch (error) {

            console.log(
                "Dashboard Error:",
                error
            );

        }

    };


    if (!dashboard) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7FAF8]">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-gray-500 font-medium">
                        Loading Dashboard...
                    </p>

                </div>

            </div>
        );

    }


   return (
    <div className="min-h-screen bg-[#F7FAF8] overflow-x-hidden">

        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main
            className="
                md:ml-64
                w-full
                md:w-[calc(100%-16rem)]
                min-h-screen
                overflow-x-hidden
            "
        >

            {/* Dashboard Content */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <Hero dashboard={dashboard} />

                <StatsCards dashboard={dashboard} />

                <CarbonChart dashboard={dashboard} />

                <CarbonPieChart dashboard={dashboard} />

            </div>

            <Footer />

        </main>

    </div>
);
}

export default Dashboard;
