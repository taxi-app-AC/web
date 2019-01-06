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
                    url: '/'
                },
                {
                    label: 'Users',
                    url: '/users'
                },
                {
                    label: 'Requests',
                    url: '/requests'
                }
            ],
            logout: {
                label: 'Logout',
                url: '/logout'
            }
        }
    }

    render() {
       return  <HeaderComponent nav={this.state.nav} logout={this.state.logout}></HeaderComponent>
    }
}