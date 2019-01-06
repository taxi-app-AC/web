import React from 'react';

import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import HomeContainer from './containers/home/HomeContainer';
import UsersContainer from './containers/user/UsersContainer';
import UserContainer from './containers/user/UserContainer';
import RequestsContainer from './containers/request/RequestsContainer';
import LoginContainer from './containers/auth/LoginContainer';
import LogoutContainer from './containers/auth/LogoutContainer';

const PrivateRoute = ({ component: Component, ...rest }) => {

    let user = JSON.parse(localStorage.getItem('user'));
    let auth = false;

    if(user && user.hasOwnProperty('token')) {
        auth = true;
    }

    if(rest.path === '/login') {
        return (
            <Route {...rest} render={(props) => (

                auth ? <Redirect to='/'/>
                    : <LoginContainer {...props}/>
            )}/>
        );
    } else {
        return (
            <Route {...rest} render={(props) => (

                auth ? <Component {...props} />
                    : <Redirect to='/login'/>
            )}/>
        )
    }
};

const Routes = () => (
        <Switch>
            <PrivateRoute exact path='/' component={HomeContainer} />
            <PrivateRoute path='/users' component={UsersContainer} />
            <PrivateRoute path='/user/:id' component={UserContainer} />
            <PrivateRoute path='/requests' component={RequestsContainer} />
            <PrivateRoute path='/logout' component={LogoutContainer} />
            <PrivateRoute path='/login' component={LoginContainer} />
        </Switch>
)

export default Routes