import React from 'react';
import "./UserAllRechargeDataSee.css"

const UserAllRechargeDataSee = ({allUserRecharge,HandleApprovedRechargeStatus,HandleDelete,index}) => {

    // console.log(allUserRecharge)

    let {AccountNumber,PayTrxId,PaymentIdUser,TotalAmount,UserEmail,UserName,payType,status,_id} = allUserRecharge


    return (
        <tr className='UserAllData'>
            <td>
                <h3>{index + 1}</h3>
            </td>
            <td>
                <h3>{UserName}</h3>
            </td>
            <td>
                <h3>{TotalAmount}</h3>
            </td>
            <td>
                <h3>{AccountNumber}</h3>
            </td>
            <td>
                <h3>{PayTrxId}</h3>
            </td>
            <td>
                <h3>{payType}</h3>
            </td>
            <td className={status === "approved" ? " text-green-500" : " text-red-500"}>
                <h4>{status}</h4>
            </td>
            <td>
                <button onClick={() => HandleApprovedRechargeStatus(_id,UserEmail,TotalAmount)}>Approved</button>
            </td>
            <td>
                <button onClick={() => HandleDelete(_id)}>Delete</button>
            </td>

        </tr>
    );
};

export default UserAllRechargeDataSee;