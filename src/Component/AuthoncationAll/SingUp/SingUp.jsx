import React, { useContext, useState } from 'react';
import "./Singup.css"
// import singUpImage from "../../../assets/login/singUp.png"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const SingUp = () => {

    // ===================================================================
    //  // VIP all Data Start
    // ===================================================================
    const { data: UserVIPAllData = [], refetch } = useQuery({
        queryKey: ["VIPAllData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/VIPAllData");
            return res.json();
        },
    });
    // console.log(UserVIPAllData)



    // ===================================================================

    let [xx, setXx] = useState(true)
    let [btnDisable, setBtnDisable] = useState(false)

    // ================================================

    const { register, handleSubmit, formState: { errors } } = useForm();
    let { createUser, logOutUser } = useContext(AuthContext)

    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")
    let navigate = useNavigate()
    let DataRef = useParams()
    let UserReferUseAccount = DataRef.id
    // console.log(UserReferUseAccount)



    // ========================================
    // User Save Database 
    // ========================================

    let onSubmit = (data) => {
        setError("")
        setSuccess("")
        setBtnDisable(true)
        let FirstName = data.FirstName
        let LastName = data.LastName
        let Email = data.email
        let Password = data.password
        let confirmPassword = data.confirmPassword
        let UseRefCode = data.ReferCode
        let date = moment().format("MM/D/YY , hh:mm A")
        // console.log(UserReferUseAccount)

        if (Password !== confirmPassword) {
            setError("Please Meatch Your Password")
            return
        }
        // console.log(allData)

        createUser(Email, Password)
            .then(result => {
                let createUser = result.user

                // console.log(createUser)
                // user Update 
                updateProfile(createUser, { displayName: FirstName })
                    .then(() => {
                        let saveUser = { name: createUser.displayName, UseRefCode, LastName: LastName, Password, email: createUser.email, photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", userId: Math.round(Math.random() * 99999999).toString(), role: "admin", status: "pending", date, referId: Math.round(Math.random() * 99999999).toString(), userBalance: 0 }

                        console.log(saveUser) 
                        // save user DB 
                        fetch("http://localhost:5000/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data)
                                if (data.insertedId) {

                                    setSuccess(" Your SingUp Successfully ")

                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Congratulation New user, Login Now",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                    setBtnDisable(false)
                                }
                                logOutUser()
                                    .then(result => { navigate("/login") })
                                    .then(error => { })
                            })

                    })
                    .catch(error => {
                    })

            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }



    return (
        <div className='SingUpParent pt-[58px] pb-[28px]'>
            <ToastContainer />

            <div className='SingUp w-[100%] lg:w-[440px] mx-auto rounded-[4px] bg-white'>

                <div className='MaineCard'>
                    <div className="Right col-span-4">

                        <h2 className='text-[27px] font-[500] text-black pt-[28px] text-center'>SINGUP</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className='FromData px-3 md:px-[20px]' >

                            <div className="">
                                <div className='relative'>
                                    <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='First Name' type="text" {...register("FirstName", { required: true })} name='FirstName' />
                                    <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'><i class="fa fa-user" aria-hidden="true"></i></h4>
                                    {errors.FirstName && <span className='text-red-600  font-semibold'>Your First Name is required</span>}
                                </div>
                                <div className='relative'>
                                    <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Last Name' type="text" {...register("LastName", { required: true })} name='LastName' />
                                    <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'><i class="fa fa-user" aria-hidden="true"></i></h4>
                                    {errors.LastName && <span className='text-red-600 font-semibold'>Your Last Name is required</span>}
                                </div>
                            </div>
                            <div className='relative'>
                                <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]'

                                    placeholder='Email'
                                    type="email"
                                    {...register("email", { required: true })}
                                />


                                <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'>@</h4>
                                {errors.email && <span className='text-red-600 font-semibold'>Your Email  is required</span>}
                            </div>
                            <div className="">
                                <div className='relative'>
                                    <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Password' type={xx == true ? "password" : "text"} name='password'
                                        {...register("password",
                                            {
                                                required: true,
                                            })}
                                    />
                                    <button onClick={() => setXx(!xx)} className='absolute top-[34px] right-[22px] text-[18px]'>
                                        <i className={xx === true ? "fa fa-lock" : "fa fa-unlock"} aria-hidden="true"></i>
                                    </button>

                                    {errors.password?.type === "required" && <span className='text-red-600 font-semibold'>Password field is required</span>}
                                </div>

                                <div className='relative'>
                                    <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Confirm Password' type={xx == true ? "password" : "text"}    {...register("confirmPassword", { required: true })} name='confirmPassword' />
                                    <button onClick={() => setXx(!xx)} className='absolute top-[34px] right-[22px] text-[18px]'>
                                        <i className={xx === true ? "fa fa-lock" : "fa fa-unlock"} aria-hidden="true"></i>
                                    </button>

                                    {errors.confirmPassword && <span className='text-red-600 font-semibold'>Your confirmPassword  is required</span>}
                                </div>

                            </div>

                            <div className='relative'>
                                <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Refer Code Please' type="number" {...register("ReferCode", { required: true })} name='ReferCode' defaultValue={UserReferUseAccount} />
                                <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'><i class="fa fa-user" aria-hidden="true"></i></h4>
                                {errors.ReferCode && <span className='text-red-600  font-semibold'>Your Refer Code is required</span>}
                            </div>


                            {/* ============================ */}
                            <h3 className='text-[#22afa3] text-[26px] font-[500] py-[6px]'>{success}</h3>
                            <h3 className='text-[#f93333] text-[15px] font-[500] py-[6px]'>{error}</h3>


                            {/* ======================== */}
                            <button disabled={btnDisable} className='Register mt-[4px] w-[100%] bg-[#22afa3] py-[10px] rounded-[7px] text-white text-[18px] font-[600]' type="submit">Register Now</button>

                            {/* ========================= */}
                            <h3 className="mt-[23px] mb-[18px] text-[14px] font-[400] text-white ">Already have an account? <Link className='text-[#f93333] text-[15px] font-[500] ' to="/login">Login</Link></h3>

                        </form>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default SingUp;






