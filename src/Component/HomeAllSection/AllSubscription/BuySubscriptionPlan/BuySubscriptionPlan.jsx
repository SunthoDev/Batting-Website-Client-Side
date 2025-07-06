import React, { useContext, useEffect } from 'react';
import "./BuySubscriptionPlan.css"
import banner from "../../../../assets/AllImage/CCoin.png"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import one from "../../../../assets/SbImage/one.jpeg"
import two from "../../../../assets/SbImage/two.jpeg"
import three from "../../../../assets/SbImage/three.jpeg"
import four from "../../../../assets/SbImage/four.jpeg"
import five from "../../../../assets/SbImage/five.jpeg"

const BuySubscriptionPlan = () => {

    let { user, subscriptionPrice } = useContext(AuthContext)
    const [roles] = useRole()
    let navigate = useNavigate()

    // ==============================
    // if the array value will be empty ter redirect another page 
    // ==============================
    useEffect(() => {
        if (subscriptionPrice && subscriptionPrice.length === 0) {
            navigate("/")
        }

    }, [subscriptionPrice, navigate])

    // ========================================================
    // Now Confirm Buy Our Product
    // ========================================================

    // ==================================================
    // decided image on value
    // ==================================================
    let ImgSub = subscriptionPrice[1]

    let useImgSub = ImgSub === 1 ? one : ImgSub === 2 ? two : ImgSub === 3 ? three : ImgSub === 4 ? four : five

    // ==================================================
    // make a value defend price
    // ==================================================

    let SubPrice = subscriptionPrice[0]
    let SubscriptionDay = 365
    let VIPReferUse = SubPrice > 900 ? "yes" : "no"
    // console.log(VIPReferUse)

    let SubDayBonus = SubPrice === 400 ? 40 : SubPrice === 1000 ? 100 : SubPrice === 2000 ? 200 : SubPrice === 3000 ? 300 : SubPrice === 5000 ? 500 : SubPrice === 10000 ? 1000 : SubPrice === 20000 ? 2000 : ""

    let UseRefBonusUser = SubPrice === 400 ? 72 : SubPrice === 1000 ? 180 : SubPrice === 2000 ? 360 : SubPrice === 3000 ? 540 : SubPrice === 5000 ? 900 : SubPrice === 10000 ? 1800 : SubPrice === 20000 ? 3600 : ""

    let TotalProfite = SubPrice === 400 ? 14600 : SubPrice === 1000 ? 36500 : SubPrice === 2000 ? 73000 : SubPrice === 3000 ? 109500 : SubPrice === 5000 ? 182500 : SubPrice === 10000 ? 365000 : SubPrice === 20000 ? 730000 : ""

    let SubscriptionId = Math.round(Math.random() * 99999999).toString()



    let HandleBuySubscription = () => {

        // =============================================
        // Before Check User Money
        // =============================================

        if (roles?.userBalance < SubPrice) {
            Swal.fire({
                title: 'Please Your are Recharge Money',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Recharge Now'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate("/Recharge")
                        toast("Recharge Page Success")
                    }
                })

            return;
        }
        // =============================================
        // Subscription Buy
        // =============================================

        Swal.fire({
            title: 'Are you sure buy a subscription',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure Buy'
        })
            .then((result) => {
                if (result.isConfirmed) {

                    // ================================================
                    // Database Data Sent Work Start
                    // ================================================

                    let allInfo = { SubPrice, SubscriptionDay, SubDayBonus, UseRefBonusUser, TotalProfite, useRefCode: roles?.UseRefCode, userId: roles?.userId, UserName: roles?.name, UserEmail: roles?.email, status: "pending", SubscriptionId, hours: 24 }

                    // console.log(allInfo)

                    fetch("http://localhost:5000/UserSubscriptionRequest", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(allInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            if (data.insertedId) {
                                if (roles?.UseRefCode !== "") {
                                    let allRefInfo = { UseRefBonusUser, userId: roles?.userId, UserName: roles?.name, UserEmail: roles?.email, status: "pending", ThatBuySubscriptionSameRefId: SubscriptionId, useRefCode: roles?.UseRefCode, VIPReferUse }
                                    fetch("http://localhost:5000/UserRefRequest", {
                                        method: "POST",
                                        headers: {
                                            "content-type": "application/json"
                                        },
                                        body: JSON.stringify(allRefInfo)
                                    })
                                        .then(res => res.json())
                                        .then(data => {

                                            if (data.insertedId) {
                                                Swal.fire({
                                                    position: "top-end",
                                                    icon: "success",
                                                    title: "Your Subscription & Refer request success",
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                navigate("/")
                                            }
                                        })
                                }
                            } else {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your are already post Subscription request",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                navigate("/")
                            }
                        })
                    // ================================================
                    // Database Data Sent Work End
                    // ================================================
                }
            })
    }


    // <ToastContainer />

    return (
        <div className="bg-white min-h-screen text-white pb-[40px]">
            <ToastContainer />

            <div className="SubscriptionBuyParent w-full md:w-[480px] mx-auto py-16 px-4">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                    <img
                        className="w-full h-full object-cover"
                        src={useImgSub}
                        alt="subscription"
                    />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-green-400">৳{TotalProfite}</h3>
                        <p className="text-sm mt-1">মোট লাভ</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-yellow-300">৳{SubPrice}</h3>
                        <p className="text-sm mt-1">ইউনিট মূল্য</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-pink-300">{SubscriptionDay}</h3>
                        <p className="text-sm mt-1">সীমা</p>
                    </div>
                </div>

                {/* Detail Box */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-green-400">
                        <span>প্রদান করতে হবে</span>
                        <span className="font-semibold text-green-300">৳{subscriptionPrice[0]}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-yellow-300">
                        <span>সাবস্ক্রিপশন মেয়াদ</span>
                        <span className="font-semibold text-yellow-200">{SubscriptionDay} দিন</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-400">
                        <span>প্রতিদিন বোনাস</span>
                        <span className="font-semibold text-blue-300">৳{SubDayBonus}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-pink-400">
                        <span>বর্তমান ব্যালেন্স</span>
                        <span className="font-semibold text-pink-300">৳{roles?.userBalance}</span>
                    </div>
                </div>

                {/* Buy Button */}
                <button
                    onClick={HandleBuySubscription}
                    className="w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg"
                >
                    ✨ এখন কিনুন
                </button>
            </div>
        </div>
    );
};

export default BuySubscriptionPlan;