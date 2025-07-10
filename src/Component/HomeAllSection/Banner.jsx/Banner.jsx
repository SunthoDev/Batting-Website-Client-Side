import React, { useEffect } from 'react';
import "./Banner.css"
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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

    // =======================================================
    // All Banner Data Get Here !
    // =======================================================
    const { data: AllBannerOfWebsite = [], refetch } = useQuery({
        queryKey: ["AdminDashboardAllWorkHere-AllBanner"],
        queryFn: async () => {
            const res = await fetch("https://test.e-cash-id.com/AdminDashboardAllWorkHere/AllBanner");
            return res.json();
        },
    });

    return (
        <div className="pt-[80px] md:pt-[80px] mx-4 ">
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
                    {
                        AllBannerOfWebsite?.map(banner => <SwiperSlide>
                            <div className="w-[100%] h-[148px] md:h-[220px] overflow-hidden rounded-[12px]">
                                <img className="w-[100%] h-[100%] rounded-[12px]" src={banner?.BannerImageUrl} alt="img" />
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;