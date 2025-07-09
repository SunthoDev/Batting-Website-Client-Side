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
    //  // All VIP Data Get Here 
    // ===================================================================
    const { data: UserVIPAllData = [], refetch } = useQuery({
        queryKey: ["VIPAllData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/VIPAllData");
            return res.json();
        },
    });
    // console.log(UserVIPAllData)

    // ===================================================================
    //  // My all REfer Data Get Here
    // ===================================================================
    const { data: userUserAllRef = [] } = useQuery({
        queryKey: ["UserAllRef"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/UserAllRef");
            return res.json();
        },
    });

    // there are all refer vip date here
    // =====================================
    let useUserReferVIPAll = []

    // filter active user ref VIP data all 
    // =====================================
    if (user?.email && roles?.email) {
        useUserReferVIPAll = userUserAllRef?.filter(RefUser => RefUser?.useRefCode === roles?.referId && RefUser?.status === "approved")
    }

    // console.log(useUserReferVIPAll)
    // ===================================================================
    //  // All My VIP Refer Find  End
    // ===================================================================
    


    return (
        <div className="bg-[#F7F8FC] pt-12">
            <div className="VIPParent pb-24 mx-4 ">

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