import React from 'react';
import "./SelectPaymentOnePay.css"
import banner from "../../../../../assets/OnePay/banner.png"
// import Bkash from "../../../../../assets/OnePay/bkash.png"
// import Nagad from "../../../../../assets/OnePay/nagad.png"
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const SelectPaymentOnePay = () => {

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



// Payment Method Select Options
// ==========================================
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleSelect = (method) => {
        setSelected(method);
        setOpen(false);
    };


    return (
        <div className="SelectPaymentOnePayParent bg-white pb-[100px] md:pb-[120px]">

            <div className="BannerImage">
                <img className="w-full h-[180px] md:h-[220px]" src={banner} alt="banner" />
            </div>

            <div className="SelectInfo bg-white px-4">
                <h4 className="text-[14px] test-left text-[#b8b8b8] pt-[24px] md:pt-[40px]">অর্ডার আইডি:S2025071719091403475</h4>
                <h4 className="text-[34px] text-center font-[900] text-[#313381] pt-[14] md:pt-[20px]">300 TK</h4>

                {/* ============================== */}
                {/* Select Options Start */}
                {/* ============================== */}
                <div className="w-full relative mt-[28px] md:mt-[34px] hidde">
                    <label className="absolute -top-2 left-6 bg-white px-1 text-sm text-gray-500 z-10">
                        পেমেন্ট চ্যানেল
                    </label>

                    <div
                        onClick={() => setOpen(!open)}
                        className="cursor-pointer border-[2px] border-gray-400 bg-white h-[54px] rounded-[34px] flex items-center justify-between px-4"
                    >
                        <div className="flex items-center gap-2 text-black">
                            {selected?.icon && (
                                <img src={selected.icon} alt="" className="w-5 h-5" />
                            )}
                            <span className="text-sm">
                                {selected?.name || "পেমেন্ট চ্যানেল নির্বাচন করুন"}
                            </span>
                        </div>
                        <span className="text-sm"><i className="fa fa-angle-left text-gray-800 text-[24px]" aria-hidden="true"></i></span>
                    </div>

                    {open && (
                        <div className="absolute top-[64px] left-0 bg-white w-full rounded-[34px] shadow-md border-[1px] border-gray-200 z-20">
                            {BankInformationAll?.filter(opt => opt.BankName).map((opt, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        handleSelect({
                                            name: opt.BankName,
                                            icon: opt.image || "https://i.ibb.co/4pDNDk1/default.png", // fallback icon
                                            value: opt.BankName,
                                        })
                                    }
                                    className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 cursor-pointer rounded-[34px]"
                                >
                                    <img
                                        src={opt.image || "https://i.ibb.co/4pDNDk1/default.png"}
                                        alt=""
                                        className="w-5 h-5"
                                    />
                                    <span className="text-sm text-black">{opt.BankName}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* ====================================== */}
                    {/* Alert  */}
                    {/* ====================================== */}

                    <div className="mt-5 text-left text-[#999999] text-[12px] leading-[18px] font-[PingFangSC] space-y-2">
                        <p className="font-semibold text-[#999999]">মিলনাদানী পরামর্শ:</p>

                        <p>
                            1. একটি ব্যাংক অ্যাকাউন্ট প্রাপ্ত করার জন্য কোন ব্যাংক নাম চয়ন করুন, এবং তথ্য অনুযায়ী টাকা
                            স্থানান্তর করতে হবে সম্পর্কিত ব্যাংক নাম এবং ব্যাংক অ্যাকাউন্টে।
                        </p>

                        <p>
                            2. একই ফোন নম্বর একাধিক ব্যাংক অ্যাকাউন্টে সংযোজিত করা যেতে পারে। আপনার পছন্দের অন্য কোন
                            ব্যাংক অ্যাকাউন্টে অর্থ স্থানান্তর করবেন না।
                        </p>

                        <p>
                            <span className="text-[#ED9433] font-semibold">*গুরুত্বপূর্ণ স্মরণকারী: </span>
                            <span>
                                যদি অর্থ একই ফোন নম্বরের সাথে অন্য একটি ব্যাংকে স্থানান্তরিত করা হয়, তবে অর্থগুলি <br />
                                আপনার অ্যাকাউন্টে ক্রেডিট করা হতে পারে না।
                            </span>
                        </p>
                    </div>

                    {/* 🔽 নিচে পেমেন্ট বাটন */}
                    {/* ======================================= */}
                    <div className="w-full flex justify-center"> {/* wrapper div */}
                        <button
                            disabled={!selected}
                            className={`w-full md:w-[24%] mt-2 md:mt-24 py-4 rounded-full text-white font-semibold text-[18px] transition
                            ${selected ? 'bg-[#313381] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}
                            `} >
                            পেমেন্ট যান
                        </button>
                    </div>

                </div>

                {/* ============================== */}
                {/* Select Options End */}
                {/* ============================== */}
            </div>
        </div >
    );
};

export default SelectPaymentOnePay;