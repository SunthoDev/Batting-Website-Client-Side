import React from 'react';
import './AllBankCard.css'
import useRole from '../../../Hook/useRole';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllBankCard = () => {

    const [roles] = useRole()
    let navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault();
        const bankName = e.target.bankName.value;
        const accountNumber = e.target.accountNumber.value;
        const accountHolder = e.target.accountHolder.value;
        let allInfo = { bankName, accountNumber, accountHolder };

        fetch(`https://test.e-cash-id.com/UserUpdateHisBankInformation/${roles?._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You Bank Details update success !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset()
                    navigate("/Profile")
                }
            })


        e.target.reset();
    };



    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 pt-[68px] pb-[88px]">
            <div className="w-full max-w-md">
                <h2 className="text-[16px] font-bold bg-green-800 p-4 text-white mb-6 text-center">Bank Info</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-lg shadow-md p-6 space-y-4"
                >
                    {/* Select Bank */}
                    <div>
                        <label className="text-left block text-gray-700 font-medium mb-1">Select Bank</label>
                        <select
                            name="bankName"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                            required
                        >
                            <option value="">-- Select Bank --</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="text-left block text-gray-700 font-medium mb-1">Account Number</label>
                        <input
                            type="text"
                            name="accountNumber"
                            placeholder="Enter account number"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                            required
                        />
                    </div>

                    {/* Account Holder Name */}
                    <div>
                        <label className="text-left block text-gray-700 font-medium mb-1">Account Holder Name</label>
                        <input
                            type="text"
                            name="accountHolder"
                            placeholder="Enter account holder name"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-2">
                        <button
                            type="submit"
                            className="bg-green-600 w-full hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AllBankCard;