import React, { useState } from 'react';
import "./Spinner.css"
import { Wheel } from 'react-custom-roulette';

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

const Spinner = () => {

  let x = 50; // এখানে তুমি চাইলে dynamic ভাবে value set করতে পারো (API, input, props etc)

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    let newPrizeNumber;
    // it is condition so that, user cant get his win price depended on spine count.
    if (x === 50) {
      newPrizeNumber = data.findIndex(item => item.option === '500');
    } else if (x === 100) {
      newPrizeNumber = data.findIndex(item => item.option === 'Smart Watch');
    } else if (x === 300) {
      newPrizeNumber = data.findIndex(item => item.option === 'Laptop');
    } else {
      newPrizeNumber = Math.floor(Math.random() * data.length);
    }

    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
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

      <button
        onClick={handleSpinClick}
        className="mt-10 px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300"
      >
        🎡 Spin Now
      </button>
    </div>
  );
};

export default Spinner;
