import React, { useEffect } from "react";
import "./Main.css"
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderBottom from '../HeaderBottom/HeaderBottom';
import { useQuery } from '@tanstack/react-query';

const Main = () => {

    // ===========================================================================================================
    // All Bank Info Data!
    // =======================================
    const { data: AllPopUpDataOfWebsite = [] ,isLoading } = useQuery({
        queryKey: ["GetAllPopUpData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/GetAllPopUpData");
            return res.json();
        },
    });
    // console.log(AllPopUpDataOfWebsite)
    let PopUpData = AllPopUpDataOfWebsite[0]

    // =======================================
    // Pop Up Show With Data 
    // =======================================
    const [showPopup, setShowPopup] = useState(true);
    const handleClose = () => {
        setShowPopup(false);
    };


    return (
        <div className="relative">

            {/* ✅ Refresh Popup */}
            {/* =============================== */}
            { isLoading !== showPopup && (
                <div className="PopUpParent fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl p-4 w-[90%] max-w-sm relative shadow-2xl border border-gray-200">
                        <button
                            className="absolute top-2 right-2 bg-black w-[40px] h-[40px] rounded-[50%] text-green-600 text-xl"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                        <img
                            src={PopUpData?.Image}
                            alt="Buy 1 Get 2"
                            className="rounded-lg mb-4 w-full"
                        />
                        <h2 className="text-lg font-bold text-black">
                           {PopUpData?.Title}
                        </h2>
                        <p className="Details text-sm text-gray-700 mt-2">
                            {PopUpData?.Details}
                        </p>
                    </div>
                </div>
            )}


            <Header></Header>
            <Outlet></Outlet>
            <HeaderBottom />

        </div >
    );
};

export default Main;