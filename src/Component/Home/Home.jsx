import React, { useEffect } from "react";
import "./Home.css"
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';
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





    return (
        <div className="HomeParent bg-white ">

            <Banner></Banner>
            <EveryTopDetails></EveryTopDetails>

        </div>
    );
};

export default Home;