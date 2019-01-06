import React, { Component } from "react";
import Axios from 'axios';
import { withRouter   } from 'react-router-dom';
import '../../media/css/Login.css';
import LoginComponent from '../../components/auth/LoginCompanent';
import PropTypes from 'prop-types';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showErr: false,
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm(props) {
        return props.userDetail.phone.length > 0 && props.userDetail.password.length > 0;
    }

    handleChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            showErr: false
        });
    };

    handleSubmit = async event => {

        event.preventDefault();

        try {

            const response = await
                Axios.post('http://localhost:3000/api/auth/login', {
                    phone: this.state.phone,
                    password: this.state.password,
                });
            
            if (response.data.data.auth) {
                let user = { token: response.data.data.token };
                localStorage.setItem('user', JSON.stringify(user));

                this.props.history.push("/");

            }

        } catch (error) {

            if(error.response.data.errors) {

                error.response.data.errors.map((val) => {

                    switch (val.status) {
                        case 1:
                            this.setState({
                                showErr: true
                            });
                            break;
                    }
                })
            }
        }
    };

    render() {
        return <LoginComponent
                    userDetail={this.state}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    validateForm={this.validateForm}
                />;
    }
}

LoginContainer.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    validateForm: PropTypes.func,
    userDetail: PropTypes.object,
};

export default withRouter(LoginContainer);