import React, { useContext } from 'react';
import './DailyAllReport.css'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';

const DailyAllReport = () => {

    let { setDate } = useContext(AuthContext)
    let navigate = useNavigate()

    const getTodayFormatted = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");;
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        const yy = String(today.getFullYear()); // last 2 digits
        return `${dd}/${mm}/${yy}`; // output: 01/07/25
    };
    const todayDate = getTodayFormatted();
    // console.log(todayDate)


    // =============================================================================================================



    // =============================================================================================================
    // All User Data Get To Database
    // ===========================================
    const { data: adminAllUsers = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminSeeAllReportOfThisWebsite/users");
            return res.json();
        },
    });
    // console.log(adminAllUsers)

    // =================================================
    // (TODAY) All Data Find
    // =================================================
    const todayAllUserData = adminAllUsers?.filter(user => user.date === todayDate);
    // console.log(todayParcelData)

    // All Admin
    // ===========================================
    let TotalAdmin = todayAllUserData?.filter(user => user?.role === "admin")
    // All User
    // ===========================================
    let TotalUser = todayAllUserData?.filter(user => user?.role === "user")


    // =============================================================================================================
    // All Recharge Data Get To Database
    // ===========================================
    const { data: AllRecharge = [] } = useQuery({
        queryKey: ["AllRechargeData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminSeeAllReportOfThisWebsite/AllRechargeData");
            return res.json();
        },
    });
    // console.log(AllRecharge)

    // =================================================
    // (TODAY) All Data Find
    // =================================================
    const todayAllRecharge = AllRecharge?.filter(Recharge => Recharge.date === todayDate);
    // console.log(todayParcelData)


    // All Approved
    // ===========================================
    let TotalApprovedRecharge = todayAllRecharge?.filter(Recharge => Recharge?.status === "approved")
    // All Pending
    // ===========================================
    let TotalPendingRecharge = todayAllRecharge?.filter(Recharge => Recharge?.status === "pending")

    // All Approved Amount
    // ===========================================
    let TotalApprovedRechargeAmount = TotalApprovedRecharge?.reduce((current, Recharge) => current + parseInt(Recharge?.TotalAmount), 0);
    // All Pending Amount
    // ===========================================
    let TotalPendingRechargeAmount = TotalPendingRecharge?.reduce((current, Recharge) => current + parseInt(Recharge?.TotalAmount), 0);


    // =============================================================================================================
    // All Subscription Data Get To Database
    // ===========================================
    const { data: AllSubscription = [] } = useQuery({
        queryKey: ["UserSubscriptionDataAll"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminSeeAllReportOfThisWebsite/UserSubscriptionDataAll");
            return res.json();
        },
    });
    // console.log(AllSubscription)

    // =================================================
    // (TODAY) All Data Find
    // =================================================
    const todayAllSubscription = AllSubscription?.filter(Sub => Sub.date === todayDate);
    // console.log(todayParcelData)

    // All Approved
    // ===========================================
    let TotalApprovedSubscription = todayAllSubscription?.filter(Subscription => Subscription?.status === "approved")
    // All Pending
    // ===========================================
    let TotalPendingSubscription = todayAllSubscription?.filter(Subscription => Subscription?.status === "pending")

    // All Approved Amount
    // ===========================================
    let TotalApprovedSubscriptionAmount = TotalApprovedSubscription?.reduce((current, Subscription) => current + parseInt(Subscription?.SubPrice), 0);
    // All Pending Amount
    // ===========================================
    let TotalPendingSubscriptionAmount = TotalPendingSubscription?.reduce((current, Subscription) => current + parseInt(Subscription?.SubPrice), 0);


    // =============================================================================================================
    // All Withdraw Data Get To Database
    // ===========================================
    const { data: AllWithdraw = [] } = useQuery({
        queryKey: ["UserAllWithdrawData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminSeeAllReportOfThisWebsite/UserAllWithdrawData");
            return res.json();
        },
    });
    // console.log(AllWithdraw)

    // =================================================
    // (TODAY) All Data Find
    // =================================================
    const todayAllWithdraw = AllWithdraw?.filter(Withdraw => Withdraw.date === todayDate);
    // console.log(todayParcelData)

    // All Approved
    // ===========================================
    let TotalApprovedWithdraw = todayAllWithdraw?.filter(Withdraw => Withdraw?.status === "approved")
    // All Pending
    // ===========================================
    let TotalPendingWithdraw = todayAllWithdraw?.filter(Withdraw => Withdraw?.status === "pending")

    // All Approved Amount
    // ===========================================
    let TotalApprovedWithdrawAmount = TotalApprovedWithdraw?.reduce((current, Withdraw) => current + parseInt(Withdraw?.RequestBalance), 0);
    // All Pending Amount
    // ===========================================
    let TotalPendingWithdrawAmount = TotalPendingWithdraw?.reduce((current, Withdraw) => current + parseInt(Withdraw?.RequestBalance), 0);


    // =============================================================================================================
    // All Bonus Coupon Data Get To Database
    // ===========================================
    const { data: AllCouponBonus = [] } = useQuery({
        queryKey: ["AllCouponCode"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminSeeAllReportOfThisWebsite/AllCouponCode");
            return res.json();
        },
    });
    // console.log(AllCouponBonus)

    // =================================================
    // (TODAY) All Data Find
    // =================================================
    const todayAllCouponBonus = AllCouponBonus?.filter(Coupon => Coupon.date === todayDate);
    // console.log(todayParcelData)

    // All UnUsed
    // ===========================================
    let TotalUnUsedCouponBonus = todayAllCouponBonus?.filter(Coupon => Coupon?.status === "unUsed")
    // All Used
    // ===========================================
    let TotalUsedCouponBonus = todayAllCouponBonus?.filter(Coupon => Coupon?.status === "Used")

    // All unUsed Amount
    // ===========================================
    let TotalUnUsedWithdrawAmount = TotalUnUsedCouponBonus?.reduce((current, Coupon) => current + parseInt(Coupon?.AmountBunas), 0);
    // All Used Amount
    // ===========================================
    let TotalUsedWithdrawAmount = TotalUsedCouponBonus?.reduce((current, Coupon) => current + parseInt(Coupon?.AmountBunas), 0);



    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
            <div className="bg-white shadow-xl rounded-2xl p-8">

                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
                        📊 Daily All Report Of This Website
                    </h1>

                    <div className="flex items-center gap-2">
                        <form onSubmit={(e) => {
                            e.preventDefault()

                            let date = e.target.date.value; // "2025-07-10"
                            const split = date.split('-'); // ["2025", "07", "10"]
                            const formattedDate = `${split[2]}/${split[1]}/${split[0]}`; // "10/07/2025"
                            setDate(formattedDate)
                            navigate(`/dashboardPlant/SearchReport`)

                        }}>
                            <input
                                type="date"
                                id="reportDate"
                                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                name="date"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>


                {/* ==== Users Section ==== */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">👥 Users</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Total Admin</h3>
                            <p className="text-3xl font-bold">{TotalAdmin?.length}</p>
                        </div>
                        <div className="bg-green-100 text-green-800 border border-green-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Total Admin</h3>
                            <p className="text-3xl font-bold">{TotalUser?.length}</p>
                        </div>
                    </div>
                </div>

                {/* ==== Recharge Section ==== */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">💰 Recharge</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Approved Recharge: {TotalApprovedRecharge?.length}</h3>
                            <p className="text-[20px] font-bold">Total Recharge: {TotalApprovedRechargeAmount} Tk</p>
                        </div>
                        <div className="bg-green-100 text-green-800 border border-green-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Pending Recharge: {TotalPendingRecharge?.length}</h3>
                            <p className="text-[20px] font-bold">Total Recharge: {TotalPendingRechargeAmount} Tk</p>
                        </div>
                    </div>
                </div>

                {/* ==== Subscription Section ==== */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">📦 Subscription</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Approved Subscription: {TotalApprovedSubscription?.length}</h3>
                            <p className="text-[20px] font-bold">Total Price: {TotalApprovedSubscriptionAmount} Tk</p>
                        </div>
                        <div className="bg-green-100 text-green-800 border border-green-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Pending Subscription: {TotalPendingSubscription?.length}</h3>
                            <p className="text-[20px] font-bold">Total Price: {TotalPendingSubscriptionAmount} Tk</p>
                        </div>
                    </div>
                </div>

                {/* ==== Withdraw Section ==== */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">💸 Withdraw</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Approved Withdraw: {TotalApprovedWithdraw?.length}</h3>
                            <p className="text-[20px] font-bold">Total Amount: {TotalApprovedWithdrawAmount} Tk</p>
                        </div>
                        <div className="bg-green-100 text-green-800 border border-green-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Pending Withdraw: {TotalPendingWithdraw?.length}</h3>
                            <p className="text-[20px] font-bold">Total Amount: {TotalPendingWithdrawAmount} Tk</p>
                        </div>
                    </div>
                </div>

                {/* ==== Coupon Bonus Section ==== */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">🎁 Coupon Bonus</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-purple-100 text-purple-800 border border-purple-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Unused Coupon: {TotalUnUsedCouponBonus?.length}</h3>
                            <p className="text-[20px] font-bold">Total Amount: {TotalUnUsedWithdrawAmount} Tk</p>
                        </div>
                        <div className="bg-red-100 text-red-800 border border-red-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">Used Coupon: {TotalUsedCouponBonus?.length}</h3>
                            <p className="text-[20px] font-bold">Total Amount: {TotalUsedWithdrawAmount} Tk</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DailyAllReport;