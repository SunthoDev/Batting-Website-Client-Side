import React, { useContext } from 'react';
import "./Header.css"
import { Link, Navigate } from 'react-router-dom';
// import Logo from "../../../assets/logo.png"
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../Hook/useRole';

const Header = () => {

  let { user, logOutUser } = useContext(AuthContext)
  const [roles] = useRole()
  // console.log(roles)
  const ad = roles?.role === "admin"

  let handelLogOut = () => {
    logOutUser()
      .then(data => { })
      .then(error => { })
  }

  return (
    <div className="Role w-full fixed z-40 px-2 md:px-20 bg-white shadow-md flex justify-between items-center">
      <Link to="/">
        <img src="https://app.macvz.com/static/app/static/a/sa.png" alt="logo"
        className="w-[100px] h-[45px]" />
      </Link>

      <div className="flex items-center">
        {
          ad &&
          <Link to="/dashboardPlant">
            <button className="Dashboard text-black  border border-black rounded-md px-4 py-1 ml-2 transition-all duration-200">
              Dashboard
            </button>
          </Link>
        }

        {
          user ? (
            <div className="items-center flex">
              {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar md:mr-4 mr-2">
                <div className="w-10 rounded-full border-2 border-black">
                  <Link to="#">
                    <img src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png" alt="img" />
                  </Link>
                </div>
              </label> */}
              <button onClick={handelLogOut} className="loginBtn font-bold text-black py-1 rounded-md transition-all">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="singUp/0000" className="topmenu text-black mr-3 font-medium hover:underline">Sign Up</Link>
              <Link to="login" className="topmenu text-black font-medium hover:underline">Sign In</Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Header;