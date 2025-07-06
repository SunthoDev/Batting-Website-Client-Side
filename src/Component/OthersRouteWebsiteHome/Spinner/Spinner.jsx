import React, { useRef } from "react";
import { gsap, Power1, Power4 } from "gsap";
import "./Spinner.css";

const amounts = [100, 200, 300, 400, 500, 600];
const colors = ["#ba4d4e", "#1592e8", "#14c187", "#fc7800", "#14c187", "#1592e8"];

const Spinner = () => {
  const wheelRef = useRef(null);
  const activeRef = useRef(null);
  const spinWheel = useRef(null);
  const indicator = useRef(null);
  const lastRotation = useRef(0);
  const totalSectors = 6;

  const spin = () => {
    const rand = Math.floor(Math.random() * totalSectors);
    const deg = 360 * 5 + (360 / totalSectors) * rand + (360 / totalSectors) / 2;

    indicator.current = gsap.timeline();
    spinWheel.current = gsap.timeline();

    indicator.current
      .to(activeRef.current, 0.13, {
        rotation: -10,
        transformOrigin: "65% 36%",
        ease: Power1.easeOut,
      })
      .to(activeRef.current, 0.13, {
        rotation: 3,
        ease: Power4.easeOut,
      });

    spinWheel.current.to(wheelRef.current, 5, {
      rotation: deg,
      transformOrigin: "50% 50%",
      ease: Power4.easeOut,
      onUpdate: () => {
        const current = Math.round(
          gsap.getProperty(wheelRef.current, "rotation")
        );
        const tolerance = current - lastRotation.current;

        if (Math.round(current) % (360 / totalSectors) <= tolerance) {
          if (
            indicator.current.progress() > 0.2 ||
            indicator.current.progress() === 0
          ) {
            indicator.current.play(0);
          }
        }
        lastRotation.current = current;
      },
      onComplete: () => {
        const selected = (totalSectors - rand) % totalSectors;
        alert(`\u09f3${amounts[selected]} টাকা পেয়েছেন!`);
      },
    });
  };

  return (
    <div className="text-center">
      <div className="luckywheel mx-auto my-10 w-[360px] h-[360px] relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 730 730"
          className="w-full h-full"
        >
          <g className="wheel" ref={wheelRef}>
            <circle className="frame" cx="365" cy="365" r="347.6" />
            <g className="sectors">
              {[...Array(6)].map((_, i) => {
                const rotate = i * (360 / 6);
                return (
                  <g key={i} transform={`rotate(${rotate}, 365, 365)`}>
                    <path
                      d="M365,365 L730,365 A365,365 0 0,1 365,730 Z"
                      fill={colors[i]}
                    />
                    <text
                      x="510"
                      y="370"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize="36"
                      fill="#fff"
                      transform="rotate(90, 510, 370)"
                    >
                      ৳{amounts[i]}
                    </text>
                  </g>
                );
              })}
            </g>
            <g className="middle">
              <circle cx="365" cy="365" r="54.5" fill="#fff" />
            </g>
          </g>
          <g className="active" ref={activeRef}>
            <path
              className="winIndicator"
              d="M711.9,157.4a38.4,38.4,0,0,0-66,1.8l-31.5,57.5a2.1,2.1,0,0,0,0,2.4,2.6,2.6,0,0,0,2.2,1.2l65.6-3.9a39.6,39.6,0,0,0,17.9-5.9A38.5,38.5,0,0,0,711.9,157.4Z"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
      <button
        onClick={() => spin()}
        className="mt-6 px-6 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
      >
        🎯 Spin
      </button>
    </div>
  );
};

export default Spinner;