import React, { useContext } from 'react';
import "./CustomerServices.css"
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../Hook/useRole';

const CustomerServices = () => {

    const { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, status, userBalance, userId, _id } = roles



    return (
        <div className="bg-[#F7F8FC] pt-24 h-[100vh] px-4">

            <div className="CustomerServicesParent">

                <div className="Services  w-[100%] md:w-[40%] mx-auto mt-6">
                    <div className="flex items-center justify-between">
                        <h4>আমাদের চ্যানেল সাপোর্ট</h4>
                        <a href="http://t.me/monyplant_2024" target="_blank">
                            <button>Go Chanel</button>
                        </a>
                    </div>
                </div>

                <div className="Services  w-[100%] md:w-[40%] mx-auto mt-6">
                    <div className="flex items-center justify-between">
                        <h4>আমাদের গ্রুপ সাপোর্ট</h4>
                        <a href="http://t.me/+xxuc830mp-Y4Mjg1" target="_blank">
                            <button>Go Groupe</button>
                        </a>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CustomerServices;