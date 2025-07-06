import React from 'react';
import "./VIPDetails.css"
import { Link, useNavigate } from 'react-router-dom';
import useRole from '../../../Hook/useRole';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const VIPDetails = ({ UserVIP, useUserReferVIPAll, refetch }) => {

    let { CountRef, ID, Title, VIPBunas, VIPNum, _id } = UserVIP
    const [roles] = useRole()
    let navigate = useNavigate()

    // =============================================
    // User send request VIP clime data Start
    // =============================================

    let handleVIPClime = (VIPNum, VIPBunas, Email) => {

        let allInfo = { ClimeVIPNum: VIPNum, userId: roles?.userId, UserName: roles?.name, UserEmail: roles?.email }
        let VIPTotalBalance = { UserVIPBunas: VIPBunas }

        fetch("http://localhost:5000/ClimeVipDataAllAdd", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // User balance add VIP Bonus
                    fetch(`http://localhost:5000/VIPBonusUserBalanceAdd/${Email}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(VIPTotalBalance)
                    })
                        .then(res => res.json())
                        .then(data => {

                            if (data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your VIP Bonus is Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                navigate("/")
                            }
                        })

                }
            })
    }

    // =============================================
    // User send request VIP clime data End
    // =============================================

    // ===================================================================
    //  // User Clime VIP Data All Find Start
    // ===================================================================

    // user all Climed VIP data 
    const { data: userAllClimeVIPData = [] } = useQuery({
        queryKey: ["ClimeVipDataAll"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/ClimeVipDataAll");
            return res.json();
        },
    });


    // My all VIP climed data find
    const VIPUserAllClimeData = userAllClimeVIPData?.filter(MyVIPClime => MyVIPClime?.UserEmail === roles?.email)
    // console.log(VIPUserAllClimeData)

    // My All Climed VIP data VIPNum  Find
    const ClimeNumberVIP = new Set(VIPUserAllClimeData.map(ClimeNumber => ClimeNumber.ClimeVIPNum));

    // Check My all Climed VIP data for Disable 
    const VIPClimedDataAllDisable = ClimeNumberVIP.has(VIPNum);
    console.log(VIPClimedDataAllDisable)


    // ===================================================================
    //  // User Clime VIP Data All Find End
    // ===================================================================


    return (
        <div className="VIPDetailsParent">

            <div className="Top flex items-center justify-between">
                <h4>{VIPNum}</h4>
                <h5>{useUserReferVIPAll?.length} / {CountRef}</h5>
            </div>
            <p>{Title}</p>

            {
                useUserReferVIPAll?.length === CountRef ?
                    <button
                        className="VIPButton"
                        onClick={() => handleVIPClime(VIPNum, VIPBunas, roles?.email)}
                        disabled={VIPClimedDataAllDisable}
                    >
                        {VIPClimedDataAllDisable ? "VIP Bonus Already Claimed" : "VIP Bonus Clime Now"}
                    </button>
                    : useUserReferVIPAll?.length > CountRef ?
                        <button className="VIPButton" disabled>
                            VIP Bonus Already Claimed
                        </button>
                        :
                        <Link to="/InventionUser">
                            <button className="VIPButton">
                                Invention Your Friends
                            </button>
                        </Link>

            }

        </div>
    );
};

export default VIPDetails;


// first

// {
//     useUserReferVIPAll?.length === CountRef
//         ?
//         <button
//             className="VIPButton"
//             onClick={() => handleVIPClime(VIPNum, VIPBunas, roles?.email)}
//             disabled={VIPClimedDataAllDisable}
//         >

//             {VIPClimedDataAllDisable ? "VIP Bonus Already Claimed" : "VIP Bonus Clime Now"}

//         </button>
//         :
//         <Link to="/InventionUser"><button className="VIPButton">
//             Invention Your Friends
//         </button></Link>
// }






// second
// {
//     useUserReferVIPAll?.length === CountRef
//         ?
//         <button
//             className="VIPButton"
//             onClick={() => handleVIPClime(VIPNum, VIPBunas, roles?.email)}
//             disabled={VIPClimedDataAllDisable}
//         >

//             {VIPClimedDataAllDisable ? "VIP Bonus Already Claimed" : "VIP Bonus Clime Now"}

//         </button>
//         : VIPClimedDataAllDisable ?
//             <button className="VIPButton">VIP Bonus Already Claimed</button>
//             :
//             <Link to="/InventionUser">
//                 <button className="VIPButton">
//                     Invention Your Friends
//                 </button></Link>
// }

