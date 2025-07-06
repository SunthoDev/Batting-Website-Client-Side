import React from 'react';
import "./Recharge.css"
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import bakash from '../../../../assets/SbImage/bakash.png'
import nogod from '../../../../assets/SbImage/nogod.png'
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';

const Recharge = () => {

    let { setPaymentInfo } = useContext(AuthContext)
    let navigate = useNavigate()
    const [roles] = useRole()


    let [clickAmount, setClickAmount] = useState()
    let [error, setError] = useState("")


    let handleRecharge = (e) => {
        e.preventDefault()
        setError("")

        let TotalAmount = e.target.Amount.value
        let number = e.target.numbers.value
        let PayType = e.target.PaymentType.value

        if (PayType !== "Bkash" && PayType !== "Nagad") {
            setError("Select Proper Payment Method");
            return;
        }
        if (TotalAmount < 400) {
            setError("You must do a minimum recharge of 400 tk");
            return;
        }
        if (number.length < 11) {
            setError("You must give me a 11 character number");
            return;
        }

        setPaymentInfo([TotalAmount, number, PayType])
        navigate("/ConfirmePayment")

    }


    // ======================================================
    // Payment Selected Status Find and Apply Start
    // ======================================================

    const { data: AdminPaymentStatusData = [], refetch } = useQuery({
        queryKey: ["AdminPaymentStatusData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/AdminPaymentStatusData");
            return res.json();
        },
    });

    // console.log(AdminPaymentStatusData[0])
    let paymentTypeAdmin = AdminPaymentStatusData[0]


    // ======================================================
    // Payment Selected Status Find and Apply End
    // ======================================================




    return (
        <div className="bg-white min-h-screen text-white px-4">
  <div className="w-full md:w-[420px] mx-auto py-20">
    <form onSubmit={handleRecharge}>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 border border-gray-700">

        {/* My Balance */}
        <div className="bg-green-600 text-white rounded-lg p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg">My Balance</h3>
          <h4 className="text-xl font-bold">৳ {roles?.userBalance}</h4>
        </div>

        {/* Recharge Amount */}
        <div className="bg-gray-900 rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-medium text-gray-300">Select Amount</h4>
          <div className="grid grid-cols-3 gap-3">
            {[500, 1000, 1500, 2000, 2500, 3000].map((amount, i) => (
              <h5
                key={i}
                onClick={() => setClickAmount(amount)}
                className="bg-gray-700 hover:bg-green-600 text-white text-center py-2 rounded-md cursor-pointer transition-all duration-300 font-semibold"
              >
                ৳{amount}
              </h5>
            ))}
          </div>

          <input
            defaultValue={clickAmount}
            required
            name="Amount"
            type="number"
            className="w-full mt-3 bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter recharge amount"
          />
          <p className="text-sm text-yellow-400 mt-1">Minimum recharge is 400৳</p>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-900 rounded-lg p-4 space-y-4">
          <h2 className="text-sm font-medium text-gray-300">Your Account</h2>
          <input
            required
            type="number"
            name="numbers"
            className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            placeholder="e.g. 01XXXXXXXXX"
          />

          <h2 className="text-sm font-medium text-gray-300 mt-4">Payment Channel</h2>
          <select
            required
            name="PaymentType"
            className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 focus:outline-none"
          >
            <option disabled selected>Select your payment method</option>
            <option>Bkash</option>
            <option>Nagad</option>
          </select>

          {/* Error Show */}
          {error && (
            <p className="text-red-400 font-medium mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

    );
};

export default Recharge;