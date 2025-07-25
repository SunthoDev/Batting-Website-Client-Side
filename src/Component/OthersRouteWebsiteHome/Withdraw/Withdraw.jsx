import React, { useContext } from 'react';
import "./Withdraw.css"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';

const Withdraw = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let navigate = useNavigate()
    let [btnDisable, setBtnDisable] = useState(false)
    let [error, setError] = useState("")


    // User Post withdraw request
    // ===========================================
    let handleWithdrawRequestSend = (event) => {
        event.preventDefault()
        setBtnDisable(true)
        setError("")
        let PaymentNumber = event.target.PaymentReceivedNum.value
        let RequestBalance = parseFloat(event.target.WithdrawAmount.value);
        let afterCharge = Math.round(RequestBalance * 5 / 100);
        let TotalBalance = RequestBalance + afterCharge

        let WithdrawId = Math.round(Math.random() * 99999999).toString()
        let date = moment().format("DD/MM/YYYY")
        let time = moment().format("hh:mm A")

        // roles?.userBalance < 200
        if (RequestBalance < 200) {
            setError("You cant nit withdraw minumum 200")
            return;
        }
        if (roles?.userBalance < TotalBalance) {
            setError(`There is not ৳${RequestBalance} any amount on your balance`)
            setBtnDisable(false)
            Swal.fire({
                icon: "warning",
                title: "❌ Insufficient Balance!",
                html: `
                    <p>🔸 <strong>Your Charge ${afterCharge} with total request:</strong> ৳${TotalBalance} Tk.</p>
                    <p>🔸 <strong>Your current balance:</strong> ৳${roles?.userBalance} Tk.</p>
                    <p class="mt-2 text-red-500 font-medium">⚠️ Please try with a lower amount.</p>
                    `,
                confirmButtonText: "Ok",
                confirmButtonColor: "#ef4444", // Tailwind red-500
            });
            return;
        }

        let allInfo = { PaymentNumber, paymentType: roles?.bankName, RequestBalance, afterCharge, TotalBalance, userId: roles?.userId, UserName: roles?.name, UserEmail: roles?.email, status: "pending", WithdrawId, date, time }
        // console.log(allInfo)

        fetch("https://test.e-cash-id.com/UserSendWithdrawRequest", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Payment Request is Success",
                        showConfirmButton: false,
                        timer: 1500
                    })

                    setBtnDisable(false)

                    navigate("/")
                }
            })
    }

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
    let userAllPaymentRequestData = userAllWithdrawData?.filter(userWithdraw => userWithdraw.UserEmail === roles?.email && userWithdraw.userId === roles?.userId)
    // console.log(userAllPaymentRequestData)

    // ==================================================================================================
    // Find user any pending withdraw request || So that he can not ber sent rather withdraw request
    // ==================================================================================================
    let userPendingWithdrawRequest = userAllWithdrawData?.find(userPendingData => userPendingData?.UserEmail === roles?.email && userPendingData?.status === "pending")





    return (
        <div className="min-h-screen py-24 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 md:px-0">
            <div className="w-full md:w-[40%] mx-auto bg-[#1b1b1b] rounded-2xl shadow-2xl p-8 border border-[#3ccc70]">

                <h2 className="text-3xl font-extrabold text-center text-[#3ccc70] mb-4 animate-pulse">Withdraw Your Balance</h2>

                <p className="text-center text-sm text-gray-300">
                    Your request will be processed within <span className="text-yellow-400 font-bold">1 hour</span>.
                </p>
                <p className="text-center text-xs mt-1 text-red-400">
                    Minimum ৳200 | 5% Withdrawal Fee applies
                </p>

                <form onSubmit={handleWithdrawRequestSend} className="space-y-6 mt-8">
                    <div className="relative w-full">
                        <input
                            required
                            name="PaymentReceivedNum"
                            value={roles?.accountNumber}
                            type="text"
                            placeholder="Enter recipient number (e.g. 01XXXXXXXXX)"
                            className="w-full p-3 rounded-md bg-[#2b2b2b] border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#3ccc70]"
                        />

                        {/* Delete Icon (Font Awesome 4.7) */}
                        <button
                            type="button"
                            className="absolute top-2.5 right-3 text-gray-400 hover:text-red-500 text-lg"
                            onClick={() => {
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

                                        fetch(`https://test.e-cash-id.com/UserBankAccountWillBeEmpty/${roles?._id}`, {
                                            method: "PATCH",
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                if (data.modifiedCount > 0) {
                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "success",
                                                        title: "Delete Bank Account success !!",
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    });
                                                    navigate("/AllBankCard")
                                                }
                                            })
                                    }
                                });
                            }}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>

                    <input
                        required
                        name="WithdrawAmount"
                        type="number"
                        min="200"
                        placeholder="Enter amount to withdraw"
                        className="w-full p-3 rounded-md bg-[#2b2b2b] border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#3ccc70]"
                    />

                    {roles?.userBalance < 200 && (
                        <p className="text-sm text-red-400 font-semibold">You must have at least ৳200 to withdraw.</p>
                    )}

                    {error && <p className="text-red-400 font-semibold">{error}</p>}

                    {
                        roles?.userBalance < 200 ? (
                            <button
                                disabled
                                className="w-full py-3 bg-gray-600 cursor-not-allowed rounded-md font-bold"
                            >
                                Insufficient Balance
                            </button>
                        ) : userPendingWithdrawRequest ? (
                            <button
                                disabled
                                className="w-full py-3 bg-yellow-500 text-black font-bold rounded-md"
                            >
                                You already have a pending request
                            </button>
                        ) : (
                            <button
                                disabled={btnDisable}
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#3CCC70] to-[#00ff9d] hover:from-[#00ff9d] hover:to-[#3CCC70] text-black font-extrabold rounded-md transition-all duration-300 shadow-lg hover:scale-105"
                            >
                                Submit Request
                            </button>
                        )
                    }
                </form>

                <div className="mt-10 border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-bold mb-2 text-[#3ccc70]">Total Withdrawals: {userAllPaymentRequestData?.length}</h3>
                </div>

                <div className="space-y-4 mt-4">
                    <h4 className="text-lg font-semibold mb-2 text-white">My Withdrawal History</h4>
                    {
                        userAllPaymentRequestData?.map(userPayAll => (
                            <div key={userPayAll._id} className="bg-gradient-to-r from-[#1f4037] to-[#99f2c8] p-4 rounded-xl text-black shadow-md hover:scale-[1.02] transition-all">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span>Name: {userPayAll.UserName}</span>
                                    <span>Status:
                                        <span className={`ml-1 font-bold ${userPayAll.status === "approved" ? "text-green-700" : "text-yellow-700"}`}>
                                            {userPayAll.status === "approved" ? "Success" : "Pending"}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Date: {userPayAll?.Date}</span>
                                    <span>৳ {userPayAll.RequestBalance}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Withdraw;