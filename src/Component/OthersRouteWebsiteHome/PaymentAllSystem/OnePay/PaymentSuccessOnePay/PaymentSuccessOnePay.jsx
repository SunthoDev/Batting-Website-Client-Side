import React from 'react';
import "./PaymentSuccessOnePay.css"
import banner from "../../../../../assets/OnePay/banner.png"

const PaymentSuccessOnePay = () => {
    return (
        <div className="PaymentSuccessOnePayParent bg-white pb-[100px] md:pb-[120px]">
            <div className="BannerImage">
                <img className="w-full h-[180px] md:h-[220px]" src={banner} alt="banner" />
            </div>

            <div className="PaymentSuccessOnePay bg-white px-4">
                <div className="p-6 md:p-8 rounded-xl text-center">
                    {/* Amount Section */}
                    <div className="flex justify-center items-center font-bold text-[#313381] text-3xl mb-4">
                        <span className="mr-1">TK</span>
                        <span>300</span>
                    </div>

                    {/* Confirmation Text */}
                    <p className="text-[#6f6f6f] text-base leading-6">
                        আপনার অর্ডার সফলভাবে জমা দেওয়া হয়েছে এবং সিস্টেম এটি ৫ মিনিটের মধ্যে পর্যালোচনা করবে
                    </p>

                    {/* Status Image */}
                    <div className="mt-4 flex justify-center">
                        <img
                            src="https://checkout-bdt.onepay.news/static/new2/status2.png"
                            alt="Status"
                            className="w-[150px] h-[150px]"
                        />
                    </div>

                    {/* Cancel Button */}
                    <div className="mt-6">
                        <button
                            onClick={() => console.log('অর্ডার বন্ধ করুন clicked')}
                            className="bg-[#15a3e2] text-white w-full px-6 py-3 rounded-full font-medium transition"
                        >
                            অর্ডার বন্ধ করুন
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PaymentSuccessOnePay;