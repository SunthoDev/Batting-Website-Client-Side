import React, { useEffect } from 'react';
import "./AllSubscription.css"
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';
import useRole from '../../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import one from "../../../assets/SbImage/one.jpeg"
import two from "../../../assets/SbImage/two.jpeg"
import three from "../../../assets/SbImage/three.jpeg"
import four from "../../../assets/SbImage/four.jpeg"
import five from "../../../assets/SbImage/five.jpeg"



const AllSubscription = () => {

    let { user, loading, setSubscriptionPrice } = useContext(AuthContext);
    const [roles] = useRole()
    const userStatus = roles?.email && user?.email;
    let navigate = useNavigate();
    let location = useLocation();
    // console.log(roles);

    // ====================================================
    // Subscription Buy for go to another page  Start
    // ====================================================
    let HandleBuySubscription = (Price, number) => {

        if (user && roles?.email && user?.email) {

            setSubscriptionPrice([Price, number])
            navigate("/BuySubscriptionPlan")

        } else {

            Swal.fire({
                title: 'Please Login Your Account ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login", { state: { from: location } })
                        toast("Login Page Success")
                    }
                })
        }
    }
    // ====================================================
    // Subscription Buy for go to another page  Start
    // ====================================================

    let [SubscriptionData, setSubscriptionData] = useState([])
    useEffect(() => {
        fetch("subscription.json")
            .then(res => res.json())
            .then(data => setSubscriptionData(data))
    }, [])

    // console.log(SubscriptionData)








    return (
        <div className="AllSubscriptionParent bg-white w-[100%] px-4 pt-[80px] pb-[100px]">

            {/* ============================================= */}
            {/* All Subscription */}
            {/* ============================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {
                    SubscriptionData?.map((Subscription, index) =>
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] rounded-2xl p-5 text-white shadow-2xl hover:scale-[1.02] hover:shadow-green-500/30 transition-all duration-300 border border-white/10 backdrop-blur-md"
                        >
                            {/* Image */}
                            <div className="w-full h-44 rounded-xl overflow-hidden mb-4">
                                <img className="w-full h-full object-cover rounded-xl" src={Subscription?.image} alt="img" />
                            </div>

                            {/* Grid Info */}
                            <div className="grid grid-cols-2 gap-4 text-center mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-green-400">৳{Subscription?.SubscriptionPrice}</h3>
                                    <h4 className="text-sm text-gray-300">ইউনিট মূল্য</h4>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-400">৳{Subscription?.DailyProfit}</h3>
                                    <h4 className="text-sm text-gray-300">দৈনিক লাভ</h4>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-yellow-300">৳{Subscription?.TotalProfit}</h3>
                                    <h4 className="text-sm text-gray-300">মোট লাভ</h4>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-pink-400">{Subscription?.SubscriptionDate}</h3>
                                    <h4 className="text-sm text-gray-300">সীমা</h4>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => HandleBuySubscription(Subscription?.SubscriptionPrice, Subscription?.id)}
                                className="w-full py-2 bg-gradient-to-r from-green-400 to-lime-400 hover:from-lime-500 hover:to-green-500 text-black font-bold rounded-lg transition duration-300"
                            >
                                🛒 এখন কিনুন
                            </button>
                        </div>
                    )
                }
            </div>



        </div>
    );
};

export default AllSubscription;