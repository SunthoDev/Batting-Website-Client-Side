import React from 'react';
import "./UserAllWithdrawData.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UserAllWithdrawDataSee from './UserAllWithdrawDataSee/UserAllWithdrawDataSee';

const UserAllWithdrawData = () => {

    // User all Withdraw Data Find
    const { data: userAllWithdrawData = [], refetch } = useQuery({
        queryKey: ["UserAllWithdrawData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserAllWithdrawData");
            return res.json();
        },
    });
    // console.log(userAllWithdrawData)

    // Admin Approved User Task ______________
    let HandleApproved = (id, userId, RequestBalance) => {

        let allInfo = { RequestBalance }

        // user balance decrease
        fetch(`https://test.e-cash-id.com/AdminaWithdrawRequestUserBalanceDecrease/${userId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
            
                if (data.modifiedCount > 0) {
                    //  admin approved withdraw status 
                    fetch(`https://test.e-cash-id.com/AdminWithdrawRequestApproved/${id}`, {
                        method: "PATCH",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Admin Withdraw Approved Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                             refetch()
                        })
                }
            })
    }


    // Admin User Task  delete______________
    let handleDelete = (id) => {

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

                fetch(`https://test.e-cash-id.com/AdminDeleteWithdrawData/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Admin Delete Withdraw Data Success",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        // console.log(data)
                        refetch()
                    })
            }
        });
    }


    return (
        <div className='UserAllCompleteData bg-white '>

            <div className='completeData bg-[#F6F6F6] rounded-[7px] mx-0 md:mx-6 my-8 px-4 py-8'>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-[14px] font-[600] text-white">USER NAME</th>
                                <th className="text-[14px] font-[600] text-white">USER EMAIL</th>
                                <th className="text-[14px] font-[600] text-white">USER NUMBER</th>
                                <th className="text-[14px] font-[600] text-white">PAYMENT TYPE</th>
                                <th className="text-[14px] font-[600] text-white">REQUEST BALANCE</th>
                                <th className="text-[14px] font-[600] text-white"> STATUS</th>
                                <th className="text-[14px] font-[600] text-white">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                userAllWithdrawData?.slice().reverse().map(AllWithdraw => <UserAllWithdrawDataSee key={AllWithdraw._id} AllWithdraw={AllWithdraw} HandleApproved={HandleApproved} handleDelete={handleDelete}></UserAllWithdrawDataSee>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default UserAllWithdrawData;