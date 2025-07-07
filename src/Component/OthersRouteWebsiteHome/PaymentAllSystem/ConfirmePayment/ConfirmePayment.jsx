import React, { useContext, useEffect, useState } from 'react';
import "./ConfirmePayment.css"
import stepTwo from "../../../../assets/AllImage/stepTwo.png"
import stepThree from "../../../../assets/AllImage/stepThree.png"
import stepThreeB from "../../../../assets/AllImage/stepThreeB.png"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';



const ConfirmePayment = () => {

  let { paymentInfo } = useContext(AuthContext)
  let navigate = useNavigate()
  const [roles] = useRole()
  let [btnDisable, setBtnDisable] = useState(false)

  // if the array value will be empty ter redirect another page 
  useEffect(() => {
    if (paymentInfo && paymentInfo.length === 0) {
      navigate("/Recharge");
    }
  }, [paymentInfo, navigate]);


// Payment submit Data User
// ======================================
  let handleSubmit = (e) => {
    e.preventDefault()
    setBtnDisable(true)
    let PayTrxId = e.target.PayTransactionsId.value;
    let PaymentIdUser = Math.round(Math.random() * 99999999).toString();

    let allInfo = { PayTrxId, PaymentIdUser, TotalAmount: paymentInfo[0], AccountNumber: paymentInfo[1], payType: paymentInfo[2], status: "pending", UserName: roles?.name, UserEmail: roles?.email, }
    // console.log(allInfo)

    fetch("http://localhost:5000/userPaymentRequest", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(allInfo)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Congratulation, you payment is success",
            showConfirmButton: false,
            timer: 1500
          })
          setBtnDisable(false)
          navigate("/")
        }
      })
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
  let paymentTypeAdmin = AdminPaymentStatusData[0]

  // console.log(paymentTypeAdmin)


  // ======================================================
  // Payment Selected Status Find and Apply End
  // ======================================================


  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen text-white px-4">
      <div className="ConfirmedPayment py-24 md:py-20 w-full md:w-[500px] mx-auto">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Step 1 */}
          <h2 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2">Step 1: Copy Beneficiary Account</h2>

          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-gray-300">Our Payment Number</h3>
            <h4 className="text-lg font-semibold text-white">{paymentTypeAdmin?.number ? paymentTypeAdmin?.number : "01754314001"}</h4>
          </div>

          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-gray-300">Payment Channel</h3>
            <h4 className="text-lg font-semibold text-white">{paymentInfo[2]}</h4>
          </div>

          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-gray-300">Recharge Amount</h3>
            <h4 className="text-lg font-semibold text-white">৳ {paymentInfo[0]}</h4>
          </div>

          {/* Step 2 */}
          {paymentInfo[2] === "Nagad" ? (
            <>
              <h2 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2">Step 2: Please Transfer Amount via Nagad</h2>
              <h3 className="text-sm text-yellow-300">
                <span className="text-red-500">*</span> After payment, copy the [TxnID]
              </h3>
              <div className="w-full h-auto mt-3 rounded-lg overflow-hidden">
                <img src={stepTwo} alt="Step Image" className="w-full h-full object-cover rounded-lg border border-gray-700" />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2">Step 2: Enter Your TxnID</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="w-full h-auto rounded-lg overflow-hidden">
                  <img src={stepThree} alt="Step Image A" className="w-full h-full object-cover rounded-lg border border-gray-700" />
                </div>
                <div className="w-full h-auto rounded-lg overflow-hidden">
                  <img src={stepThreeB} alt="Step Image B" className="w-full h-full object-cover rounded-lg border border-gray-700" />
                </div>
              </div>
            </>
          )}

          {/* TxnID Input */}
          <input
            type="text"
            name="PayTransactionsId"
            required
            placeholder="Enter 8-digit TxnID"
            className="w-full mt-4 bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={btnDisable}
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50`}
          >
            Confirm Payment
          </button>

        </form>
      </div>
    </div>

  );
};

export default ConfirmePayment;