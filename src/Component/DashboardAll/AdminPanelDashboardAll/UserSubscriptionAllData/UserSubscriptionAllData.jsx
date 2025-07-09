import React from 'react';
import "./UserSubscriptionAllData.css"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import UserSubscriptionSeeAllData from './UserSubscriptionSeeAllData/UserSubscriptionSeeAllData';
import { useEffect } from 'react';

const UserSubscriptionAllData = () => {

    // user All Subscription Data Find here
    // ==================================================
    const { data: UserSubscriptionDataAll = [], refetch } = useQuery({
        queryKey: ["UserSubscriptionDataAll"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserSubscriptionDataAll");
            return res.json();
        },
    });

    // ====================================================================
    // Input value get
    // ====================================================================
    let [UserIdValue, setUserIdValue] = useState("")
    const handleSearchUserId = (event) => {
        event.preventDefault()
        let categoryValue = event.target.email.value
        setUserIdValue(categoryValue)
    }

    // ======================================
    // Find Email Value End
    // ======================================
    let UserIdValueShow = UserSubscriptionDataAll.filter(VerifiedUserId => VerifiedUserId.userId === UserIdValue)
    //  console.log(UserIdValueShow)

    // ============================================
    // Admin (Approved) User Subscription Start
    // ============================================
    let HandleApproved = (id, ReferId, SubscriptionId, UseRefBonusUser, SubPrice) => {
        let RefTotalBalance = { UseRefBonusUser: UseRefBonusUser }
        let SubTotalPrice = { SubscriptionPriceTotall: SubPrice }
        // Subscription Approved Here
        // ==================================
        fetch(`https://test.e-cash-id.com/AdminUpdateUserVerifiedStatus/${SubscriptionId}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                // Subscription Approved Here
                // ==================================
                if (data.modifiedCount > 0) {
                    // ===========================================================================
                    // If this user use ref code , then follow below .. otherwise follow else
                    // ===========================================================================
                    if (ReferId !== "0000") {
                        // User ref status approved ref
                        // ==============================
                        fetch(`https://test.e-cash-id.com/AdminApprovedUserRefStatus/${SubscriptionId}`, {
                            method: "PATCH",
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount > 0) {
                                    // User balance add use ref
                                    fetch(`https://test.e-cash-id.com/AdminUserBalancePluseForUserRef/${ReferId}`, {
                                        method: "PATCH",
                                        headers: {
                                            "content-type": "application/json"
                                        },
                                        body: JSON.stringify(RefTotalBalance)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            // console.log(data)
                                            if (data.modifiedCount > 0) {
                                                // User balance Decrase For Subscription Price 
                                                fetch(`https://test.e-cash-id.com/AdminUserBalanceDecraseSubscriptionCost/${id}`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "content-type": "application/json"
                                                    },
                                                    body: JSON.stringify(SubTotalPrice)
                                                })
                                                    .then(res => res.json())
                                                    .then(data => {

                                                        if (data.modifiedCount > 0) {
                                                            Swal.fire({
                                                                position: "top-end",
                                                                icon: "success",
                                                                title: "Your Subscription & Ref Approved & All Success",
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        }

                                                    })

                                            }
                                        })
                                }
                            })

                    } else {

                        // =======================================================
                        // without Refer buy subscription
                        // =======================================================
                        fetch(`https://test.e-cash-id.com/AdminUserBalanceDecraseSubscriptionCost/${id}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(SubTotalPrice)
                        })
                            .then(res => res.json())
                            .then(data => {

                                if (data.modifiedCount > 0) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your Subscription Approved Success",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }

                            })
                    }

                }
                refetch()
            })
    }

    // ============================================
    // Admin (Pending) User Subscription Start
    // ============================================
    let HandlePending = (id, ReferId, SubscriptionId, UseRefBonusUser, SubPrice) => {
        let allInfo = { UseRefBonusUser: UseRefBonusUser }
        let SubTotalPrice = { SubscriptionPriceTotall: SubPrice }

        // Subscription Approved Here
        // ==================================
        fetch(`https://test.e-cash-id.com/AdminUpdateUserPendingStatus/${SubscriptionId}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    // =======================================================
                    // Refer code work Start
                    // =======================================================

                    if (ReferId !== "0000") {
                        // User ref status Pending ref
                        fetch(`https://test.e-cash-id.com/AdminPendingUserRefStatus/${SubscriptionId}`, {
                            method: "PATCH",
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount > 0) {
                                    // User balance decrase use ref
                                    fetch(`https://test.e-cash-id.com/AdminUserBalanceDecraseForUserRef/${ReferId}`, {
                                        method: "PATCH",
                                        headers: {
                                            "content-type": "application/json"
                                        },
                                        body: JSON.stringify(allInfo)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.modifiedCount > 0) {
                                                // User balance Add For Subscription Price 
                                                fetch(`https://test.e-cash-id.com/AdminUserBalanceBackSubscriptionCost/${id}`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "content-type": "application/json"
                                                    },
                                                    body: JSON.stringify(SubTotalPrice)
                                                })
                                                    .then(res => res.json())
                                                    .then(data => {

                                                        if (data.modifiedCount > 0) {
                                                            Swal.fire({
                                                                position: "top-end",
                                                                icon: "success",
                                                                title: "Your Subscription & Ref pending & user balance decrase  Success",
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        }

                                                    })

                                            }
                                        })
                                }
                            })

                    } else {
                        // =======================================================
                        // without buy subscription buy
                        // =======================================================
                        fetch(`https://test.e-cash-id.com/AdminUserBalanceBackSubscriptionCost/${id}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(SubTotalPrice)
                        })
                            .then(res => res.json())
                            .then(data => {

                                if (data.modifiedCount > 0) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your Subscription pending is  Success",
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }

                            })
                    }
                }
                refetch()
            })
    }

    // ==============================================
    //Admin Delete User Subscription request
    // =============================================
    let HandleDelete = (id, ReferId, SubscriptionId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://test.e-cash-id.com/AdminDeleteUsersVerified/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {

                            if (ReferId !== "") {
                                fetch(`https://test.e-cash-id.com/AdminDeleteUsersRef/${SubscriptionId}`, {
                                    method: "DELETE",
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        if (data.deletedCount > 0) {
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Admin Delete REf & Subscription Success",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })

                                        }

                                    })
                            } else {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Admin Delete User Subscription Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }
                        // console.log(data)

                        refetch()
                    })
            }

        });
    }

    // ======================================
    // Admin Subscription Access Send Start
    // ======================================
    let HandleSendSubscriptionClimeAccess = () => {

        fetch(`https://test.e-cash-id.com/AdminSendClimeAccessUser`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Clime Access Send is Success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }

    // ========================================
    // Admin Subscription Access not Send Start
    // ========================================
    let HandleNotSendSubscriptionClimeAccess = () => {
        fetch(`https://test.e-cash-id.com/AdminNotSendClimeAccessUser`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Clime Access not Send is Success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })
    }



    return (
        <div className='UserPaymentALl bg-white '>

            <div className='userPayment bg-[#F6F6F6] rounded-[7px] mx-0 md:mx-6 my-8 px-4 py-8'>
                {/* ======================================= */}

                <div className='ProductFilterOption mb-[34px]'>
                    <h3>Search your Subscription Data & use User Id. Total Subscription {UserSubscriptionDataAll?.length}</h3>
                    <form onSubmit={handleSearchUserId}>
                        <div className='ProductSearch  md:w-[34%] w-[100%] flex items-center'>
                            <input type="text" name="email" placeholder="Search User Id" />
                            <button type="submit" className="fa fa-search" aria-hidden="true"></button>
                        </div>
                    </form>
                </div>

                {/* ======================================= */}

                <div className="md:flex items-center justify-between mb-4">
                    <button onClick={HandleSendSubscriptionClimeAccess} className="ClimeAccessSend">Clime Access Send 0</button>
                    <button onClick={HandleNotSendSubscriptionClimeAccess} className="ClimeAccessSend">Clime Not Access Send 24</button>
                </div>

                {/* ======================================= */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-[14px] font-[600] text-white">MY ID</th>
                                <th className="text-[14px] font-[600] text-white">USER NAME</th>
                                <th className="text-[14px] font-[600] text-white">USER EMAIL & HOURS</th>
                                <th className="text-[14px] font-[600] text-white">SUBSCRIPTION PRICE</th>
                                <th className="text-[14px] font-[600] text-white">SUBSCRIPTION DAY</th>
                                <th className="text-[14px] font-[600] text-white">STATUS</th>
                                <th className="text-[14px] font-[600] text-white">SEND ACCESS</th>
                            </tr>
                        </thead>
                        <tbody>

                            {UserIdValueShow.length > 0 ?

                                UserIdValueShow?.slice().reverse().map(allOrder => <UserSubscriptionSeeAllData key={allOrder._id} allOrder={allOrder} HandleApproved={HandleApproved} HandlePending={HandlePending} HandleDelete={HandleDelete} />
                                )
                                :
                                UserSubscriptionDataAll?.slice().reverse().map(allOrder => <UserSubscriptionSeeAllData key={allOrder._id} allOrder={allOrder} HandleApproved={HandleApproved} HandlePending={HandlePending} HandleDelete={HandleDelete} />
                                )
                            }

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default UserSubscriptionAllData;