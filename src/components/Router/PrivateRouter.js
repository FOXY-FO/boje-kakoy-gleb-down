import React from 'react';
import {useSelector} from "react-redux";
import {getIsAuth} from "../../Redux/auth-selectors";
import {Redirect, Route} from "react-router-dom";

export const PrivateRouter = ({component: Component, ...props}) => {
    const isAuth = useSelector(getIsAuth);
    return <Route {...props} component={(props) => {
        return isAuth ? <Component {...props}/> : <Redirect to={"/login"}/>
    }}/>
}