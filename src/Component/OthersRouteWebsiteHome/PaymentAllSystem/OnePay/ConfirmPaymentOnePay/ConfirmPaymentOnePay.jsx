import React from 'react';
import "./ConfirmPaymentOnePay.css"
import banner from "../../../../../assets/OnePay/banner.png"
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Bkash from "../../../../../assets/OnePay/bkash.png"

const ConfirmPaymentOnePay = () => {

    // =======================================================
    // Website All Payment Method Get. Which Is Add Admin
    // =======================================================
    const { data: BankInformationAll = [] } = useQuery({
        queryKey: ["AdminPaymentStatusData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminPaymentStatusData");
            return res.json();
        },
    });
    // console.log(BankInformationAll)



    const [TrxId, setTid] = useState("");

    const isValidTID = TrxId.length === 10;

    const handleChange = (e) => {
        // const value = e.target.value.replace(/\D/g, ""); // শুধুমাত্র সংখ্যা
        const value = e.target.value
        if (value.length <= 10) {
            setTid(value);
        }
    };

    return (
        <div className="ConfirmPaymentOnePayParent bg-white pb-[100px] md:pb-[120px]">

            <div className="BannerImage">
                <img className="w-full h-[180px] md:h-[220px]" src={banner} alt="banner" />
            </div>
            <div className="ConfirmPayment bg-white px-4">

                {/* ========================================== */}
                {/* Alert */}
                {/* ========================================== */}
                <div className="flex items-start gap-4 pt-[18px]">
                    <i className="fa fa-exclamation-triangle text-2xl mt-1 text-[#B05A6D]" aria-hidden="true"></i>
                    <div className="flex flex-col gap-2 pt-[4px]">
                        <p className="font-bold text-[14px] text-black">সতর্কতা</p>
                        <p className="text-[#b05a6d] text-[16px]">অনুগ্রহ করে একই ওয়ালেট দিয়ে অর্থপ্রদান করুন এবং ব্যর্থতা এড়াতে সঠিক TID পূরণ করুন</p>
                        <p className="text-[#b05a6d] text-[16px]">অনুগ্রহ করে নিচে দেওয়া অ্যাকাউন্ট নম্বরে অর্থপ্রদান করুন</p>
                    </div>
                </div>

                {/* ========================================== */}
                {/* Payment Details */}
                {/* ========================================== */}
                <div className="w-full bg-white border p-4 rounded-[10px] shadow-sm my-2">
                    <div className="flex flex-col items-center justify-center">
                        {/* Wallet Row */}
                        <div className="flex items-center mb-2 mx-auto">
                            <div className="w-[120px] text-right pr-5 text-sm font-semibold text-black">মানিব্যাগ:</div>
                            <div className="flex items-center gap-2 font-medium text-base">
                                <img src={Bkash} alt="logo" className="w-5 h-5" />
                                <span className="text-black">bkash</span>
                            </div>
                        </div>
                        {/* Account Row */}
                        <div className="flex items-center mb-2">
                            <div className="w-[120px] text-right pr-5 text-sm font-semibold text-black">হিসাব:</div>
                            <div className="flex items-center gap-2 text-base font-medium text-[#6D63B3] underline">
                                <span>01752953531</span>
                                <i class="fa fa-clone" aria-hidden="true"></i>
                            </div>
                        </div>
                        {/* Amount Row */}
                        <div className="flex items-center mb-2 mx-auto">
                            <div className="w-[120px] text-right pr-5 text-sm font-semibold text-black">পরিমাণ :</div>
                            <div className="flex items-center gap-2 text-base font-medium text-[#6D63B3] underline">
                                <span>300</span>
                                <i class="fa fa-clone" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================== */}
                {/* Submit Payment */}
                {/* ========================================== */}
                <div className="w-full mt-2">
                    {/* বার্তা */}
                    <p className="text-[#B05A6D] font-semibold text-sm pb-2">সঠিক TID পূরণ করুন</p>

                    {/* ইনপুট */}
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                        <input
                            type="text"
                            value={TrxId}
                            onChange={handleChange}
                            placeholder="10-সংখ্যার লেনদেন আইড"
                            className="w-full text-sm outline-none bg-white"
                        />
                    </div>

                    {/* সাবমিট বাটন */}
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => document.getElementById('OnePay_confirm_Payment').showModal()}
                            disabled={TrxId.length !== 10}
                            className={`w-full md:w-[24%] mt-4 py-4 rounded-full text-white font-semibold text-[18px] transition
                                ${isValidTID ? 'bg-[#313381] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}
                            `} >
                            নিশ্চিত করুন
                        </button>

                        {/* নোটিশ: ভুল বা কম */}
                        {!isValidTID && TrxId.length > 0 && (
                            <p className="text-red-500 text-xs text-left">ডিপোজিট সম্পূর্ণ করতে অনুগ্রহ করে সম্পূর্ণ ১০ সংখ্যার TID লিখুন।</p>
                        )}
                    </div>
                </div>


            </div>
            {/* ============================================ */}
            {/* Payment Confirm Ask Modal Start */}
            {/* ============================================ */}
            <dialog id="OnePay_confirm_Payment" className="modal">
                <div className="modal-box bg-white text-center rounded-xl">
                    {/* Optional Icon */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
                            alt="alert"
                            className="w-12 h-12"
                        />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        অনুগ্রহ করে নিশ্চিত করুন
                    </h3>

                    <p className="text-sm text-gray-600">
                        এই আদেশ শুধুমাত্র একবার জমা দেওয়া যাবে। <br />
                        আপনার TID:{" "}
                        <span className="text-red-600 font-bold">{TrxId}</span>{" "}
                        সঠিক কিনা তা নিশ্চিত করুন।
                    </p>

                    <div className="modal-action flex justify-center gap-4 mt-6">
                        <button
                            className="btn btn-sm bg-[#313381] text-white hover:bg-[#2c2e75] rounded-full px-6"
                        // onClick={onConfirm}
                        >
                            নিশ্চিত
                        </button>
                        <button
                            onClick={() => document.getElementById('OnePay_confirm_Payment').close()}
                            className="btn btn-sm bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-full px-6"
                        >
                            বাতিল করুন
                        </button>
                    </div>
                </div>
            </dialog >
            {/* ============================================ */}
            {/* Payment Confirm Ask Modal End */}
            {/* ============================================ */}
        </div >
    );
};

export default ConfirmPaymentOnePay;