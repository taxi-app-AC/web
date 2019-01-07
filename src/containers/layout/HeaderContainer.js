import React from 'react';

import HeaderComponent from '../../components/layout/HeaderCompanent';

export class HeaderContainer extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            nav: [
                {
                    label: 'Home',
                    url: '/',
                    active: 1
                },
                {
                    label: 'Users',
                    url: '/users',
                    active: 0
                },
                {
                    label: 'Requests',
                    url: '/requests',
                    active: 0
                }
            ],
            logout: {
                label: 'Logout',
                url: '/logout',
                active: 0
            }
        }
    }

    render() {
       return  <HeaderComponent nav={this.state.nav} logout={this.state.logout}></HeaderComponent>
    }
}