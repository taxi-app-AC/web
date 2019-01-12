import React from 'react';
import {Redirect, Route} from "react-router-dom";

const LogoutContainer = (props) => {

    localStorage.removeItem('user');

    return (
        <Route render={() => (
                <Redirect to='/login'/>
        )}/>
    );
};

export default LogoutContainer;