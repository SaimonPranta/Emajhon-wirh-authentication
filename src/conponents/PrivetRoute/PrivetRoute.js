import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const PrivetRoute = ({ children }) => {
    const [userContainer, setUserContainer] = useContext(userContext)
    const location = useLocation();

    return userContainer.email ? children : <Navigate to='/login'  state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;