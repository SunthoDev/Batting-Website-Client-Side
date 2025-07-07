import { useState } from 'react';
import "./EveryTopDetails.css"
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Marquee from "react-fast-marquee";
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../Hook/useRole';
import { FaMoneyCheckAlt } from "react-icons/fa";

import A from '../../../assets/AllImage/A.png';
import C from '../../../assets/AllImage/C.png';
import P from '../../../assets/AllImage/P.png';
import R from '../../../assets/AllImage/R.png';


const EveryTopDetails = () => {

    let { user, loading, setSubscriptionPrice } = useContext(AuthContext);
    const [roles] = useRole()
    const userStatus = roles?.email && user?.email;
    let navigate = useNavigate();
    let location = useLocation();
    // console.log(roles);

    // ===================================================================
    //  // user Refer Work Start
    // ===================================================================
    //  Refer Poup_______________________________
    let [poupThree, setPoupThree] = useState(false)
    const clseAlertButtonThree = () => {
        setPoupThree(false)
    }
    // user REf data all find use tenStack query 
    const { data: userUserAllRef = [] } = useQuery({
        queryKey: ["UserAllRef"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/UserAllRef");
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
    // ===================================
    //  // user Refer Work End
    // ===================================




    return (
        <div className="EveryTopDetailsParent w-[100%]  pb-[120px]">

            {/* =============================== */}
            {/* Annoucement here  */}
            {/* =============================== */}
            <div className="bg-white py-2 shadow-lg border-y border-gray-300 mt-6 mx-4">
                <Marquee speed={60} gradient={false}>
                    <div className="flex items-center gap-10 text-black text-[16px] font-semibold tracking-wide">
                        <span className="flex items-center gap-2">
                            <span className="text-green-600 text-xl">💸</span>
                            <span className="text-gray-800">017******54</span> উত্তলন
                            <span className="text-red-600 font-bold">400৳</span>
                            <span className="text-gray-600">(নগদ)</span>
                        </span>

                        <span className="flex items-center gap-2">
                            <span className="text-green-600 text-xl">💸</span>
                            <span className="text-gray-800">019******71</span> উত্তলন
                            <span className="text-red-600 font-bold">2000৳</span>
                            <span className="text-gray-600">(নগদ)</span>
                        </span>

                        <span className="flex items-center gap-2">
                            <span className="text-green-600 text-xl">💸</span>
                            <span className="text-gray-800">018******99</span> উত্তলন
                            <span className="text-red-600 font-bold">5000৳</span>
                            <span className="text-gray-600">(নগদ)</span>
                        </span>
                    </div>
                </Marquee>
            </div>

            {/* =============================== */}
            {/* My Balance here  */}
            {/* =============================== */}
            {/* <div className="mt-[20px] bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-r-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 w-fit cursor-pointer">
                <h3 className="text-md font-bold tracking-wide">
                    💰 Balance: <span className="text-black">{roles?.userBalance}৳</span>
                </h3>
            </div> */}
            {/* =============================== */}
            {/* Recharge || Withdraw Card Here  */}
            {/* =============================== */}
            <h4 className="text-[16px] font-[600] text-black text-left mt-8 mx-4">Reminders</h4>
            <div className="flex flex-col md:flex-row justify-between gap-4 px-4 mt-2">
                {/* Recharge Card */}
                {/* ====================== */}
                <div className="flex flex-col justify-between w-full md:w-1/2 h-[110px] bg-gradient-to-br from-[#FFF3E2] to-[#FAE6C4] rounded-lg px-4 py-3"
                    onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/Recharge");
                        } else {
                            Swal.fire({
                                title: 'Please Login Your Account',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login", { state: { from: location } });
                                    toast("Login Page Success");
                                }
                            });
                        }
                    }}
                >
                    <h2 className="text-black text-xl font-semibold">RECHARGE</h2>
                    <div className="flex justify-between items-center mt-2">
                        <img
                            // src="https://app.macvz.com/static/app/static/a/orange_jt.png"
                            src={R}
                            alt="icon"
                            className="w-[30px] h-[30px]"
                        />
                        <img
                            src="https://app.macvz.com/static/app/static/a/orange_right.png"
                            alt="arrow"
                            className="w-[65px] h-[50px] rounded-br-lg"
                        />
                    </div>
                </div>

                {/* Withdraw Card */}
                {/* ====================== */}
                <div className="flex flex-col justify-between w-full md:w-1/2 h-[110px] bg-gradient-to-br from-[#D0F8D0] to-[#92F093] rounded-lg px-4 py-3"
                    onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/Withdraw");
                        } else {
                            Swal.fire({
                                title: 'Please Login Your Account',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login", { state: { from: location } });
                                    toast("Login Page Success");
                                }
                            });
                        }
                    }}
                >
                    <h2 className="text-black text-xl font-semibold">WITHDRAW</h2>
                    <div className="flex justify-between items-center mt-2">
                        <img
                            // src="https://app.macvz.com/static/app/static/a/orange_jt.png"
                            src={P}
                            alt="icon"
                            className="w-[30px] h-[30px]"
                        />
                        <img
                            src="https://app.macvz.com/static/app/static/a/blue_right.png"
                            alt="arrow"
                            className="w-[65px] h-[50px] rounded-br-lg"
                        />
                    </div>
                </div>
            </div>

            {/* =============================== */}
            {/* Small Banner Here  */}
            {/* =============================== */}
            <h4 className="text-[16px] font-[600] text-black text-left py-4  mx-4">Reminders</h4>
            <div className="px-4 ">
                <div className="w-full h-[120px] rounded-lg overflow-hidden shadow-md">
                    <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                        alt="Nature Reminder"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* =============================== */}
            {/* Our Services  */}
            {/* =============================== */}
            <h4 className="text-[16px] font-[600] text-black text-left py-4  mx-4">Services</h4>
            <div className="flex items-center justify-between gap-4 mx-4">
                {/* Invite User */}
                {/* ================================= */}
                <div className="w-full bg-white shadow-md rounded-xl py-5 flex flex-col items-center justify-center hover:scale-[1.02] transition"
                    onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/InventionUser");
                        } else {
                            Swal.fire({
                                title: 'Please Login Your Account',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login", { state: { from: location } });
                                    toast("Login Page Success");
                                }
                            });
                        }
                    }}
                >
                    <img
                        // src="https://app.macvz.com/static/app/static/a/service1.png"
                        src={A}
                        alt="MA Wallet"
                        className="w-[60px] h-[60px] object-contain mb-2"
                        draggable="false"
                    />
                    <span className="text-lg font-semibold text-black">Invite User</span>
                </div>

                {/* My Refer */}
                {/* ================================= */}
                <div className="w-full bg-white shadow-md rounded-xl py-5 flex flex-col items-center justify-center hover:scale-[1.02] transition"
                    onClick={() => {
                        if (user && roles?.email && user?.email) {
                            setPoupThree(true);
                        } else {
                            Swal.fire({
                                title: 'Please Login Your Account',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login", { state: { from: location } });
                                    toast("Login Page Success");
                                }
                            });
                        }
                    }}
                >
                    <img
                        // src="https://app.macvz.com/static/app/static/a/service1.png"
                        src={C}
                        alt="CHECK IN"
                        className="w-[60px] h-[60px] object-contain mb-2"
                        draggable="false"
                    />
                    <span className="text-lg font-semibold text-black">My Refer</span>
                </div>

                {/* ABOUT */}
                {/* ================================= */}
                <div className="w-full bg-white shadow-md rounded-xl py-5 flex flex-col items-center justify-center hover:scale-[1.02] transition"
                    onClick={() => {
                        navigate("/AllSubscription")
                    }}
                >
                    <img
                        src="https://app.macvz.com/static/app/static/a/service1.png"
                        alt="ABOUT"
                        className="w-[60px] h-[60px] object-contain mb-2"
                        draggable="false"
                    />
                    <span className="text-lg font-semibold text-black">Buy Plan</span>
                </div>
            </div>

            {/* =============================== */}
            {/* MYGIFT | JOIN | CASHBACK */}
            {/* =============================== */}
            <div className="flex flex-col md:flex-row gap-4 px-4 mt-6">
                {/* MYGIFT */}
                {/* ========================= */}
                <div className="flex-1">
                    <div onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/MyGift");
                        } else {
                            Swal.fire({
                                title: 'Please Login Your Account',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login", { state: { from: location } });
                                    toast("Login Page Success");
                                }
                            });
                        }
                    }}>
                        <img
                            src="https://static.besstmam.com/image/MYGIFT.png"
                            alt="My Gift"
                            className="w-full h-[254px] object-cover rounded-xl"
                            draggable="false"
                        />
                    </div>
                </div>

                {/* JOIN */}
                <div className="flex-1"
                    onClick={() => {
                        if (user && roles?.email && user?.email) {
                            navigate("/Spinner");
                        } else {
                            Swal.fire({
                                title: 'Please Login Your Account',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Login Now'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login", { state: { from: location } });
                                    toast("Login Page Success");
                                }
                            });
                        }
                    }}
                >
                    <img
                        src="https://static.besstmam.com/image/JOIN.png"
                        alt="Join"
                        className="w-full h-[254px] object-cover rounded-xl"
                        draggable="false"
                    />
                </div>

                {/* CASHBACK */}
                <div className="flex-1">
                    <img
                        src="https://static.besstmam.com/image/CASHBACK.png"
                        alt="Cashback"
                        className="w-full h-[254px] object-cover rounded-xl"
                        draggable="false"
                    />
                </div>
            </div>

            {/* ============================================= */}
            {/* Refer alert*/}
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

        </div>
    );
};

export default EveryTopDetails;