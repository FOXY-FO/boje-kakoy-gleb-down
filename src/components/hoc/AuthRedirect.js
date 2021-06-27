import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../Redux/auth-selectors";

export const withRedirect = Component => (props) => {
    const isAuth = useSelector(getIsAuth);
     return <Route path="/profile/:userId">
        { isAuth ?  <Component /> : <Redirect to="/login" />}
    </Route>
};
