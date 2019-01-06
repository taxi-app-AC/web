import React from 'react';

import {
    Switch,
    Route
} from 'react-router-dom';

import HomeContainer from './containers/home/HomeContainer';
import UsersContainer from './containers/user/UsersContainer';
import UserContainer from './containers/user/UserContainer';
import RequestsContainer from './containers/request/RequestsContainer';

const Routes = () => (
        <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/users' component={UsersContainer} />
            <Route path='/user/:id' component={UserContainer} />
            <Route path='/requests' component={RequestsContainer} />
        </Switch>
)

export default Routes