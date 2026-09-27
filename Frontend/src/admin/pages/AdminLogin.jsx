import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    FaLeaf,
    FaLock,
    FaEnvelope,
    FaShieldAlt
} from "react-icons/fa";

import {
    adminLogin
} from "../services/adminAuthService";


function AdminLogin() {

    const navigate =
        useNavigate();


    const [formData, setFormData] =
        useState({

            email: "",

            password: ""

        });


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

        setError("");

    };


    // =====================================================
    // LOGIN
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);

            setError("");


            const response =
                await adminLogin(
                    formData
                );


            console.log(
                "ADMIN LOGIN:",
                response.data
            );


            if (
                response.data?.success
            ) {

                localStorage.setItem(
                    "adminToken",
                    response.data.token
                );


                localStorage.setItem(
                    "admin",
                    JSON.stringify(
                        response.data.admin
                    )
                );


                navigate(
                    "/admin/dashboard"
                );

            }

        } catch (err) {

            console.error(
                "ADMIN LOGIN ERROR:",
                err?.response?.data ||
                err
            );


            setError(
                err?.response?.data?.message ||
                "Admin login failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            relative
            flex
            min-h-screen
            items-center
            justify-center
            overflow-hidden
            bg-gradient-to-br
            from-slate-950
            via-emerald-950
            to-slate-900
            px-4
        ">


            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="
                absolute
                left-10
                top-10
                h-72
                w-72
                rounded-full
                bg-emerald-500/20
                blur-3xl
            " />


            <div className="
                absolute
                bottom-10
                right-10
                h-80
                w-80
                rounded-full
                bg-green-500/20
                blur-3xl
            " />


            {/* =====================================================
                CARD
            ===================================================== */}

            <div className="
                relative
                z-10
                w-full
                max-w-md
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-white/10
                p-8
                shadow-2xl
                backdrop-blur-2xl
                sm:p-10
            ">


                {/* =====================================================
                    ICON
                ===================================================== */}

                <div className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    from-emerald-400
                    to-green-600
                    text-3xl
                    text-white
                    shadow-xl
                ">

                    <FaLeaf />

                </div>


                {/* =====================================================
                    TITLE
                ===================================================== */}

                <div className="
                    mt-6
                    text-center
                ">

                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-emerald-300
                    ">

                        <FaShieldAlt />

                        Admin Portal

                    </div>


                    <h1 className="
                        mt-3
                        text-3xl
                        font-black
                        text-white
                    ">

                        Carbon Tracker

                    </h1>


                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-300
                    ">

                        Secure administration
                        dashboard

                    </p>

                </div>


                {/* =====================================================
                    ERROR
                ===================================================== */}

                {error && (

                    <div className="
                        mt-6
                        rounded-xl
                        border
                        border-red-400/20
                        bg-red-500/10
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-red-300
                    ">

                        {error}

                    </div>

                )}


                {/* =====================================================
                    FORM
                ===================================================== */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        mt-8
                        space-y-5
                    "
                >


                    {/* EMAIL */}

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-semibold
                            text-slate-200
                        ">

                            Admin Email

                        </label>


                        <div className="
                            relative
                        ">

                            <FaEnvelope className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            " />


                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="admin@carbontracker.com"
                                required
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    px-11
                                    py-3.5
                                    text-white
                                    outline-none
                                    placeholder:text-slate-500
                                    focus:border-emerald-400
                                    focus:ring-4
                                    focus:ring-emerald-400/10
                                "
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-semibold
                            text-slate-200
                        ">

                            Password

                        </label>


                        <div className="
                            relative
                        ">

                            <FaLock className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            " />


                            <input
                                type="password"
                                name="password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter admin password"
                                required
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    px-11
                                    py-3.5
                                    text-white
                                    outline-none
                                    placeholder:text-slate-500
                                    focus:border-emerald-400
                                    focus:ring-4
                                    focus:ring-emerald-400/10
                                "
                            />

                        </div>

                    </div>


                    {/* LOGIN */}

                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                        className="
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-emerald-500
                            to-green-600
                            py-3.5
                            font-black
                            text-white
                            shadow-xl
                            transition
                            hover:-translate-y-0.5
                            hover:shadow-emerald-500/20
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In to Admin Panel"}

                    </button>


                </form>


                {/* =====================================================
                    FOOTER
                ===================================================== */}

                <div className="
                    mt-7
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    text-slate-400
                ">

                    <FaShieldAlt />

                    Authorized administrators only

                </div>


            </div>

        </div>

    );

}


export default AdminLogin;