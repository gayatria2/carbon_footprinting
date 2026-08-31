import { useEffect, useState } from "react";

import {
  FaLeaf,
  FaLightbulb,
  FaCar,
  FaBolt,
  FaTrash,
  FaUtensils,
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
  FaSeedling,
  FaRecycle,
  FaBullseye,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getRecommendations } from "../services/recommendationService";

function Recommendation() {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD RECOMMENDATIONS
  // =====================================================

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {

    try {

      setLoading(true);
      setError("");

      const storedUser =
        localStorage.getItem("user");

      const user = storedUser
        ? JSON.parse(storedUser)
        : null;

      if (!user?.id) {

        setError(
          "User not found. Please login again."
        );

        return;
      }

      const res =
        await getRecommendations(user.id);

      console.log(
        "Recommendation Data:",
        res.data
      );

      setRecommendations(
        res.data?.data || []
      );

    } catch (err) {

      console.error(
        "Recommendation Error:",
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load recommendations."
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // ICON
  // =====================================================

  const getIcon = (type) => {

    const value =
      String(type || "")
        .trim()
        .toLowerCase();

    if (
      value === "transportation" ||
      value === "transport" ||
      value === "travel"
    ) {
      return <FaCar />;
    }

    if (
      value === "electricity" ||
      value === "electric"
    ) {
      return <FaBolt />;
    }

    if (
      value === "waste" ||
      value === "garbage"
    ) {
      return <FaTrash />;
    }

    if (
      value === "food" ||
      value === "meal" ||
      value === "diet"
    ) {
      return <FaUtensils />;
    }

    return <FaLeaf />;
  };

  // =====================================================
  // CARD STYLE
  // =====================================================

  const getCardStyle = (type) => {

    const value =
      String(type || "")
        .trim()
        .toLowerCase();

    if (
      value === "transportation" ||
      value === "transport" ||
      value === "travel"
    ) {
      return {
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        gradient: "from-emerald-50 to-white",
      };
    }

    if (
      value === "electricity" ||
      value === "electric"
    ) {
      return {
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        gradient: "from-blue-50 to-white",
      };
    }

    if (
      value === "waste" ||
      value === "garbage"
    ) {
      return {
        iconBg: "bg-orange-100",
        iconColor: "text-orange-700",
        gradient: "from-orange-50 to-white",
      };
    }

    if (
      value === "food" ||
      value === "meal" ||
      value === "diet"
    ) {
      return {
        iconBg: "bg-rose-100",
        iconColor: "text-rose-700",
        gradient: "from-rose-50 to-white",
      };
    }

    return {
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      gradient: "from-green-50 to-white",
    };
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#F4F8F5]">

          <section className="bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] px-6 py-16">

            <div className="max-w-7xl mx-auto animate-pulse">

              <div className="h-7 w-56 bg-white/20 rounded-full" />

              <div className="h-14 w-[500px] max-w-full bg-white/20 rounded-xl mt-7" />

              <div className="h-5 w-[600px] max-w-full bg-white/10 rounded mt-5" />

              <div className="h-5 w-[450px] max-w-full bg-white/10 rounded mt-3" />

            </div>

          </section>


          <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm animate-pulse"
                >

                  <div className="w-14 h-14 rounded-2xl bg-gray-200" />

                  <div className="h-3 w-24 bg-gray-200 rounded mt-6" />

                  <div className="h-7 w-2/3 bg-gray-200 rounded mt-3" />

                  <div className="h-4 w-full bg-gray-200 rounded mt-5" />

                  <div className="h-4 w-5/6 bg-gray-200 rounded mt-2" />

                </div>

              ))}

            </div>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F4F8F5]">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] text-white">

          <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-24 w-[30rem] h-[30rem] rounded-full bg-emerald-200/10 blur-3xl" />


          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              <div className="max-w-3xl">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-green-50 text-sm font-semibold">

                  <FaLightbulb />

                  Personalized Recommendations

                </div>


                <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">

                  Make Smarter
                  <br />

                  <span className="text-green-200">
                    Sustainable Choices
                  </span>

                </h1>


                <p className="mt-6 text-lg md:text-xl text-green-50 max-w-2xl leading-relaxed">

                  Personalized suggestions based on your
                  carbon emissions from the last 30 days.

                </p>


                <div className="mt-8 flex flex-wrap gap-4">

                  <Link
                    to="/activity"
                    className="inline-flex items-center gap-3 bg-white text-[#087F55] px-7 py-3.5 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition"
                  >
                    Log New Activity
                    <FaArrowRight />
                  </Link>


                  <Link
                    to="/analytics"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                  >
                    View Analytics
                    <FaChartLine />
                  </Link>

                </div>

              </div>


              <div className="hidden md:flex">

                <div className="relative w-64 h-64 rounded-[2.5rem] bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center">

                  <div className="w-36 h-36 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">

                    <FaSeedling className="text-7xl text-green-100" />

                  </div>


                  <div className="absolute -top-4 -right-4 bg-white text-[#087F55] px-4 py-2 rounded-xl shadow-xl text-sm font-bold">

                    Smart Tips

                  </div>


                  <div className="absolute -bottom-4 -left-4 bg-white text-[#063B2A] px-4 py-2 rounded-xl shadow-xl text-sm font-bold">

                    Top 3 Impact Areas

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* INFO CARDS */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-6 pt-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">

                <FaCheckCircle />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Actionable Tips
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Get simple changes that you can apply in
                your everyday life.
              </p>

            </div>


            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">

                <FaChartLine />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Impact Focused
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Recommendations are based on your highest
                carbon-emission areas.
              </p>

            </div>


            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">

                <FaRecycle />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Sustainable Habits
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Turn recommendations into sustainable
                long-term habits.
              </p>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (

          <div className="max-w-7xl mx-auto px-6 pt-10">

            <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-red-700">

              <p className="font-semibold">
                {error}
              </p>

              <button
                onClick={loadRecommendations}
                className="mt-2 text-sm font-bold underline"
              >
                Try Again
              </button>

            </div>

          </div>

        )}


        {/* ================================================= */}
        {/* RECOMMENDATIONS */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="mb-8">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">

              <FaLightbulb />

              Recommended For You

            </span>


            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-gray-900">

              Your Top Impact Areas

            </h2>


            <p className="mt-2 text-gray-500 max-w-2xl">

              These suggestions are based on the activities
              contributing most to your emissions during the
              last 30 days.

            </p>

          </div>


          {recommendations.length === 0 ? (

            <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-gray-100 shadow-sm text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-green-100 text-green-700 flex items-center justify-center text-4xl">

                <FaLeaf />

              </div>


              <h3 className="mt-7 text-2xl font-extrabold text-gray-900">

                No Recommendations Yet

              </h3>


              <p className="mt-3 text-gray-500 max-w-xl mx-auto leading-relaxed">

                Add activities and start tracking your
                carbon footprint. Personalized recommendations
                will appear once activity data is available.

              </p>


              <Link
                to="/activity"
                className="inline-flex items-center gap-3 mt-7 bg-[#087F55] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#063B2A] transition"
              >

                Add Activity

                <FaArrowRight />

              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {recommendations.map((item, index) => {

                const style =
                  getCardStyle(
                    item.type ||
                    item.activity_type
                  );

                const carbon =
                  Number(item.carbon || 0);

                const rank =
                  item.rank || index + 1;

                return (

                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-[2rem] p-7 md:p-8 bg-gradient-to-br ${style.gradient} border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                  >

                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B6E4F] to-[#08A66A]" />


                    <div className="flex items-start justify-between gap-5">

                      <div
                        className={`w-14 h-14 rounded-2xl ${style.iconBg} ${style.iconColor} flex items-center justify-center text-xl`}
                      >

                        {getIcon(
                          item.type ||
                          item.activity_type
                        )}

                      </div>


                      <div className="flex items-center gap-2">

                        <span className="px-3 py-1.5 rounded-full bg-white/80 border border-gray-100 text-xs font-bold text-gray-500">

                          #{rank}

                        </span>


                        <span className="px-3 py-1.5 rounded-full bg-white/80 border border-gray-100 text-xs font-bold text-[#0B6E4F]">

                          {item.priority ||
                            "Recommended"}

                        </span>

                      </div>

                    </div>


                    <p className="mt-6 text-xs uppercase tracking-wider font-bold text-gray-400">

                      {item.type ||
                        item.activity_type ||
                        "Sustainability"}

                    </p>


                    <h3 className="mt-2 text-2xl font-extrabold text-gray-900">

                      {item.title ||
                        "Reduce Your Carbon Footprint"}

                    </h3>


                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-white/80">

                      <FaChartLine className="text-[#0B6E4F]" />

                      <span className="text-sm font-bold text-gray-700">

                        {carbon.toFixed(2)} kg CO₂

                      </span>

                    </div>


                    <p className="mt-5 text-gray-600 leading-relaxed">

                      {item.description ||
                        "Make small sustainable changes to reduce your environmental impact."}

                    </p>


                    <div className="mt-7 pt-5 border-t border-gray-200/70 flex items-center justify-between">

                      <div className="flex items-center gap-2 text-sm font-semibold text-[#0B6E4F]">

                        <FaCheckCircle />

                        Start today

                      </div>


                      <FaArrowRight className="text-gray-300 group-hover:text-[#0B6E4F] group-hover:translate-x-1 transition" />

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>


        {/* ================================================= */}
        {/* QUICK TIPS */}
        {/* ================================================= */}

        <section className="bg-white border-y border-gray-100">

          <div className="max-w-7xl mx-auto px-6 py-16">

            <div className="text-center">

              <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                QUICK TIPS
              </span>

              <h2 className="mt-5 text-3xl font-extrabold text-gray-900">
                Simple Changes, Real Impact
              </h2>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

              <div className="rounded-2xl bg-[#F7FAF8] border border-gray-100 p-6 hover:shadow-lg transition">

                <FaCar className="text-2xl text-green-700" />

                <h3 className="mt-4 font-bold text-gray-900">
                  Use Public Transport
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Prefer shared transportation whenever practical.
                </p>

              </div>


              <div className="rounded-2xl bg-[#F7FAF8] border border-gray-100 p-6 hover:shadow-lg transition">

                <FaBolt className="text-2xl text-blue-700" />

                <h3 className="mt-4 font-bold text-gray-900">
                  Save Electricity
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Switch off unused lights and appliances.
                </p>

              </div>


              <div className="rounded-2xl bg-[#F7FAF8] border border-gray-100 p-6 hover:shadow-lg transition">

                <FaUtensils className="text-2xl text-rose-700" />

                <h3 className="mt-4 font-bold text-gray-900">
                  Reduce Food Waste
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Plan meals and avoid unnecessary food waste.
                </p>

              </div>


              <div className="rounded-2xl bg-[#F7FAF8] border border-gray-100 p-6 hover:shadow-lg transition">

                <FaTrash className="text-2xl text-orange-700" />

                <h3 className="mt-4 font-bold text-gray-900">
                  Reuse & Recycle
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Reuse useful items and separate recyclable waste.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <section className="px-6 py-20 bg-[#F4F8F5]">

          <div className="relative overflow-hidden max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-[#063B2A] via-[#087F55] to-[#0DB36F] p-8 md:p-12 text-center shadow-2xl">

            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl text-white">

                <FaLeaf />

              </div>


              <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-white">

                Ready to Reduce Your Footprint?

              </h2>


              <p className="mt-4 max-w-2xl mx-auto text-green-50 text-lg leading-relaxed">

                Log your activities, understand your impact
                and turn recommendations into sustainable habits.

              </p>


              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                <Link
                  to="/activity"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#087F55] px-7 py-3.5 rounded-xl font-bold hover:bg-green-50 transition"
                >
                  Add Activity
                  <FaArrowRight />
                </Link>


                <Link
                  to="/goal"
                  className="inline-flex items-center justify-center gap-3 border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  Set a Goal
                  <FaBullseye />
                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>


      <Footer />

    </>
  );
}

export default Recommendation;