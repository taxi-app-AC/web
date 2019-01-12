import React, { Component } from "react";
import Axios from 'axios';
import { withRouter   } from 'react-router-dom';
import '../../media/css/Login.css';
import LoginComponent from '../../components/auth/LoginComponent';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import LinearIndeterminate from '../../components/common/LinearIndeterminateComponent';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showErr: false,
            redirect: false,
            isLoaded: false
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

        event.preventDefault();

        this.setState({
            isLoaded: true
        });

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
                                showErr: true,
                                isLoaded: false
                            });
                            break;
                    }
                })
            }
        }
    };

    render() {
        return (
            <div>
                {this.state.isLoaded ? <LinearIndeterminate /> : ''}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '99vh' }}
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
            </div>
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