import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  loginUser,
  googleLogin,
} from "../services/authService";

import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await loginUser(formData);

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error?.response?.data || error
      );

      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to login. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const credential = credentialResponse?.credential;

      if (!credential) {
        setErrorMessage(
          "Google authentication failed. Please try again."
        );
        return;
      }

      const res = await googleLogin(credential);

      console.log(
        "Google Login Response:",
        res.data
      );

      if (res.data?.success) {
        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Google Login Error:",
        error?.response?.data || error
      );

      setErrorMessage(
        error?.response?.data?.message ||
          "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#e8f8ef] via-[#f4fbf7] to-[#e9f7de] px-4 py-8 sm:py-10">

      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />

      <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-200/10 blur-3xl" />

      {/* ================================================= */}
      {/* LOGIN CARD */}
      {/* ================================================= */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center justify-center">

        <div className="w-full rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_25px_70px_rgba(16,80,47,0.15)] backdrop-blur-2xl sm:p-10">

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div className="mb-8 text-center">

            <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-emerald-200/70 blur-xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-green-100 to-emerald-100 text-5xl shadow-[0_12px_30px_rgba(16,185,129,0.20)]">
                🌍
              </div>

            </div>

            <h1 className="text-4xl font-black tracking-tight text-[#087f4d] sm:text-[2.7rem]">
              Carbon Tracker
            </h1>

            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />

            <p className="mt-4 text-sm font-medium text-slate-500 sm:text-base">
              Track • Reduce • Save the Planet
              <span className="ml-1">🌱</span>
            </p>

          </div>

          {/* ================================================= */}
          {/* ERROR MESSAGE */}
          {/* ================================================= */}

          {errorMessage && (
            <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email Address
              </label>

              <div className="relative">

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  required
                />

              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                required
              />
            </div>

            {/* FORGOT */}

            <div className="flex justify-end">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                Forgot Password?
              </a>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#087f4d] via-[#09935a] to-[#08a968] py-3.5 text-lg font-extrabold text-white shadow-[0_12px_25px_rgba(8,127,77,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(8,127,77,0.30)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {loading ? "Please wait..." : "Login"}
              </span>

              <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
            </button>

          </form>

          {/* ================================================= */}
          {/* DIVIDER */}
          {/* ================================================= */}

          <div className="my-7 flex items-center">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />

            <span className="px-4 text-xs font-bold tracking-widest text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />

          </div>

          {/* ================================================= */}
          {/* GOOGLE LOGIN */}
          {/* ================================================= */}

          <div className="flex w-full justify-center overflow-hidden rounded-2xl">

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setErrorMessage(
                  "Google login failed. Please try again."
                );
              }}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="420"
            />

          </div>

          {/* ================================================= */}
          {/* REGISTER */}
          {/* ================================================= */}

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">

            <p className="text-sm text-slate-500">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-1 inline-block font-extrabold text-emerald-700 transition hover:text-emerald-900"
            >
              Create One →
            </Link>

          </div>

          {/* ================================================= */}
          {/* FOOTER TEXT */}
          {/* ================================================= */}

          <div className="mt-6 text-center">

            <p className="text-xs font-medium text-slate-400">
              Make every choice a little greener 🌍
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;