import React from 'react';
import "./RechargeHistory.css"
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../../Hook/useRole';

const RechargeHistory = () => {

    const [roles] = useRole()
    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, status, userBalance, userId, _id } = roles


    // user All Recharge History Data Here
    // ==========================================
    const { data: userAllRechargeData = [], refetch } = useQuery({
        queryKey: ["AllRechargeData"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AllRechargeData");
            return res.json();
        },
    });
    // console.log(userAllRechargeData)
    // My All Recharge Data Find
    // =======================================
    let MyAllRechargeData = userAllRechargeData?.filter(Recharge => Recharge.UserEmail === roles?.email)





    return (
        <div className="bg-white pt-[120px]">
            <div className="bg-white px-4 py-6 md:w-[64%] w-full h-screen md:mx-auto rounded-md shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Recharge History</h2>

                {MyAllRechargeData.length === 0 ? (
                    <p className="text-center text-gray-500">No recharge history found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border border-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="border px-2 py-2">User Name</th>
                                    <th className="border px-2 py-2">Email</th>
                                    <th className="border px-2 py-2">Account No</th>
                                    <th className="border px-2 py-2">Pay Type</th>
                                    <th className="border px-2 py-2">Txn ID</th>
                                    <th className="border px-2 py-2">Payment ID</th>
                                    <th className="border px-2 py-2">Amount</th>
                                    <th className="border px-2 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MyAllRechargeData?.map((item, idx) => (
                                    <tr key={item._id || idx} className="text-center">
                                        <td className="border px-2 py-2">{item.UserName}</td>
                                        <td className="border px-2 py-2">{item.UserEmail}</td>
                                        <td className="border px-2 py-2">{item.AccountNumber}</td>
                                        <td className="border px-2 py-2">{item.payType}</td>
                                        <td className="border px-2 py-2">{item.PayTrxId}</td>
                                        <td className="border px-2 py-2">{item.PaymentIdUser}</td>
                                        <td className="border px-2 py-2 font-semibold text-green-600">৳ {item.TotalAmount}</td>
                                        <td className="border px-2 py-2">
                                            <span className={`px-2 py-1 rounded text-white text-xs font-medium ${item.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RechargeHistory;