import React, { Component } from "react";
import Axios from 'axios';
import { withRouter   } from 'react-router-dom';
import '../../media/css/Login.css';
import LoginComponent from '../../components/auth/LoginCompanent';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

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
            [event.target.name]: event.target.value,
            showErr: false
        });
    };

    handleSubmit = async event => {
console.log('hee')
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

                error.response.data.errors.map( val => {

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
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <LoginComponent
                        userDetail={this.state}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        validateForm={this.validateForm}
                    />
                </Grid>

            </Grid>
        );
    }
}

LoginContainer.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    validateForm: PropTypes.func,
    userDetail: PropTypes.object,
};

export default withRouter(LoginContainer);