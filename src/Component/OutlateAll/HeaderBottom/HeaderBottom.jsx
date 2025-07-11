import React, { useContext } from 'react';
import "./HeaderBottom.css"
import VIP from '../../../assets/AllImage/VIP.png';
import home from '../../../assets/AllImage/home.png';
import clame from '../../../assets/AllImage/clame.png';
import Icon7 from '../../../assets/AllImage/icon7.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../Hook/useRole';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const HeaderBottom = () => {

    let { user } = useContext(AuthContext);
    const [roles] = useRole()
    let navigate = useNavigate();
    // let location = useLocation();
    // const isActive = (path) => location.pathname === path;


    return (
        <div className="HeaderBottom fixed bottom-0 left-0 right-0 z-50 bg-white py-[4px]"
            style={{
                boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.08)" // 🔥 subtle top shadow
            }}
        >
            <ToastContainer />

            <div className="AllNavBottomOptions flex justify-around items-center px-4">

                {/* Home */}
                {/* <Link to="/" className={`NavBtn ${isActive("/") ? "active" : ""}`}> */}
                <Link to="/" className="NavBtn">
                    <div className="iconWrapper w-[40px] h-[40px] bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <img src={home} alt="Home" className="icon" />
                    </div>
                    <h4 className="label text-black text-[12px]  font-[600]">Home</h4>
                </Link>

                {/* Claim */}
                <div onClick={() => {
                    if (user && roles?.email && user?.email) {

                        navigate("/Climed")

                    } else {

                        Swal.fire({
                            title: 'Please Login Your Account ',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Login Now'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login")
                                    toast("Login Page Success")
                                }
                            })
                    }
                }} className={`NavBtn NavBtn cursor-pointer"}`}>
                    <div className="iconWrapper w-[40px] h-[40px] bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <img src={clame} alt="Claim" className="icon" />
                    </div>
                    <h4 className="label text-black text-[12px]  font-[600]">Clime</h4>
                </div>

                {/* VIP */}
                <div onClick={() => {
                    if (user && roles?.email && user?.email) {

                        navigate("/Vip")

                    } else {

                        Swal.fire({
                            title: 'Please Login Your Account ',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Login Now'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login")
                                    toast("Login Page Success")
                                }
                            })
                    }
                }} className="NavBtn cursor-pointer">
                    <div className="iconWrapper w-[40px] h-[40px] bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <img src={VIP} alt="VIP" className="icon" />
                    </div>
                    <h4 className="label text-black text-[12px]  font-[600]">Vip</h4>
                </div>

                {/* Main */}
                <div onClick={() => {
                    if (user && roles?.email && user?.email) {

                        navigate("/Profile")

                    } else {

                        Swal.fire({
                            title: 'Please Login Your Account ',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Login Now'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/login")
                                    toast("Login Page Success")
                                }
                            })
                    }

                }} className="NavBtn cursor-pointer">
                    <div className="iconWrapper w-[40px] h-[40px] bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <img src="https://app.macvz.com/static/app/static/tabbar/_tab_four.png" alt="Main" className="icon" />
                    </div>
                    <h4 className="label text-black text-[12px]  font-[600]">Profile</h4>
                </div>

            </div>
        </div>
    );
};

export default HeaderBottom;