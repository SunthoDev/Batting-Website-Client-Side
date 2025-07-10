import React from 'react';
import "./AllReport .css"
import { useQuery } from '@tanstack/react-query';

const AllReport = () => {


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
    // All Admin
    // ===========================================
    let TotalAdmin = adminAllUsers?.filter(user => user?.role === "admin")
    // All User
    // ===========================================
    let TotalUser = adminAllUsers?.filter(user => user?.role === "user")


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
    // All Approved
    // ===========================================
    let TotalApprovedRecharge = AllRecharge?.filter(Recharge => Recharge?.status === "approved")
    // All Pending
    // ===========================================
    let TotalPendingRecharge = AllRecharge?.filter(Recharge => Recharge?.status === "pending")

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
    // All Approved
    // ===========================================
    let TotalApprovedSubscription = AllSubscription?.filter(Subscription => Subscription?.status === "approved")
    // All Pending
    // ===========================================
    let TotalPendingSubscription = AllSubscription?.filter(Subscription => Subscription?.status === "pending")

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
    // All Approved
    // ===========================================
    let TotalApprovedWithdraw = AllWithdraw?.filter(Withdraw => Withdraw?.status === "approved")
    // All Pending
    // ===========================================
    let TotalPendingWithdraw = AllWithdraw?.filter(Withdraw => Withdraw?.status === "pending")

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
    // All UnUsed
    // ===========================================
    let TotalUnUsedCouponBonus = AllCouponBonus?.filter(Coupon => Coupon?.status === "unUsed")
    // All Used
    // ===========================================
    let TotalUsedCouponBonus = AllCouponBonus?.filter(Coupon => Coupon?.status === "Used")

    // All unUsed Amount
    // ===========================================
    let TotalUnUsedWithdrawAmount = TotalUnUsedCouponBonus?.reduce((current, Coupon) => current + parseInt(Coupon?.AmountBunas), 0);
    // All Used Amount
    // ===========================================
    let TotalUsedWithdrawAmount = TotalUsedCouponBonus?.reduce((current, Coupon) => current + parseInt(Coupon?.AmountBunas), 0);


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
            <div className="bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 border-b pb-4">
                    📊 All Report Of This Website
                </h1>

                {/* ==== Users Section ==== */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">👥 Users</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-100 text-blue-800 border border-blue-300 rounded-xl p-6 shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium mb-2">All Users</h3>
                            <p className="text-3xl font-bold">{adminAllUsers?.length}</p>
                        </div>
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

export default AllReport;