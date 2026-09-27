import { useEffect, useState } from "react";

import {
  FaLeaf,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import {
  getEmissionFactors,
  createEmissionFactor,
  updateEmissionFactor,
  deleteEmissionFactor,
  toggleEmissionFactorStatus,
} from "../services/adminEmissionFactorService";


const emptyForm = {
  activity_type: "",
  sub_type: "",
  unit: "",
  factor: "",
  description: "",
  status: "Active",
};


const AdminEmissionFactors = () => {

  const [factors, setFactors] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =====================================================
  // LOAD
  // =====================================================

  const loadFactors = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getEmissionFactors();

      if (response.data.success) {

        setFactors(
          response.data.data || []
        );

      }

    } catch (err) {

      console.error(
        "Emission Factors Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to load emission factors"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadFactors();
  }, []);


  // =====================================================
  // INPUT
  // =====================================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };


  // =====================================================
  // OPEN CREATE
  // =====================================================

  const openCreate = () => {

    setEditingId(null);

    setForm(emptyForm);

    setError("");

    setShowModal(true);

  };


  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEdit = (factor) => {

    setEditingId(factor.id);

    setForm({

      activity_type:
        factor.activity_type || "",

      sub_type:
        factor.sub_type || "",

      unit:
        factor.unit || "",

      factor:
        factor.factor ?? "",

      description:
        factor.description || "",

      status:
        factor.status || "Active",

    });

    setError("");

    setShowModal(true);

  };


  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (
      !form.activity_type ||
      !form.unit ||
      form.factor === ""
    ) {

      setError(
        "Activity type, unit and factor are required."
      );

      return;

    }


    if (
      Number.isNaN(
        Number(form.factor)
      ) ||
      Number(form.factor) < 0
    ) {

      setError(
        "Please enter a valid factor."
      );

      return;

    }


    try {

      setSaving(true);


      if (editingId) {

        await updateEmissionFactor(
          editingId,
          form
        );

        setSuccess(
          "Emission factor updated successfully!"
        );

      } else {

        await createEmissionFactor(
          form
        );

        setSuccess(
          "Emission factor created successfully!"
        );

      }


      setShowModal(false);

      setForm(emptyForm);

      setEditingId(null);

      await loadFactors();

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {

      console.error(
        "Save Factor Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to save emission factor"
      );

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this emission factor?"
      );


    if (!confirmed) return;


    try {

      await deleteEmissionFactor(id);

      setFactors((prev) =>
        prev.filter(
          (factor) =>
            factor.id !== id
        )
      );

      setSuccess(
        "Emission factor deleted successfully!"
      );


      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {

      console.error(
        "Delete Factor Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to delete emission factor"
      );

    }

  };


  // =====================================================
  // TOGGLE
  // =====================================================

  const handleToggle = async (id) => {

    try {

      const response =
        await toggleEmissionFactorStatus(
          id
        );


      if (response.data.success) {

        setFactors((prev) =>
          prev.map((factor) =>
            factor.id === id
              ? {
                  ...factor,
                  status:
                    response.data.status,
                }
              : factor
          )
        );

      }

    } catch (err) {

      console.error(
        "Toggle Status Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to update status"
      );

    }

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredFactors =
    factors.filter((factor) => {

      const value =
        search.toLowerCase();

      return (

        factor.activity_type
          ?.toLowerCase()
          .includes(value)

        ||

        factor.sub_type
          ?.toLowerCase()
          .includes(value)

        ||

        factor.unit
          ?.toLowerCase()
          .includes(value)

      );

    });


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100">

        <AdminSidebar />

        <main className="lg:ml-72">

          <AdminNavbar />

          <div className="min-h-[70vh] flex items-center justify-center">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

              <p className="mt-4 text-slate-500">
                Loading emission factors...
              </p>

            </div>

          </div>

        </main>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-slate-100">

      <AdminSidebar />


      <main className="lg:ml-72">

        <AdminNavbar />


        <div className="p-6 lg:p-8">


          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>

              <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider">
                System Configuration
              </p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">
                Emission Factors
              </h1>

              <p className="text-slate-500 mt-2">
                Manage carbon emission factors
                used by the system.
              </p>

            </div>


            <button
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold shadow-sm"
            >

              <FaPlus />

              Add Factor

            </button>

          </div>


          {/* ALERT */}

          {error && (

            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 flex justify-between">

              <span>
                {error}
              </span>

              <button
                onClick={() =>
                  setError("")
                }
              >
                <FaTimes />
              </button>

            </div>

          )}


          {success && (

            <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4">

              {success}

            </div>

          )}


          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">


            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Factors
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {factors.length}
              </h2>

            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Active Factors
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">

                {
                  factors.filter(
                    (factor) =>
                      factor.status ===
                      "Active"
                  ).length
                }

              </h2>

            </div>


            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Inactive Factors
              </p>

              <h2 className="text-3xl font-bold text-slate-500 mt-2">

                {
                  factors.filter(
                    (factor) =>
                      factor.status ===
                      "Inactive"
                  ).length
                }

              </h2>

            </div>

          </div>


          {/* SEARCH */}

          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">

            <div className="relative max-w-md">

              <FaSearch className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                placeholder="Search factors..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />

            </div>

          </div>


          {/* TABLE */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Activity
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Sub Type
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Unit
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Factor
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredFactors.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-16 text-slate-400"
                      >

                        <FaLeaf className="mx-auto text-3xl mb-3 opacity-40" />

                        No emission factors found.

                      </td>

                    </tr>

                  ) : (

                    filteredFactors.map(
                      (factor) => (

                        <tr
                          key={factor.id}
                          className="hover:bg-slate-50 transition"
                        >

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">

                                <FaLeaf />

                              </div>


                              <div>

                                <p className="font-semibold text-slate-900">

                                  {
                                    factor.activity_type
                                  }

                                </p>

                                <p className="text-xs text-slate-400">

                                  {
                                    factor.description ||
                                    "Carbon emission factor"
                                  }

                                </p>

                              </div>

                            </div>

                          </td>


                          <td className="px-6 py-5 text-sm text-slate-600">

                            {
                              factor.sub_type ||
                              "-"
                            }

                          </td>


                          <td className="px-6 py-5">

                            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium">

                              {
                                factor.unit
                              }

                            </span>

                          </td>


                          <td className="px-6 py-5">

                            <span className="text-lg font-bold text-emerald-600">

                              {
                                Number(
                                  factor.factor
                                ).toFixed(4)
                              }

                            </span>

                          </td>


                          <td className="px-6 py-5">

                            <button
                              onClick={() =>
                                handleToggle(
                                  factor.id
                                )
                              }
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                                factor.status ===
                                "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >

                              {factor.status ===
                              "Active" ? (
                                <FaToggleOn />
                              ) : (
                                <FaToggleOff />
                              )}

                              {
                                factor.status
                              }

                            </button>

                          </td>


                          <td className="px-6 py-5">

                            <div className="flex justify-end gap-2">

                              <button
                                onClick={() =>
                                  openEdit(
                                    factor
                                  )
                                }
                                className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                              >

                                <FaEdit />

                              </button>


                              <button
                                onClick={() =>
                                  handleDelete(
                                    factor.id
                                  )
                                }
                                className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                              >

                                <FaTrash />

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

          </div>

        </div>

      </main>


      {/* ================================================= */}
      {/* MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl">

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">

              <div>

                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Configuration
                </p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId
                    ? "Edit Emission Factor"
                    : "Add Emission Factor"}
                </h2>

              </div>


              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >

                <FaTimes />

              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* ACTIVITY */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Activity Type
                </label>

                <select
                  name="activity_type"
                  value={
                    form.activity_type
                  }
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-emerald-500"
                  required
                >

                  <option value="">
                    Select Activity
                  </option>

                  <option value="Transportation">
                    Transportation
                  </option>

                  <option value="Electricity">
                    Electricity
                  </option>

                  <option value="Waste">
                    Waste
                  </option>

                  <option value="Food">
                    Food
                  </option>

                  <option value="Recycling">
                    Recycling
                  </option>

                  <option value="Heating & Cooling">
                    Heating & Cooling
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Travel">
                    Travel
                  </option>

                </select>

              </div>


              {/* SUB TYPE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Sub Type
                </label>

                <input
                  type="text"
                  name="sub_type"
                  value={
                    form.sub_type
                  }
                  onChange={handleChange}
                  placeholder="Example: Car"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-emerald-500"
                />

              </div>


              {/* UNIT + FACTOR */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Unit
                  </label>

                  <input
                    type="text"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    placeholder="kg/km"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-emerald-500"
                    required
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Factor
                  </label>

                  <input
                    type="number"
                    name="factor"
                    value={form.factor}
                    onChange={handleChange}
                    min="0"
                    step="0.0001"
                    placeholder="0.2100"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-emerald-500"
                    required
                  />

                </div>

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe this emission factor..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-emerald-500 resize-none"
                />

              </div>


              {/* STATUS */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-emerald-500"
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                >

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Factor"
                    : "Add Factor"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminEmissionFactors;