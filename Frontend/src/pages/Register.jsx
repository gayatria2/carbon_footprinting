// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";

// function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     sustainability_preference: "Eco Friendly",
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle Register
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       // alert("Password and Confirm Password do not match");
//       return;
//     }

//     try {
//       const data = {
//         full_name: formData.full_name,
//         email: formData.email,
//         password: formData.password,
//         sustainability_preference: formData.sustainability_preference,
//       };

//       const res = await registerUser(data);

//       // alert(res.data.message);

//       navigate("/");
//     } catch (error) {
//       // alert(error.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 flex items-center justify-center relative overflow-hidden">

//       {/* Background Blur */}
//       <div className="absolute top-10 left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20"></div>

//       <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400 rounded-full blur-3xl opacity-20"></div>

//       {/* Register Card */}

//       <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white p-8 z-10">

//         {/* Logo */}

//         <div className="text-center mb-8">

//           <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center shadow-lg mb-4">
//             <span className="text-5xl">🌱</span>
//           </div>

//           <h1 className="text-4xl font-extrabold text-green-700">
//             Create Account
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Join Carbon Tracker and Start Your Green Journey 🌍
//           </p>

//         </div>

//         {/* Form */}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block font-semibold mb-2">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="full_name"
//               value={formData.full_name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 outline-none transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 outline-none transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Create Password"
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 outline-none transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-2">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 outline-none transition"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition duration-300 hover:scale-105"
//           >
//              Create Account
//           </button>

//         </form>

//         {/* Divider */}

//         <div className="flex items-center my-6">

//           <div className="flex-1 border-t"></div>

//           <span className="px-3 text-gray-400 text-sm">
//             OR
//           </span>

//           <div className="flex-1 border-t"></div>

//         </div>

//         {/* Google Button */}

//         <button
//           type="button"
//           className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-100 py-3 rounded-xl font-semibold text-gray-700 shadow-sm transition duration-300"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />

//           Continue with Google
//         </button>

//         {/* Login */}

//         <p className="text-center mt-6 text-gray-600">

//           Already have an account?

//           <Link
//             to="/login"
//             className="ml-2 text-green-700 font-bold hover:text-green-900"
//           >
//             Login
//           </Link>

//         </p>

//       </div>

//     </div>
//   );
// }

// export default Register;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser, googleLogin } from "../services/authService";

import { GoogleLogin } from "@react-oauth/google";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sustainability_preference: "Eco Friendly",
  });

  const [loading, setLoading] = useState(false);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // =====================================================
  // NORMAL REGISTER
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      return;

    }


    try {

      setLoading(true);


      const data = {

        full_name:
          formData.full_name,

        email:
          formData.email,

        password:
          formData.password,

        sustainability_preference:
          formData.sustainability_preference,

      };


      const res =
        await registerUser(data);


      if (res.data?.success) {

        navigate("/login");

      }

    } catch (error) {

      console.error(
        "Registration Error:",
        error?.response?.data ||
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // GOOGLE REGISTER / LOGIN
  // =====================================================

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {

    try {

      setLoading(true);


      const credential =
        credentialResponse?.credential;


      if (!credential) {

        return;

      }


      const res =
        await googleLogin(
          credential
        );


      console.log(
        "Google Register Response:",
        res.data
      );


      if (res.data?.success) {

        localStorage.setItem(
          "token",
          res.data.token
        );


        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );


        navigate("/dashboard");

      }

    } catch (error) {

      console.error(
        "Google Register Error:",
        error?.response?.data ||
        error
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 px-4 py-8">


      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-300 opacity-20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400 opacity-20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-200 opacity-10 blur-3xl" />


      {/* ================================================= */}
      {/* REGISTER CARD */}
      {/* ================================================= */}

      <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10">


        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg">

            <span className="text-5xl">
              🌱
            </span>

          </div>


          <h1 className="text-4xl font-extrabold tracking-tight text-green-700">

            Create Account

          </h1>


          <p className="mt-2 text-gray-500">

            Join Carbon Tracker and start your green journey 🌍

          </p>

        </div>


        {/* ================================================= */}
        {/* REGISTER FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          {/* FULL NAME */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">

              Full Name

            </label>


            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              required
            />

          </div>


          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">

              Email Address

            </label>


            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              required
            />

          </div>


          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">

              Password

            </label>


            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              required
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">

              Confirm Password

            </label>


            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              required
            />

          </div>


          {/* PASSWORD ERROR */}

          {formData.confirmPassword &&
            formData.password !==
              formData.confirmPassword && (

              <p className="text-sm font-medium text-red-500">

                Password and confirm password do not match.

              </p>

            )}


          {/* REGISTER BUTTON */}

          <button
            type="submit"
            disabled={
              loading ||
              formData.password !==
                formData.confirmPassword
            }
            className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-[1.01] hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading
              ? "Please wait..."
              : "Create Account"}

          </button>

        </form>


        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}

        <div className="my-6 flex items-center">

          <div className="h-px flex-1 bg-gray-200" />

          <span className="px-3 text-sm text-gray-400">

            OR

          </span>

          <div className="h-px flex-1 bg-gray-200" />

        </div>


        {/* ================================================= */}
        {/* GOOGLE REGISTER */}
        {/* ================================================= */}

        <div className="flex w-full justify-center">

          <GoogleLogin

            onSuccess={
              handleGoogleSuccess
            }

            onError={() => {
              console.error(
                "Google Login Failed"
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
        {/* LOGIN LINK */}
        {/* ================================================= */}

        <p className="mt-6 text-center text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-bold text-green-700 transition hover:text-green-900"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;