import React from 'react';
import "./UserAllWithdrawDataSee.css"

const UserAllWithdrawDataSee = ({ AllWithdraw, HandleApproved, handleDelete }) => {
    // console.log(AllWithdraw)

    let { PaymentNumber, RequestBalance, afterCharge, TotalBalance, paymentType, userId, UserName, UserEmail, status, WithdrawId, _id } = AllWithdraw

    return (
        <tr className='UserAllData'>

            <td>
                <h3>{UserName}</h3>
            </td>
            <td>
                <h3>{UserEmail}</h3>
            </td>
            <td>
                <h3>{PaymentNumber}</h3>
            </td>
            <td>
                <h3>{paymentType}</h3>
            </td>
            <td>
                <h3>Request: {RequestBalance}</h3>
                <h3>Charge: {afterCharge}</h3>
                <h3>Total: {TotalBalance}</h3>
            </td>
            <td>
                <h3 className={status === "approved" ? "text-center border-4 border-green-700" : "text-center border-4 border-red-700"}>{status}</h3>
            </td>

            <td>
                <button disabled={status === "approved"} onClick={() => HandleApproved(_id, userId, TotalBalance)}>Approved</button>
                <br />
                <button onClick={() => handleDelete(_id)}>Delete</button>
            </td>

        </tr>
    );
};

export default UserAllWithdrawDataSee;