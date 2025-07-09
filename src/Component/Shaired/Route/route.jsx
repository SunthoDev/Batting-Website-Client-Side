import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../OutlateAll/Main/Main';
import Home from '../../Home/Home';
import Dashboard from '../../DashboardAll/Dashboard/Dashboard';
import Error from '../Error/Error';
import Login from '../../AuthoncationAll/Login/Login';
import SingUp from '../../AuthoncationAll/SingUp/SingUp';
import AdminSeeAllUser from '../../DashboardAll/AdminPanelDashboardAll/AdminSeeAllUser/AdminSeeAllUser';
import PrivateRoute from '../../AuthoncationAll/PrivateRoute/PrivateRoute';
import UserSubscriptionAllData from '../../DashboardAll/AdminPanelDashboardAll/UserSubscriptionAllData/UserSubscriptionAllData';
import UserAllWithdrawData from '../../DashboardAll/AdminPanelDashboardAll/UserAllWithdrawData/UserAllWithdrawData';
import UserAllRechargeData from '../../DashboardAll/AdminPanelDashboardAll/UserAllRechargeData/UserAllRechargeData';
import Profile from '../../Profile/Profile';
import Climed from '../../Climed/Climed';
import CustomerServices from '../../CustomerServices/CustomerServices';
import AboutUs from '../../AboutUs/AboutUs';
import Vip from '../../Vip/Vip';
import Spinner from '../../OthersRouteWebsiteHome/Spinner/Spinner';
import BuySubscriptionPlan from '../../HomeAllSection/AllSubscription/BuySubscriptionPlan/BuySubscriptionPlan';
import Recharge from '../../OthersRouteWebsiteHome/PaymentAllSystem/Recharge/Recharge';
import ConfirmePayment from '../../OthersRouteWebsiteHome/PaymentAllSystem/ConfirmePayment/ConfirmePayment';
import InventionUser from '../../OthersRouteWebsiteHome/InventionUser/InventionUser';
import Withdraw from '../../OthersRouteWebsiteHome/Withdraw/Withdraw';
import AllSubscription from '../../HomeAllSection/AllSubscription/AllSubscription';
import RechargeHistory from '../../OthersRouteWebsiteHome/PaymentAllSystem/RechargeHistory/RechargeHistory';
import AdminDashboard from '../../DashboardAll/AdminPanelDashboardAll/AdminDashboard/AdminDashboard';
import MyGift from '../../OthersRouteWebsiteHome/MyGift/MyGift';
import AllBankCard from '../../OthersRouteWebsiteHome/AllBankCard/AllBankCard';
import SingUpBonus from '../../DashboardAll/AdminPanelDashboardAll/SingUpBonus/SingUpBonus';


let route = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "singUp/:id",
                element: <SingUp></SingUp>
            },
            {
                path: "Recharge",
                element:  <PrivateRoute> <Recharge></Recharge></PrivateRoute>
            },
            {
                path: "RechargeHistory",
                element:  <PrivateRoute> <RechargeHistory></RechargeHistory></PrivateRoute>
            },
            {
                path: "ConfirmePayment",
                element: <PrivateRoute><ConfirmePayment></ConfirmePayment></PrivateRoute>
            },
            {
                path: "BuySubscriptionPlan/:id",
                element: <PrivateRoute> <BuySubscriptionPlan></BuySubscriptionPlan> </PrivateRoute>,
                loader:({params}) => fetch(`https://test.e-cash-id.com/AdminMaleSubscriptionAllOthers/SubscriptionsInformation/${params.id}`)
            },
            {
                path: "Withdraw",
                element: <PrivateRoute> <Withdraw></Withdraw> </PrivateRoute>
            },
            {
                path: "Profile",
                element: <PrivateRoute> <Profile></Profile> </PrivateRoute>
            },
            {
                path: "Climed",
                element: <PrivateRoute> <Climed></Climed> </PrivateRoute>
            },
            {
                path: "InventionUser",
                element: <PrivateRoute> <InventionUser></InventionUser> </PrivateRoute>
            },
            {
                path: "CustomerServices",
                element: <PrivateRoute> <CustomerServices></CustomerServices> </PrivateRoute>
            },
            {
                path: "AboutUs",
                element: <PrivateRoute> <AboutUs></AboutUs> </PrivateRoute>
            },
            {
                path: "Vip",
                element: <PrivateRoute> <Vip></Vip> </PrivateRoute>
            },
            {
                path: "Spinner",
                element: <PrivateRoute> <Spinner></Spinner> </PrivateRoute>
            },
            {
                path: "AllSubscription",
                element: <PrivateRoute> <AllSubscription></AllSubscription> </PrivateRoute>
            },
            {
                path: "MyGift",
                element: <PrivateRoute> <MyGift></MyGift> </PrivateRoute>
            },
            {
                path: "AllBankCard",
                element: <PrivateRoute> <AllBankCard></AllBankCard> </PrivateRoute>
            }
        ] 
    },

    // Admin Panel  Work
    {
        path: "dashboardPlant",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "AdminDashboard",
                element:  <PrivateRoute> <AdminDashboard></AdminDashboard></PrivateRoute>
            },
            {
                path: "AdminUser",
                element:  <PrivateRoute> <AdminSeeAllUser></AdminSeeAllUser></PrivateRoute>
            },
            {
                path: "userSubscription",
                element:  <PrivateRoute> <UserSubscriptionAllData></UserSubscriptionAllData></PrivateRoute>
            },
            {
                path: "UserAllWithdrawData",
                element: <PrivateRoute> <UserAllWithdrawData></UserAllWithdrawData> </PrivateRoute>
            },
            {
                path: "UserAllRechargeData",
                element: <PrivateRoute> <UserAllRechargeData></UserAllRechargeData> </PrivateRoute>
            },
            {
                path: "SingUpBonus",
                element: <PrivateRoute> <SingUpBonus></SingUpBonus> </PrivateRoute>
            },
           

        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }

])

export default route;