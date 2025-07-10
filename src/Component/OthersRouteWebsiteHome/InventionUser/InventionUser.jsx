import React, { useContext } from 'react';
import "./InventionUser.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import useRole from '../../../Hook/useRole';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';


const InventionUser = () => {

    const { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, status, userBalance, userId, _id } = roles
    const notify = () => toast.success("Referral link copied!");


    // All Refer Bonus Percentage
    // =======================================
    const { data: AllReferBonusPercent = [] } = useQuery({
        queryKey: ["GetReferBonusPercent"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/GetReferBonusPercent");
            return res.json();
        },
    });
    // console.log(AllPopUpDataOfWebsite)
    let ReferPercentageData = AllReferBonusPercent[0]





    return (
        <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen pb-[100px] pt-24 text-white">
            <ToastContainer />

            <div className="InventionUserParent space-y-6 px-4">

                {/* Referral Info */}
                <div className="max-w-xl mx-auto bg-[#1a1a1a] border-l-4 border-[#FFD700] rounded-lg p-6 shadow-lg">
                    <h4 className="text-xl font-bold mb-2">
                        👋 Hello {name}, exciting news for you!
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        If someone subscribes using your referral code, you'll earn a bonus of <span className="text-green-400 font-semibold">{ReferPercentageData?.ReferBonusPercent}%</span> of their subscription amount.
                        <br />So, share your referral link now and start earning!
                    </p>
                </div>

                {/* Referral Link Box */}
                <div className="max-w-xl mx-auto bg-[#1f1f1f] border border-[#00c9a7] rounded-lg p-6 shadow-lg">
                    <h4 className="text-lg font-semibold mb-3">📢 Share your referral link</h4>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <p className="bg-[#333] text-sm px-4 py-2 rounded w-full md:w-auto break-all border border-gray-700">
                            https://e-cash-id.com/singUp/{referId}
                        </p>
                        <CopyToClipboard text={`https://e-cash-id.com/singUp/${referId}`}>
                            <button
                                onClick={notify}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-2 rounded hover:scale-105 transition duration-300 shadow-md"
                            >
                                📋 Copy Now
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InventionUser;