import React from 'react';
import "./Main.css"
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderBottom from '../HeaderBottom/HeaderBottom';

const Main = () => {

    const location = useLocation();
    const routesWithHeaderBottom = ["/", "/Vip", "/Climed", "/Profile"];

    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            {/* {routesWithHeaderBottom.includes(location.pathname) && <HeaderBottom />} */}
            <HeaderBottom />

        </div>
    );
};

export default Main;