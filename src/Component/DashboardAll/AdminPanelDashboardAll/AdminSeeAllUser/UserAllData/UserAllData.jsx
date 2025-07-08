import React from 'react';
import "./UserAllData.css"
import Swal from 'sweetalert2';

const UserAllData = ({ allUser, HandleAdmin, handleUser, HandleDelete, refetch }) => {

    // console.log(allUser)

    let { LastName, Password, userBalance, date, email, name, photo, role, status, userId, _id, referId } = allUser


    let handleUpdateAmount = (event)=> {
        event.preventDefault()
        let amount = event.target.upUserBalance.value
        let allInfo = {amounts: amount}
        // console.log(allInfo)

        fetch(`https://server.e-cash-id.com/AdminUpdateUserBalance/${_id}`, {
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
                        title: "Your request is Success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }


    return (
        <tr className='UserAllData'>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={photo} />
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <h3>{name} <br /> Balance: {userBalance}</h3>
            </td>
            <td>
                <h3>{email}</h3>
                <br />
                <form onSubmit={handleUpdateAmount}>
                    <div className="UserBalanceUpdate">

                        <input className="w-full" type="number" name="upUserBalance" defaultValue={userBalance} />

                        <button className="UpButton" type="submit">push</button>

                    </div>
                </form>
            </td>
            <td>
                <h3>{referId}</h3>
            </td>
            <td>
                <h3 className={role === "admin" ? "text-center border-4 border-green-700" : "text-center border-4 border-red-700"}>{role}</h3>
            </td>

            <td>
                <button onClick={() => HandleAdmin(_id)}>Admin</button>
                <br />
                <button onClick={() => handleUser(_id)}>User</button>
            </td>
            <td>
                <button onClick={() => HandleDelete(_id)}>Delete</button>
            </td>

        </tr>
    );
};

export default UserAllData;