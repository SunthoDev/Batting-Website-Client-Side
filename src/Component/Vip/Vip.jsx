import React, { useContext } from 'react';
import "./Vip.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import VIPDetails from './VIPDetails/VIPDetails';

const Vip = () => {

    let { user } = useContext(AuthContext);
    const [roles] = useRole()
    const userStatus = roles?.email && user?.email;
    let navigate = useNavigate();

    // ===================================================================
    //  // user All Subscription Data Start 
    // ===================================================================
    const { data: UserVIPAllData = [], refetch } = useQuery({
        queryKey: ["VIPAllData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/VIPAllData");
            return res.json();
        },
    });

    // console.log(UserVIPAllData)

    // ===================================================================
    //  // user All Subscription Data End
    // ===================================================================
    // ===================================================================
    //  // All My VIP Refer Find  Start
    // ===================================================================

    const { data: userUserAllRef = [] } = useQuery({
        queryKey: ["UserAllRef"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/UserAllRef");
            return res.json();
        },
    });


    // there are all refer vip date here
    let useUserReferVIPAll = []

    // filter active user ref VIP data all 
    if (user?.email && roles?.email) {
        useUserReferVIPAll = userUserAllRef?.filter(RefUser => RefUser?.useRefCode === roles?.referId && RefUser?.status === "approved" && RefUser?.VIPReferUse === "yes")
    }

    // console.log(useUserReferVIPAll)

    // ===================================================================
    //  // All My VIP Refer Find  End
    // ===================================================================
    




    return (
        <div className="bg-[#F7F8FC] pt-24 ">
            <div className="VIPParent pb-24">

                <div className="VIPTop w-[100%]  text-white bg-[#3CCC70] md:w-[40%] mx-auto mt-6">
                    <div className="img">
                        <img src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png" alt="img" />
                    </div>
                    <h3>{roles?.name} {roles?.LastName}</h3>
                    <h3>User Id: {roles?.userId}</h3>
                    <h3>Total Vip Refer: {useUserReferVIPAll?.length}</h3>
                </div>


                <div className="VIPAll w-[100%] md:w-[40%] mx-auto ">

                    {
                        UserVIPAllData?.map( UserVIP => <VIPDetails key={UserVIP._id} UserVIP={UserVIP} useUserReferVIPAll={useUserReferVIPAll} refetch={refetch}></VIPDetails> )
                    }


                </div>

            </div>
        </div>
    );
};

export default Vip;