import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Users,
  Activity,
  Leaf,
  TrendingDown,
  Download,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { getCompleteReport } from "../services/adminReportService";

const AdminReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await getCompleteReport();

      if (response.data?.success) {
        setReport(response.data.data);
      }
    } catch (error) {
      console.error("REPORT ERROR:", error);

      if (error.response?.status === 401) {
        alert("Admin session expired. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const filteredMonthly = useMemo(() => {
    if (!report?.monthly) return [];

    return report.monthly;
  }, [report]);

  const downloadCSV = () => {
    if (!report) return;

    let csv = "";

    csv += "CARBON TRACKER REPORT\n\n";

    csv += "OVERALL REPORT\n";
    csv +=
      "Total Users,Total Activities,Total Carbon,Average Carbon\n";

    csv += `${report.overall.total_users},`;
    csv += `${report.overall.total_activities},`;
    csv += `${report.overall.total_carbon},`;
    csv += `${report.overall.average_carbon}\n\n`;

    csv += "CATEGORY REPORT\n";
    csv += "Category,Activities,Carbon\n";

    report.categories.forEach((item) => {
      csv += `"${item.activity_type}",`;
      csv += `${item.total_activities},`;
      csv += `${item.total_carbon}\n`;
    });

    csv += "\nMONTHLY REPORT\n";
    csv += "Month,Activities,Carbon\n";

    report.monthly.forEach((item) => {
      csv += `${item.month},`;
      csv += `${item.total_activities},`;
      csv += `${item.total_carbon}\n`;
    });

    csv += "\nUSER REPORT\n";
    csv += "User,Email,Activities,Carbon\n";

    report.users.forEach((user) => {
      csv += `"${user.full_name}",`;
      csv += `"${user.email}",`;
      csv += `${user.total_activities},`;
      csv += `${user.total_carbon}\n`;
    });

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "carbon-tracker-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw
            className="animate-spin text-emerald-400"
            size={35}
          />

          <p className="text-slate-400">
            Generating reports...
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <FileText size={45} className="mx-auto mb-4" />

          <p className="text-slate-300">
            No report data available.
          </p>
        </div>
      </div>
    );
  }

  const overall = report.overall;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <div className="flex items-center gap-3 mb-2">

            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <FileText
                className="text-emerald-400"
                size={23}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Reports
              </h1>

              <p className="text-slate-400 text-sm">
                Carbon footprint reports and insights
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={downloadCSV}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-3 rounded-xl transition"
        >
          <Download size={18} />
          Download CSV
        </button>
      </div>

      {/* DATE FILTER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-8">

        <div className="flex items-center gap-2 mb-4">
          <Calendar
            size={18}
            className="text-emerald-400"
          />

          <h2 className="font-semibold">
            Report Period
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label className="text-xs text-slate-400 mb-2 block">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-end">

            <button
              onClick={fetchReport}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-3 rounded-xl transition"
            >
              Apply Report
            </button>

          </div>

        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <ReportCard
          title="Total Users"
          value={overall.total_users}
          icon={<Users size={21} />}
          subtitle="Users with tracked data"
        />

        <ReportCard
          title="Total Activities"
          value={overall.total_activities}
          icon={<Activity size={21} />}
          subtitle="Activities recorded"
        />

        <ReportCard
          title="Total Carbon"
          value={`${overall.total_carbon} kg`}
          icon={<Leaf size={21} />}
          subtitle="Total CO₂e emissions"
        />

        <ReportCard
          title="Average Carbon"
          value={`${overall.average_carbon} kg`}
          icon={<TrendingDown size={21} />}
          subtitle="Average per activity"
        />

      </div>

      {/* CATEGORY REPORT */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              Category Report
            </h2>

            <p className="text-sm text-slate-400">
              Carbon emissions by activity category
            </p>
          </div>

          <Leaf
            className="text-emerald-400"
            size={22}
          />
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800 text-left text-xs text-slate-400">
                <th className="py-4">
                  Category
                </th>

                <th className="py-4">
                  Activities
                </th>

                <th className="py-4">
                  Carbon
                </th>

                <th className="py-4">
                  Share
                </th>
              </tr>
            </thead>

            <tbody>
              {report.categories.map((item) => {

                const share =
                  overall.total_carbon > 0
                    ? (
                        (Number(item.total_carbon) /
                          Number(overall.total_carbon)) *
                        100
                      ).toFixed(1)
                    : 0;

                return (
                  <tr
                    key={item.activity_type}
                    className="border-b border-slate-800/60 hover:bg-slate-800/30"
                  >
                    <td className="py-4 font-medium">
                      {item.activity_type}
                    </td>

                    <td className="py-4 text-slate-300">
                      {item.total_activities}
                    </td>

                    <td className="py-4 text-emerald-400 font-semibold">
                      {item.total_carbon} kg
                    </td>

                    <td className="py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{
                              width: `${Math.min(
                                Number(share),
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs text-slate-400">
                          {share}%
                        </span>

                      </div>

                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>

        </div>
      </div>

      {/* MONTHLY REPORT */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8">

        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Monthly Carbon Report
          </h2>

          <p className="text-sm text-slate-400">
            Month-wise emission summary
          </p>
        </div>

        <div className="space-y-4">

          {filteredMonthly.length === 0 ? (
            <p className="text-slate-400">
              No monthly data available.
            </p>
          ) : (
            filteredMonthly.map((item) => {

              const maxCarbon = Math.max(
                ...filteredMonthly.map(
                  (x) => Number(x.total_carbon)
                ),
                1
              );

              const width =
                (Number(item.total_carbon) /
                  maxCarbon) *
                100;

              return (
                <div key={item.month}>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-slate-300">
                      {item.month}
                    </span>

                    <span className="text-emerald-400 font-medium">
                      {item.total_carbon} kg
                    </span>

                  </div>

                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                  <div className="text-xs text-slate-500 mt-1">
                    {item.total_activities} activities
                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>

      {/* USER REPORT */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">

        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            User Carbon Report
          </h2>

          <p className="text-sm text-slate-400">
            Individual user footprint summary
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800 text-left text-xs text-slate-400">

                <th className="py-4">
                  #
                </th>

                <th className="py-4">
                  User
                </th>

                <th className="py-4">
                  Email
                </th>

                <th className="py-4">
                  Activities
                </th>

                <th className="py-4">
                  Carbon
                </th>

              </tr>
            </thead>

            <tbody>

              {report.users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-800/60 hover:bg-slate-800/30"
                >

                  <td className="py-4 text-slate-500">
                    {index + 1}
                  </td>

                  <td className="py-4 font-medium">
                    {user.full_name}
                  </td>

                  <td className="py-4 text-slate-400">
                    {user.email}
                  </td>

                  <td className="py-4 text-slate-300">
                    {user.total_activities}
                  </td>

                  <td className="py-4 text-emerald-400 font-semibold">
                    {user.total_carbon} kg
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};


// =====================================
// REPORT CARD
// =====================================
const ReportCard = ({
  title,
  value,
  icon,
  subtitle,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {value}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          {icon}
        </div>

      </div>
    </div>
  );
};

export default AdminReports;