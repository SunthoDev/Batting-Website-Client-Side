import React, { useEffect } from 'react';
import "./Banner.css"
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// =====================================================
// Import Swiper styles Start
// =====================================================
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css/effect-fade';
// =====================================================
// Import Swiper styles End
// =====================================================
import one from "../../../assets/SbImage/one.jpeg"
import two from "../../../assets/SbImage/two.jpeg"
import three from "../../../assets/SbImage/three.jpeg"
import four from "../../../assets/SbImage/four.jpeg"
import five from "../../../assets/SbImage/five.jpeg"




const Banner = () => {

    // ========================================
    // Page top thake open hoy
    const { pathname } = useLocation();
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // ========================================


    return (
        <div className="pt-[80px] md:pt-[54px] mx-4 ">
            <div className="slider">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    // dotte true click 
                    pagination={{
                        clickable: true,
                    }}
                    // sidebar click
                    // navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                            <img className="w-[100%] h-[100%] rounded-[12px]" src={one} alt="img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                            <img className="w-[100%] h-[100%] rounded-[12px]" src={two} alt="img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                            <img className="w-[100%] h-[100%] rounded-[12px]" src={three} alt="img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                            <img className="w-[100%] h-[100%] rounded-[12px]" src={four} alt="img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                            <img className="w-[100%] h-[100%] rounded-[12px]" src={five} alt="img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                            <img className="w-[100%] h-[100%] rounded-[12px]" src={one} alt="img" />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default Banner;