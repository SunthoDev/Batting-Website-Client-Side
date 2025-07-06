import React, { useContext } from 'react';
import useRole from './useRole';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Component/AuthencationAll/AuthProvider/AuthProvider';

const AdminRoute = ({children}) => {

    const [roles]=useRole()
    const ad= roles.role === "admin"
    let {user,loading}=useContext(AuthContext)
    let location=useLocation()



    if (ad && loading) {
       return <progress className="progress w-56"></progress>
    }

    if (user && ad) {
        return children
    }

    return <Navigate state={{from:location}} to="/"></Navigate>

};

export default AdminRoute;