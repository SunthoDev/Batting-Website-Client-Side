import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css"
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useRole from "../../../Hook/useRole";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {

    let [poup, setPoup] = useState(false)
    const clseAlertButton = () => {
        setPoup(false)
    }
    const HandlePasswordChange = () => {
        setPoup(true)
    }

    // ===================================================

    const { register, handleSubmit, formState: { errors } } = useForm();
    let { loginUser, PasswordResetAllUser } = useContext(AuthContext)

    const [roles] = useRole()
    const ad = roles?.role === "admin"

    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")
    let [xx, setXx] = useState(true)
    let navigate = useNavigate()
    let location = useLocation()
    let stateInfo = location.state?.from.pathname || "/"


    let onSubmit = (data) => {
        setSuccess("")
        setError("")

        let emailValue = data.email
        let passwordValue = data.Password

        loginUser(emailValue, passwordValue)
            .then(result => {
                // let user = result.user
                setSuccess("Your Login Successfully")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Login is Success",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(stateInfo)

            })
            .catch(error => {
                setError("Please Give Me Valid Password")
                // console.log(error)
            })
    }


    // ===================================================
    // Change User Email Password Validation
    // ===================================================

    let HandleChangeEmailData = (event) => {
        event.preventDefault()
        let EmailChangeValue = event.target.changeEmail.value
        // console.log(EmailChangeValue)
        PasswordResetAllUser(EmailChangeValue)
            .then(result => {
                alert("Check")
            })
            .catch(error => {
                setError(error)
            })
    }


    return (

        <div className='LoginParent bg-white pt-[134px] pb-[68px] px-4'>

            <ToastContainer />

            <div className='LogIn w-[100%] lg:w-[440px] mx-auto rounded-[4px] '>

                <div className='MaineCard'>
                    <div className="Right">

                        <h2 className='text-[27px] font-[500] text-black pt-[28px] text-center'>LOGIN</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className='FromData px-3 md:px-[20px]' >

                            <div className='relative'>
                                <input className='mt-[23px] bg-white text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Email' type="email" {...register("email", { required: true })} name='email' />
                                <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'>@</h4>
                                {errors.email && <span className='text-red-600 font-semibold'>Your Email  is required</span>}
                            </div>

                            <div className='relative'>
                                <input className='mt-[23px] bg-white text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder=' Password' type={xx == true ? "password" : "text"}    {...register("Password", { required: true })} name='Password' />
                                <button onClick={() => setXx(!xx)} className='absolute top-[34px] right-[22px] text-[18px]'>
                                    <i className={xx === true ? "fa fa-lock" : "fa fa-unlock"} aria-hidden="true"></i>
                                </button>

                                {errors.Password && <span className='text-red-600 font-semibold'>Your confirmPassword  is required</span>}
                            </div>


                            {/* ============================ */}
                            <h3 className='text-[#22afa3] text-[15px] font-[500] py-[6px]'>{success}</h3>
                            <h3 className='text-[#f93333] text-[15px] font-[500] py-[6px]'>{error}</h3>

                            {/* ============================ */}

                            <button onClick={HandlePasswordChange} className="text-right pb-3 text-[#22afa3] text-[15px] font-[500]">Forgot Password...?</button>


                            {/* ======================== */}
                            <button className='Register mt-[4px] w-[100%] bg-[#22afa3] py-[10px] rounded-[7px] text-white text-[18px] font-[600]' type="submit">LOGIN </button>
                            {/* <ToastContainer /> */}

                            {/* ========================= */}
                            <h3 className="mt-[23px] mb-[18px] text-[14px] font-[400] text-black ">Don’t have an account? <Link className='text-[#f93333] text-[15px] font-[500] ' to="/singUp/0000">Register</Link></h3>

                        </form>

                    </div>
                    
                </div>
            </div>


            {/* ============================================= */}

            <div className={`alertContainerLogin rounded-[8px]  px-4  lg:px-0 w-full lg:w-[40%]  ${poup === true && "showAlertJs"}`} >

                <div className="poup ">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h6>Change Email Request</h6>

                        <form onSubmit={HandleChangeEmailData}>
                            <input placeholder="Enter Your Email" required type="email" name="changeEmail" />
                            <button type='submit' className='UpdateButton' >Send Email Password Change</button>

                        </form>

                    </div>
                    <button onClick={clseAlertButton} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>

            </div>

            {/* ============================================= */}

        </div>

    );
};

export default Login;