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
import moment from 'moment';



const ConfirmePayment = () => {

  let { paymentInfo } = useContext(AuthContext)
  let navigate = useNavigate()
  const [roles] = useRole()
  let [btnDisable, setBtnDisable] = useState(false)

  // if user re4charge amount is not fount back recharge page
  // ==================================================================
  useEffect(() => {
    if (paymentInfo && paymentInfo.length === 0) {
      navigate("/Recharge");
    }
  }, [paymentInfo, navigate]);

  // ======================================================
  // Admin Update Payment Information to Here
  // ======================================================
  const { data: BankInformationAll = [] } = useQuery({
    queryKey: ["AdminPaymentStatusData"],
    queryFn: async () => {
      const res = await fetch("https://test.e-cash-id.com/AdminPaymentStatusData");
      return res.json();
    },
  });
  // console.log(BankInformationAll)

  // Payment Select Method
  // ======================================
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // ======================================
  // Payment submit Data User
  // ======================================
  let handleSubmit = (e) => {
    e.preventDefault()
    setBtnDisable(true)
    let PayNumber = e.target.numbers.value;
    let PayTrxId = e.target.PayTransactionsId.value;
    let PaymentIdUser = Math.round(Math.random() * 99999999).toString();
    let date = moment().format("DD/MM/YYYY")
    let time = moment().format("hh:mm A")

    let allInfo = { date,time, PayTrxId, PaymentIdUser, TotalAmount: paymentInfo[0], AccountNumber: PayNumber, payType: selectedBank, image: selectedImage, status: "pending", UserName: roles?.name, UserEmail: roles?.email, }
    // console.log(allInfo)

    fetch("https://test.e-cash-id.com/userPaymentRequest", {
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



  return (
    <div className="bg-white  min-h-screen pb-[40px] text-white px-4">
      <div className="ConfirmedPayment py-24 md:py-20 w-full md:w-[500px] mx-auto">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Step 1 */}
          <h2 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2">Step 1: Copy Beneficiary Account</h2>

          {/* ========================================== */}
          {/* Website Payment Information */}
          {/* ========================================== */}
          <div className="space-y-3">
            {BankInformationAll?.map((WebPayment, idx) => {
              const isSelected = selectedBank === WebPayment?.BankName;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedBank(WebPayment?.BankName);
                    setSelectedImage(WebPayment?.image);
                  }}
                  className={`cursor-pointer p-4 rounded-lg shadow-md transition-all duration-200 ${isSelected ? "bg-black" : "bg-white"
                    } flex justify-between items-center`}
                >
                  <h3 className={`font-medium ${isSelected ? "text-white" : "text-gray-800"}`}>
                    Website Payment Chanel
                  </h3>
                  <h4 className={`text-right font-semibold text-sm ${isSelected ? "text-white" : "text-black"}`}>
                    {WebPayment?.BankName}
                    <br />
                    <span className={`text-xs ${isSelected ? "text-green-400" : "text-green-800"}`}>
                      {WebPayment?.BankNumber}
                    </span>
                  </h4>
                </div>
              );
            })}
          </div>
          {/* ========================================== */}
          {/* Select Recharge Amount */}
          {/* ========================================== */}
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-gray-300">Recharge Amount</h3>
            <h4 className="text-lg font-semibold text-white">৳ {paymentInfo[0]}</h4>
          </div>

          {/* ========================================== */}
          {/* Select Payment Type Image See */}
          {/* ========================================== */}
          <h2 className="text-xl font-bold text-green-500 border-b border-gray-200 pb-2 mb-4">
            Step 2: Please verify the selected information
          </h2>

          {selectedBank && selectedImage ? (
            <div className="w-full mt-3 rounded-lg overflow-hidden border border-gray-300 shadow-md">
              <img
                src={selectedImage}
                alt="Selected Bank"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="text-sm text-center mt-2 text-gray-600">
                You have selected: <span className="font-semibold text-black">{selectedBank}</span>
              </p>
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md text-sm font-medium">
              Please select a bank from the list above
            </div>
          )}

          {/* ========================================== */}
          {/* My Final Information
          {/* ========================================== */}

          <div className="bg-gray-900 rounded-lg p-4 space-y-4">

            <h2 className="text-sm font-medium text-gray-300">Your Payment Provider Number</h2>
            <input
              required
              type="number"
              name="numbers"
              className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Payment provide number"
            />

            {/* TxnID Input */}
            {/* ====================================== */}
            <h2 className="text-sm font-medium text-gray-300 mt-4">Provide Trx Id</h2>
            <input
              type="text"
              name="PayTransactionsId"
              required
              placeholder="Enter 8-digit TxnID"
              className="w-full mt-4 bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Error Show */}
            {/* {error && (
                <p className="text-red-400 font-medium mt-2">{error}</p>
              )} */}

            {/* Submit Button */}
            {/* ====================================== */}
            <button
              type="submit"
              disabled={btnDisable}
              className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50`}
            >
              Confirm Payment
            </button>

          </div>
        </form>
      </div>
    </div>

  );
};

export default ConfirmePayment;