import React, { useContext, useEffect } from 'react';
import "./BuySubscriptionPlan.css"
import banner from "../../../../assets/AllImage/CCoin.png"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const BuySubscriptionPlan = () => {

    const [roles] = useRole()
    let navigate = useNavigate()
    let { user } = useContext(AuthContext)
    let SubscriptionData = useLoaderData()
    // console.log(SubscriptionData)

    // user All (by) Subscription Data Find here
    // ==================================================
    const { data: UserBySubscriptionDataAll = [], refetch } = useQuery({
        queryKey: ["UserSubscriptionDataAll"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserSubscriptionDataAll");
            return res.json();
        },
    });
    // console.log(SubscriptionData)
    // ==========================================================================================================
    // Find user any pending Subscription request || So that he can not ber sent rather Subscription by request
    // ==========================================================================================================
    let userPendingWithdrawRequest = UserBySubscriptionDataAll?.find(SubscriptionPendingData => SubscriptionPendingData?.UserEmail === roles?.email && SubscriptionPendingData?.status === "pending")





    // ===========================================================================================================
    // All Refer Bonus Percentage gave admin
    // =======================================
    const { data: AllReferBonusPercent = [] } = useQuery({
        queryKey: ["GetReferBonusPercent"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/GetReferBonusPercent");
            return res.json();
        },
    });
    // console.log(AllPopUpDataOfWebsite)
    let ReferPercentageData = AllReferBonusPercent[0]
    let AdminGaveRefBonus = parseInt(ReferPercentageData?.ReferBonusPercent)





    // ====================================================
    // Buy A Subscription Plan Request Send To Database
    // ====================================================
    let HandleBuySubscription = () => {
        // =============================================
        // Before Check User Money
        // =============================================
        if (roles?.userBalance < SubscriptionData?.SubscriptionPrice) {
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

                    // Clime Access Here !!
                    // ===================================
                    let ClimeHours = (() => {
                        const now = new Date();
                        const hours = now.getHours();

                        if (hours >= 0 && hours < 10) {
                            // রাত ১২ টা থেকে সকাল ১০টার আগে
                            return 24;
                        } else {
                            // সকাল ১০টা থেকে রাত ১২টা পর্যন্ত
                            return 0;
                        }
                    })();

                    let SubscriptionId = Math.round(Math.random() * 99999999).toString()
                    // ================================================
                    // Database Data Sent Work Start
                    // ================================================

                    let allInfo = {
                        date: moment().format("DD/MM/YYYY"), time: moment().format("hh:mm A"),
                        SubPrice: SubscriptionData?.SubscriptionPrice,
                        SubscriptionDay: SubscriptionData?.SubscriptionDate,
                        SubDayBonus: SubscriptionData?.DailyProfit,
                        TotalProfite: SubscriptionData?.TotalProfit,
                        UseRefBonusUser: SubscriptionData?.SubscriptionPrice * AdminGaveRefBonus / 100,

                        useRefCode: roles?.UseRefCode, userId: roles?.userId, UserName: roles?.name, UserEmail: roles?.email, status: "pending", SubscriptionId, hours: ClimeHours
                    }
                    // console.log(allInfo)

                    // Send User Subscription Request Here
                    fetch("https://test.e-cash-id.com/UserSubscriptionRequest", {
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
                                    let allRefInfo = {
                                        date: moment().format("DD/MM/YYYY"), time: moment().format("hh:mm A"),
                                        UseRefBonusUser: SubscriptionData?.SubscriptionPrice * AdminGaveRefBonus / 100,
                                        userId: roles?.userId, UserName: roles?.name, UserEmail: roles?.email, status: "pending", ThatBuySubscriptionSameRefId: SubscriptionId, useRefCode: roles?.UseRefCode
                                    }
                                    fetch("https://test.e-cash-id.com/UserRefRequest", {
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


    return (
        <div className="bg-white min-h-screen text-white pb-[40px]">
            <ToastContainer />

            <div className="SubscriptionBuyParent w-full md:w-[480px] mx-auto py-16 px-4">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                    <img
                        className="w-full h-full object-cover"
                        src={SubscriptionData?.image}
                        alt="subscription"
                    />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-green-400">৳{SubscriptionData?.TotalProfit}</h3>
                        <p className="text-sm mt-1">Total Profit</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-yellow-300">৳{SubscriptionData?.SubscriptionPrice}</h3>
                        <p className="text-sm mt-1">Subscription Price</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-pink-300">{SubscriptionData?.SubscriptionDate}</h3>
                        <p className="text-sm mt-1">Duration</p>
                    </div>
                </div>

                {/* Detail Box */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-green-400">
                        <span>You havo to pay!!</span>
                        <span className="font-semibold text-green-300">৳{SubscriptionData?.SubscriptionPrice}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-yellow-300">
                        <span>Subscription Duration</span>
                        <span className="font-semibold text-yellow-200">{SubscriptionData?.SubscriptionDate} দিন</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-400">
                        <span>Daily Bonus</span>
                        <span className="font-semibold text-blue-300">৳{SubscriptionData?.DailyProfit}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-pink-400">
                        <span>Your Balance</span>
                        <span className="font-semibold text-pink-300">৳{roles?.userBalance}</span>
                    </div>
                </div>



                {/* Buy Button */}
                {
                    userPendingWithdrawRequest ?
                        <button
                            onClick={() => {
                                navigate("/Climed")
                            }}
                            className="w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg"
                        >
                            ✨You Already have one pending subscription ! wite for approved
                        </button>
                        :
                        <button
                            onClick={HandleBuySubscription}
                            className="w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg"
                        >
                            ✨ Buy Now
                        </button>

                }

            </div>
        </div>
    );
};

export default BuySubscriptionPlan;