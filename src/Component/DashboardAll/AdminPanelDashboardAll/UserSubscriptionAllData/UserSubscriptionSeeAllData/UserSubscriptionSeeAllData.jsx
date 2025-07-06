import React from 'react';
import "./UserSubscriptionSeeAllData.css"

const UserSubscriptionSeeAllData = ({ allOrder,HandleApproved,HandlePending,HandleDelete }) => {

    console.log(allOrder)

    let {SubDayBonus,SubPrice,SubscriptionDay,SubscriptionId,TotalProfite,UseRefBonusUser,UserEmail,UserName,status,useRefCode,userId,hours, _id} = allOrder

    
    
    return (
        <tr className='UserAllData'>

            <td>
                <h3>{userId}</h3>
            </td>
            <td>
                <h3>{UserName}</h3>
            </td>
            <td>
                <h3>{UserEmail}</h3>
                <br />
                <h3>Hours: {hours}</h3>
            </td>
            <td>
                <h3>{SubPrice}</h3>
            </td>
            <td>
                <h3>{SubscriptionDay}</h3>
            </td>
            <td>
                <h3 className={status === "approved" ? "text-center border-4 border-green-700" : "text-center border-4 border-red-700"}>{status}</h3>
            </td>

            <td>
                <button disabled={status === "approved"} onClick={() => HandleApproved(userId,useRefCode,SubscriptionId,UseRefBonusUser,SubPrice)}>Approved</button>
                <br/>
                <button disabled={status === "pending"} onClick={() => HandlePending(userId,useRefCode,SubscriptionId,UseRefBonusUser,SubPrice)}>Pending</button>
                <br/>
                <button onClick={() => HandleDelete(_id,useRefCode,SubscriptionId,UseRefBonusUser)}>Delete</button>
            </td>

        </tr>
    );
};

export default UserSubscriptionSeeAllData;