import React, { useContext, useState } from 'react';
import "./Climed.css"
import { AuthContext } from '../AuthoncationAll/AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useRole from '../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ClimedDetails from './ClimedDetails/ClimedDetails';

const Climed = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let navigate = useNavigate()
    let [btnDisable, setBtnDisable] = useState(false)

    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, status, userBalance, userId, _id } = roles

    // ===================================================================
    //  // user All Subscription Data Start
    // ===================================================================
    const { data: UserSubscriptionDataAll = [], refetch } = useQuery({
        queryKey: ["UserSubscriptionDataAll"],
        queryFn: async () => {
            const res = await fetch("https://server.e-cash-id.com/UserSubscriptionDataAll");
            return res.json();
        },
    });
    // if user subscription have or have not 
    let userSubscription = []
    if (user && roles?.email && user?.email) {

        userSubscription = UserSubscriptionDataAll?.filter(userSub => userSub.UserEmail === roles?.email)
    }
    // console.log(userSubscription)


    // ===================================================================
    //  // user All Subscription Data End
    // ===================================================================
    // ===================================================================
    //  // user Clime  Your Bonus Start
    // ===================================================================

    let handleUpdateUserClime = (Bonus, useEmail, subId) => {
        setBtnDisable(true)
        let allInfo = { Bonus, useEmail }
        // user Update Subscription Hours  daily  
        // ===============================================
        fetch(`https://server.e-cash-id.com/UserSubscriptionHoursUpdate/${subId}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // user Received  daily clime bonus 
                    // ===========================================
                    fetch(`https://server.e-cash-id.com/UserClimeForAddBalance/${useEmail}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(allInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {

                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Today Your Clime Request is Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            refetch()
                        })

                    setBtnDisable(false)

                    navigate("/")
                }
            })
    }

    // ===================================================================
    //  // user Clime  Your Bonus Start
    // ===================================================================

    return (
        <div className={`bg-[#F7F8FC] pt-24 pb-24 ${userSubscription.length <= 1 ? "h-[100vh]" : "h-[100%]"}`} >
            <div className="ClimeParent  w-[100%] md:w-[48%] mx-auto">

                {
                    userSubscription.length === 0 &&
                    <div className="ClimeTitle ">
                        <h4>হ্যালো : {name}{LastName}, সাবস্ক্রিপশন কিনার পর ক্লাইম করুন প্রতিদিন</h4>
                    </div>
                }

                {
                    userSubscription?.map((userSubscription) => <ClimedDetails key={userSubscription._id} userSubscription={userSubscription} handleUpdateUserClime={handleUpdateUserClime} btnDisable={btnDisable}></ClimedDetails>)

                }

            </div>
        </div>
    );
};

export default Climed;