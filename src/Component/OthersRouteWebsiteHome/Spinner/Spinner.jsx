import React, { useState } from 'react';
import "./Spinner.css"
import { Wheel } from 'react-custom-roulette';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../Hook/useRole';



const Spinner = () => {

  const [roles] = useRole()
  // console.log(roles)

  // =======================================================================================================
  // Admin Control Spinner Data get from Database
  // ==============================================
  // user data all find use tenStack query 
  const { data: AllSPinnerData = [], refetch} = useQuery({
    queryKey: ["WheelSpinnerAllWorkHere_SpinnerControlData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/WheelSpinnerAllWorkHere/SpinnerControlData");
      return res.json();
    },
  });
  let spinnerData = AllSPinnerData[0]
  let PaidSpinPrice = spinnerData?.Amount
  // console.log(AllSPinnerData)



  // =======================================================================================================
  //All Spinner Work Bellow Start
  // ==============================================

  //All Spinner Value Data , it is showing to on spinner
  // =========================================================
  const data = [
    { option: '10', style: { backgroundColor: '#EE4040' } },
    { option: '50', style: { backgroundColor: '#F0CF50' } },
    { option: '100', style: { backgroundColor: '#815CD1' } },
    { option: 'Laptop', style: { backgroundColor: '#3DA5E0' } },
    { option: '200', style: { backgroundColor: '#34A24F' } },
    { option: '500', style: { backgroundColor: '#F9AA1F' } },
    { option: '40', style: { backgroundColor: '#EC3F3F' } },
    { option: 'Smart Watch', style: { backgroundColor: '#FF9000' } },
  ];

  let x = 400; // এখানে তুমি চাইলে dynamic ভাবে value set করতে পারো (API, input, props etc)

  // Spinner Value set tro here 
  // ================================
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // When Click Spin button int that time, Received Spin value throw the bellow function
  // ========================================================================================
  const handleSpinClick = () => {
    // receiver spin value
    // =======================
    let newPrizeNumber;
    // ================================================================================
    // it is condition so that, user cant get his win price depended on spine count.
    // ================================================================================
    if (x === 50) {
      newPrizeNumber = data.findIndex(item => item.option === '500');
    } else if (x === 100) {
      newPrizeNumber = data.findIndex(item => item.option === 'Smart Watch');
    } else if (x === 300) {
      newPrizeNumber = data.findIndex(item => item.option === 'Laptop');
    } else {
      // if user not has 50/10/300 spin, then it will be random spine.
      // and random spine user not get ❌ 500 tk, Smart Watch, Laptop |
      // ========================================================================
      const filteredData = data.filter(item =>
        item.option !== '500' &&
        item.option !== 'Smart Watch' &&
        item.option !== 'Laptop'
      );

      // Random index from filteredData
      const randomItem = filteredData[Math.floor(Math.random() * filteredData.length)];

      // Main data এর ভিতরে ওই randomItem এর index খুঁজে বের করবো
      newPrizeNumber = data.findIndex(item => item.option === randomItem.option);
    }

    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    // console.log(newPrizeNumber)

    // first find prise value fro data length
    // ===============================================
    const prizeValue = data[newPrizeNumber].option;
    // If we are win Smart Watch or Laptop, then it will be not save to database and return us
    // ===========================================================================================
    if (prizeValue === "Smart Watch" || prizeValue === "Laptop") {
      console.log("return!!")
      return;
    }

    // Spin Amount Find
    // ================================
    let prizeAmount = data[newPrizeNumber].option;
    let amount = parseInt(prizeAmount);
    // console.log(amount)

    if (spinnerData?.SpineType === "Paid") {

      // ===============================
      // Paid Spin Data Work
      // ===============================

      // Update Spine Count of user
      // ==============================
      fetch(`http://localhost:5000/WheelSpinnerAllWorkHere/UpdateUserSpinCount/${roles?._id}`, {
        method: "PUT",
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          if (data.modifiedCount > 0) {
            // Spin Bonus Add User Balance
            // ============================================
            fetch(`http://localhost:5000/WheelSpinnerAllWorkHere/WinSpineBonusAdd/${roles?._id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({ amount })
            })
              .then(res => res.json())
              .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                  // Every Paid Spin Price cut from user balance 
                  // ============================================
                  fetch(`http://localhost:5000/WheelSpinnerAllWorkHere/PaidSpinCutBalanceOfUser/${roles?._id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json"
                    },
                    body: JSON.stringify({ PaidSpinPrice })
                  })
                    .then(res => res.json())
                    .then(data => {

                      // console.log(data)
                      refetch()

                    })
                }
              })
          }
        })

    } 
    else {
      // ===============================
      // Free Spin Data Work
      // ===============================

      // Update Spine Count of user
      // ==============================
      fetch(`http://localhost:5000/WheelSpinnerAllWorkHere/UpdateUserSpinCount/${roles?._id}`, {
        method: "PUT",
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          if (data.modifiedCount > 0) {
            // Spin Bonus Add User Balance
            // ============================================
            fetch(`http://localhost:5000/WheelSpinnerAllWorkHere/WinSpineBonusAdd/${roles?._id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({ amount })
            })
              .then(res => res.json())
              .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                  // Every Paid Spin Price cut from user balance 
                  // ============================================
                  fetch(`http://localhost:5000/WheelSpinnerAllWorkHere/UserUpdateFreeSpinStatus/${roles?._id}`, {
                    method: "PUT",
                  })
                    .then(res => res.json())
                    .then(data => {

                      console.log(data)
                      refetch()

                    })
                }
              })
          }
        })
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pt-[80px] pb-[80px]">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">🎯 Spin & Win</h2>

      <div className="shadow-xl p-4 rounded-[50%] bg-white">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          fontSize={17}
          onStopSpinning={() => {
            setMustSpin(false);
            alert(`🎉 You got: ${data[prizeNumber].option}`);
          }}
        />
      </div>

      {
        roles?.FreeSpine === "used" ?
          <button
            className="mt-10 px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300"
          >
            🎡 Try Tomorrow
          </button>
          :
          <button
            onClick={handleSpinClick}
            className="mt-10 px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300"
          >
            🎡 Spin Now
          </button>
      }

    </div >
  );
};

export default Spinner;
