import React from 'react';
import "./Home.css"
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';
import VIP from '../../assets/AllImage/VIP.png';
import home from '../../assets/AllImage/home.png';
import clame from '../../assets/AllImage/clame.png';
import Icon7 from '../../assets/AllImage/icon7.png';
import T from '../../assets/AllImage/T.png';
import Coin from '../../assets/AllImage/Coin.png';
import useRole from '../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AuthoncationAll/AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Banner from '../HomeAllSection/Banner.jsx/Banner';
import EveryTopDetails from '../HomeAllSection/EveryTopDetails/EveryTopDetails';

const Home = () => {

    let { user, loading, setSubscriptionPrice } = useContext(AuthContext);
    const [roles] = useRole()
    const userStatus = roles?.email && user?.email;
    let navigate = useNavigate();
    let location = useLocation();
    // console.log(roles);

    // ===================================================================
    //  // user All Subscription Data Start
    // ===================================================================
    const { data: UserSubscriptionDataAll = [], refetch } = useQuery({
        queryKey: ["UserSubscriptionDataAll"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/UserSubscriptionDataAll");
            return res.json();
        },
    });
    // if user subscription have or have not 
    let userSubscription = []
    if (user && roles?.email && user?.email) {

        userSubscription = UserSubscriptionDataAll.find(userSub => userSub.UserEmail === roles?.email)
    }
    // console.log(userSubscription)








    const cardClass =
        "backdrop-blur-md bg-white/10 text-white p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.02] transition-all duration-300";


    return (
        <div className="HomeParent bg-white">
            <ToastContainer />
            <Banner></Banner>
            <EveryTopDetails></EveryTopDetails>




            {/* <div className='CoinNumber flex items-center'>
                <h2>{roles?.userBalance}</h2>
                <button className="ParsentiseButton">ব্যালেন্স</button>
            </div> */}

        </div>
    );
};

export default Home;