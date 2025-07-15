import React from 'react';
import "./Profile.css"
import { useContext } from 'react';
import { AuthContext } from '../AuthoncationAll/AuthProvider/AuthProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useRole from '../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import A from '../../assets/AllImage/A.png';
import C from '../../assets/AllImage/C.png';
import P from '../../assets/AllImage/P.png';
import R from '../../assets/AllImage/R.png';
import aboutUs from '../../assets/AllImage/aboutUs.png';
import help from '../../assets/AllImage/help.png';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {

    const { user } = useContext(AuthContext)
    const [roles] = useRole()
    let navigate = useNavigate()
    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, status, userBalance, userId, _id } = roles

    // ========================================================================================================

    // ====================================================
    //  // user Refer Work Start
    // ====================================================
    //  Refer Poup 
    // ====================================================
    let [poupThree, setPoupThree] = useState(false)
    const clseAlertButtonThree = () => {
        setPoupThree(false)
    }
    const handleUserRefer = (id) => {
        if (user && roles?.email && user?.email) {
            setPoupThree(true)
        } else {

            Swal.fire({
                title: 'Please Login Your Account ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login", { state: { from: location } })
                        toast("Login Page Success")
                    }
                })
        }
    }
    // user REf data all find use tenStack query 
    const { data: userUserAllRef = [] } = useQuery({
        queryKey: ["UserAllRef"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserAllRef");
            return res.json();
        },
    });
    // console.log(adminAllUsers)
    // there are all ref id use account, want to useUserReferDataAll
    let useUserReferDataAll = []
    // filter active user ref id use all user
    if (user?.email && roles?.email) {

        useUserReferDataAll = userUserAllRef?.filter(RefUser => RefUser?.useRefCode === roles.referId && RefUser?.status === "approved")

    }
    // console.log(useUserReferDataAll)
    // ====================================================
    //  // user Refer Work End
    // ====================================================



    // ===================================================================
    // user All Recharge History Data Here
    // ==========================================
    const { data: userAllRechargeData = [], refetch } = useQuery({
        queryKey: ["AllRechargeData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AllRechargeData");
            return res.json();
        },
    });
    // My All Recharge Data Find
    // =======================================
    let MyAllRechargeData = userAllRechargeData?.filter(Recharge => Recharge.UserEmail === roles?.email)
    // My All Recharge Total Amount Find
    // =======================================
    let MyAllRechargeAmount = MyAllRechargeData?.reduce((current, recharge) => current + parseInt(recharge.TotalAmount), 0);
    // console.log(MyAllRechargeAmount);

    // ==========================================================
    // User all Withdraw Data Find
    // ==========================================================
    const { data: userAllWithdrawData = [] } = useQuery({
        queryKey: ["UserAllWithdrawData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserAllWithdrawData");
            return res.json();
        },
    });
    // console.log(userAllWithdrawData)

    // My All Withdraw History Data filter here
    // ===================================================== 
    let MyPaymentRequestData = userAllWithdrawData?.filter(userWithdraw => userWithdraw.UserEmail === roles?.email && userWithdraw.userId === roles?.userId)
    // console.log(userAllPaymentRequestData)
    // My All Recharge Total Amount Find
    // =======================================
    let MyAllWithdrawAmount = MyPaymentRequestData?.reduce((current, withdraw) => current + parseInt(withdraw.RequestBalance), 0);
    // console.log(MyAllWithdrawAmount);

    // ===================================================================
    //  // user All Subscription Data Start
    // ===================================================================
    const { data: UserSubscriptionDataAll = [], } = useQuery({
        queryKey: ["UserSubscriptionDataAll"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserSubscriptionDataAll");
            return res.json();
        },
    });
    // My All Subscription History Data filter here
    // ===================================================== 
    let userSubscription = []
    if (user && roles?.email && user?.email) {

        userSubscription = UserSubscriptionDataAll?.filter(userSub => userSub.UserEmail === roles?.email)
    }
    // console.log(userSubscription)
    // My All Recharge Total Amount Find
    // =======================================
    let MySubscriptionBuyAllAmount = userSubscription?.reduce((current, Subscription) => current + parseInt(Subscription.SubPrice), 0);
    // console.log(MySubscriptionBuyAllAmount);


    // User can copy uid
    // =======================================
    const notify = () => toast.success("your UID copied!");

    return (
        <div className="bg-gradient-to-r from-green-500 to-green-400 pt-[80px] pb-[100px]">

            <ToastContainer />

            <div className="bg-gradient-to-r from-green-500 to-green-400 p-4 rounded-b-xl text-white relative">
                {/* =================================================== */}
                {/* User Details and Information */}
                {/* =================================================== */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div onClick={() => document.getElementById('edit_user_Info').showModal()}>
                            <img
                                src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png"
                                alt="Profile"
                                className="w-12 h-12 rounded-full bg-white"
                            />
                        </div>
                        <div>
                            <h3 className="text-left text-xl font-bold">{name} {LastName}</h3>
                            <p className="text-left text-sm font-[600]">My UID: {userId}
                                <CopyToClipboard text={`${userId}`}>
                                    <button
                                        onClick={notify}
                                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-2 rounded-[8px] ml-[8px] hover:scale-105 transition duration-300 shadow-md"
                                    >
                                        📋 Copy Now
                                    </button>
                                </CopyToClipboard>

                            </p>
                        </div>
                    </div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1827/1827349.png"
                        alt="Bell"
                        className="w-6 h-6"
                    />
                </div>

                {/* =================================================== */}
                {/* Yellow Bank Card Warning with clip-path */}
                {/* =================================================== */}
                <div className="bg-white">
                    {/* =================================== */}
                    {/* Bank Details Here */}
                    {/* =================================== */}
                    <div
                        className="mt-4 p-4 text-black md:flex gap-2 justify-between items-center"
                        style={{
                            backgroundColor: '#FACC15',
                            // clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
                        }}
                    >
                        {
                            roles?.bankName && roles?.accountNumber && roles?.accountHolder ?
                                <div className="mb-[8px] md:mb-[0px]">
                                    <h4 className="text-[18px] text-left font-semibold">Your Bank Information Already Add</h4>
                                    <p className="text-[16px] text-left">Name: {roles?.bankName} - {roles?.accountNumber}</p>
                                </div>
                                :
                                <div className="mb-[8px] md:mb-[0px]">
                                    <h4 className="text-center md:text-left text-[18px] font-semibold">No bank card</h4>
                                    <button
                                        onClick={() => {
                                            roles?.bankName && roles?.accountNumber && roles?.accountHolder ? "" :
                                                navigate("/AllBankCard")
                                        }}
                                        type="button"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white text-sm font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <i className="fa fa-credit-card mr-2"></i>
                                        Add Bank Card
                                    </button>
                                </div>
                        }
                        <a href="https://www.dropbox.com/scl/fi/rnm84wco4yrkjvge1moof/E-CASH-ID.apk?rlkey=91e174ikz6lyewiel4tq4yal7&st=u3fy5bhm&dl=1" className=" inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
                        >
                            <i className="fa fa-download text-xl animate-bounce"></i>
                            <span className="tracking-wide">E CASH-ID App Download</span>
                        </a>
                    </div>

                    {/* =================================== */}
                    {/* All Amount Details Here */}
                    {/* =================================== */}
                    <div className="bg-white text-black mt-0 rounded-none pt-5 pb-4 px-6 grid grid-cols-3 text-center text-sm border-b border-gray-200">
                        <div>
                            <p className="font-bold text-green-500">{userBalance}</p>
                            <p className="text-gray-600">Balance</p>
                        </div>
                        <div>
                            <p className="font-bold text-green-500">{MyAllRechargeAmount}</p>
                            <p className="text-gray-600">Recharge</p>
                        </div>
                        <div>
                            <p className="font-bold text-green-500">{MyAllWithdrawAmount}</p>
                            <p className="text-gray-600">Withdrawal</p>
                        </div>
                        <div>
                            <p className="font-bold text-green-500">{MySubscriptionBuyAllAmount}</p>
                            <p className="text-gray-600">Total Buy</p>
                        </div>
                        <div>
                            <p className="font-bold text-green-500">{userSubscription?.length}</p>
                            <p className="text-gray-600">My Orders</p>
                        </div>
                    </div>

                    {/* =================================== */}
                    {/* Recharge & Withdraw Buttons */}
                    {/* =================================== */}
                    <div className="bg-white px-4 pt-4 pb-6 flex justify-between gap-3 rounded-md">
                        <button onClick={() => {
                            if (user && roles?.email && user?.email) {
                                navigate("/Recharge")
                            } else {

                                Swal.fire({
                                    title: 'Please Login Your Account ',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Login Now'
                                })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            navigate("/login", { state: { from: location } })
                                            toast("Login Page Success")
                                        }
                                    })
                            }
                        }} className="w-full bg-yellow-400 text-black py-2 rounded-full font-semibold">
                            Recharge
                        </button>
                        <button onClick={() => {
                            if (user && roles?.email && user?.email) {

                                roles?.bankName && roles?.accountNumber && roles?.accountHolder ?
                                    navigate("/Withdraw")
                                    :
                                    Swal.fire({
                                        title: 'Please Add a Bank Details',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        // confirmButtonText: 'Login Now'
                                    })
                            } else {

                                Swal.fire({
                                    title: 'Please Login Your Account ',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Login Now'
                                })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            navigate("/login", { state: { from: location } })
                                            toast("Login Page Success")
                                        }
                                    })
                            }

                        }} className="w-full bg-green-500 text-white py-2 rounded-full font-semibold">
                            Withdrawal
                        </button>
                    </div>

                </div>

                {/* =================================================== */}
                {/* Level Bar */}
                {/* =================================================== */}
                <div className="bg-white mt-3 px-4 py-2 rounded-md flex items-center justify-between">
                    <p className="font-bold text-gray-700">V0</p>
                    <div className="w-full mx-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="w-1/6 bg-green-400 h-full"></div>
                    </div>
                    <p className="font-bold text-blue-600">V1</p>
                </div>

                {/* =================================================== */}
                {/* Application Service */}
                {/* =================================================== */}
                <div className="bg-gray-50 mt-4 rounded-md px-4 py-3">
                    <h4 className="font-semibold text-black mb-2">Application service</h4>
                    {/* Recharge History */}
                    {/* ============================ */}
                    <div onClick={() => {
                        navigate("/RechargeHistory")
                    }} className="bg-white flex justify-between items-center p-4 rounded-md shadow">
                        <div className="flex items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Orders" className="w-5 h-5" />
                            <p className="font-semibold text-black">Recharge History</p>
                        </div>
                        <span className="text-gray-500">&gt;</span>
                    </div>
                    {/* Invite user History */}
                    {/* ============================ */}
                    <div onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/InventionUser")
                        } else {

                            Swal.fire({
                                title: 'Please Login Your Account ',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        navigate("/login", { state: { from: location } })
                                        toast("Login Page Success")
                                    }
                                })
                        }
                    }} className="bg-white flex justify-between items-center p-4 rounded-md shadow">
                        <div className="flex items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Orders" className="w-5 h-5" />
                            <p className="font-semibold text-black">Invite</p>
                        </div>
                        <span className="text-gray-500">&gt;</span>
                    </div>
                    {/* Refer user History */}
                    {/* ============================ */}
                    <div onClick={handleUserRefer} className="bg-white flex justify-between items-center p-4 rounded-md shadow">
                        <div className="flex items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Orders" className="w-5 h-5" />
                            <p className="font-semibold text-black">Refer</p>
                        </div>
                        <span className="text-gray-500">&gt;</span>
                    </div>
                    {/*  About Us History */}
                    {/* ============================ */}
                    <div onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/AboutUs")
                        } else {

                            Swal.fire({
                                title: 'Please Login Your Account ',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        navigate("/login", { state: { from: location } })
                                        toast("Login Page Success")
                                    }
                                })
                        }
                    }} className="bg-white flex justify-between items-center p-4 rounded-md shadow">
                        <div className="flex items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Orders" className="w-5 h-5" />
                            <p className="font-semibold text-black">About Us</p>
                        </div>
                        <span className="text-gray-500">&gt;</span>
                    </div>
                    {/*  Customer Services History */}
                    {/* ============================ */}
                    <div onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/CustomerServices")
                        } else {

                            Swal.fire({
                                title: 'Please Login Your Account ',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        navigate("/login", { state: { from: location } })
                                        toast("Login Page Success")
                                    }
                                })
                        }
                    }} className="bg-white flex justify-between items-center p-4 rounded-md shadow">
                        <div className="flex items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Orders" className="w-5 h-5" />
                            <p className="font-semibold text-black">Customer Services</p>
                        </div>
                        <span className="text-gray-500">&gt;</span>
                    </div>
                </div>

            </div>


            {/* ============================================= */}
            {/* Refer alert */}
            {/* ============================================= */}
            <div className={`alertContainerThree rounded-[8px]  px-4  lg:px-0 w-full lg:w-[36%]  ${poupThree === true && "showAlertJs"}`} >

                <div className="poup ">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h2 className="text-[#3CCC70]"> your all Refer Account</h2>

                        <div className="MyReferInformation mt-[28px]">

                            <h1>{useUserReferDataAll.length} Referrals</h1>

                            <div className="InviteRefer flex justify-between md:justify-evenly items-center px-[8px] md:px-0">
                                <h2>My invite refer Code:</h2>
                                <h3>{roles?.referId}</h3>
                            </div>

                            <div className="YourAllRefer">
                                <h4>My Referrals:</h4>

                                {
                                    useUserReferDataAll?.map(userRefAll =>
                                        <div
                                            key={userRefAll._id}
                                            className="userAllRefItems"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3>Name: {userRefAll.UserName} </h3>
                                                <h3>Email: {userRefAll.UserEmail}</h3>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <h3>UserId: {userRefAll.userId}</h3>
                                                <h3>User Number: {userRefAll.UserSubNumber}</h3>
                                            </div>
                                        </div>)
                                }

                            </div>

                        </div>
                    </div>
                    <button onClick={clseAlertButtonThree} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>

            </div>
            {/* ================================================================================= */}
            {/* Popup Options End */}
            {/* ================================================================================= */}
            {/* ============================================= */}
            {/* User Update His Name or Last Name */}
            {/* ============================================= */}
            {/* Modal */}
            <dialog id="edit_user_Info" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg mb-4">Edit Your Name</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const firstName = e.target.firstName.value;
                        const lastName = e.target.lastName.value;
                        let allInfo = { firstName, lastName };
                        // console.log(allInfo)

                        fetch(`https://test.e-cash-id.com/UserUpdateHisInformation/${roles?._id}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(allInfo)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.modifiedCount > 0) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "You Information update success !!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    e.target.reset()
                                    refetch()
                                    document.getElementById('edit_user_Info').close();
                                }
                            })
                    }} className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="firstName"
                            defaultValue={roles?.name}
                            className="input input-bordered w-full bg-white"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={roles?.LastName}
                            className="input input-bordered w-full bg-white"
                            required
                        />
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success">Save</button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById('edit_user_Info').close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default Profile;