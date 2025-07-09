import React from 'react';
import "./SingUpBonus.css"
import moment from 'moment';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const SingUpBonus = () => {


    // ======================================================
    // SingUp Bonus Data Find Here
    // ======================================================
    const { data: SingUpBonusData = [], refetch } = useQuery({
        queryKey: ["AdminGetSingUpBonusData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/AdminGetSingUpBonusData");
            return res.json();
        },
    });
    let SingUpBonus = SingUpBonusData[0]
    // console.log(SingUpBonusData)

    // ======================================================
    // Payment Selected Status Find and Apply End
    // ======================================================

    // ======================================================
    // Admin Update SingUp Bonus Start
    // ======================================================
    const handleUpdatePaymentInfo = (event) => {
        event.preventDefault()

        let Bonus = event.target.Bonus.value
        let allInfo = { Bonus }

        // console.log(allInfo)

        fetch(`http://localhost:5000/AdminUpdateSingUpBonusAmount/${SingUpBonus?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Payment Data Update Is Success',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    refetch()
                }
            })

    }
    // ======================================================
    // Admin Update SingUp Bonus End
    // ======================================================


    return (
        <div className='md:mx-20 mb-10'>

            <div className="welcome mx-4 md:mx-0">
                <div className="img">
                    <img src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1452&q=80" alt="" />
                    <div className="overlay ">
                        <h2>Update SingUp Bonus Information</h2>
                    </div>
                </div>
            </div>

            <form onSubmit={handleUpdatePaymentInfo}>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Update SingUp Bonus</span>
                        </label>
                        <label className=" input-group w-full">
                            <span className="text-black text-left">Bonus Amount ({SingUpBonus?.BonusSingUp})</span>
                            <input type="text" name='Bonus' defaultValue={SingUpBonus?.BonusSingUp} placeholder=" Give me Number " className="bg-white input input-bordered input-accent w-full " />
                        </label>
                    </div>
                </div>
                <input type="submit" className="btn text-white bg-[#1E8F85] w-full mt-8" value="Update Status" />

            </form>

        </div>
    );
};

export default SingUpBonus;


