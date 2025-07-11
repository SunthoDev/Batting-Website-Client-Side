import React from 'react';
import "./MyGift.css"
import { useNavigate } from 'react-router-dom';
import useRole from '../../../Hook/useRole';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import { useContext } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyGift = () => {

    const { user } = useContext(AuthContext)
    const [roles] = useRole()
    let navigate = useNavigate()
    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, status, userBalance, userId, _id } = roles

    // =======================================================
    // All Coupon Code Data Get Here !
    // =======================================================
    const [couponMessage, setCouponMessage] = useState("");

    const { data: AllCouponCode = [] } = useQuery({
        queryKey: ["AdminDashboardAllWorkHere-AllCouponCode"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminDashboardAllWorkHere/AllCouponCode");
            return res.json();
        },
    });

    // Use Coupon Code Here !!
    // =====================================
    let HandleUseCouponCode = (e) => {
        e.preventDefault()
        setCouponMessage("")
        let MyCoupon = e.target.Coupon.value

        // check this coupon code status
        // --------------------------------
        let CheckCouponHere = AllCouponCode?.find(Coupon => Coupon?.CouponCode === MyCoupon)
        let CouponBonus = { BonusOfCoupon: CheckCouponHere?.AmountBunas }

        // ✅ If user Coupon data is not found
        // =================================================
        if (!CheckCouponHere) {
            setCouponMessage("❌ Your coupon code is invalid.");
            return;
        }
        // ⚠️ If user provided coupon data is used
        // =================================================
        if (CheckCouponHere?.status === "Used") {
            setCouponMessage("⚠️ Your coupon code is already used.");
            return;
        }

        // ⚠️ If user provided coupon data is (U=unUsed) them ot will be work
        // =======================================================================
        if (CheckCouponHere?.status === "unUsed") {

            // User provided coupon code status change for use !!
            // ===================================================
            fetch(`https://test.e-cash-id.com/AdminDashboardAllWorkHere/UpdateCouponStatusToUsed/${CheckCouponHere?._id}`, {
                method: "PATCH",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {

                        // User Balance will be add for use coupon bonus
                        // ===================================================
                        fetch(`https://test.e-cash-id.com/AdminDashboardAllWorkHere/UserBalanceAddBonusForUseACouponRefer/${roles?.userId}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(CouponBonus)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data)
                                if (data.modifiedCount > 0) {
                                    setCouponMessage("✅ Coupon applied successfully!");
                                    Swal.fire({
                                        title: "🎁 Bonus Gift পেয়েছো!",
                                        html: `<h2 class="text-green-600 text-3xl font-bold mb-2">৳ ${CheckCouponHere?.AmountBunas}</h2>
                                         <p class="text-gray-700">তোমার অ্যাকাউন্টে বোনাস যুক্ত হয়েছে!</p>`,
                                        icon: "success",
                                        confirmButtonText: "ধন্যবাদ ❤️",
                                        confirmButtonColor: "#22c55e",
                                    });
                                    e.target.reset()
                                    refetch()
                                }

                            })
                    }
                })
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    To receive your gift bonus, please provide your coupon code.
                </h2>
                <form onSubmit={HandleUseCouponCode} className="flex flex-col gap-4">
                    <input
                        type="number"
                        name="Coupon"
                        placeholder="Enter your coupon code"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
                {/* Ui React Message Show here */}
                {/* =========================================== */}
                {couponMessage && (
                    <div className="mt-4 p-3 rounded-md text-center font-medium text-white bg-blue-600">
                        {couponMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyGift;