import React, { Component } from "react";
import Axios from 'axios';
import { withRouter   } from 'react-router-dom';
import '../../media/css/Login.css';
import LoginComponent from '../../components/auth/LoginComponent';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import LinearIndeterminate from '../../components/common/LinearIndeterminateComponent';
import { getLogin } from '../../actions/auth';
import { connect } from 'react-redux';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showErr: false,
            redirect: false,
            isLoaded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm(props) {

        console.log(props)
        return props.phone || props.password;
    }

    handleChange = event => {

        this.props.getLogin({
            [event.target.name]: event.target.value
        });

        this.setState({
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
                    phone: this.props.login.phone,
                    password: this.props.login.password,
                });

            if (response.data.data.auth) {

                let user = { token: response.data.data.token };
                let userLogin = response.data.data.token;
                localStorage.setItem('user', JSON.stringify(user));

                this.props.getLogin({
                    token: userLogin
                })

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
                            inputsValue={this.props.login}
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


const mapDispathcToProps = (dispatch) => {

    return {
        getLogin: (information) => {
            dispatch(getLogin(information))
        }
    }
};

const mapStateToProps = (state) => {

    console.log(state)

    if (state.user.hasOwnProperty('token')){
        return {
            login: {
                phone: state.user.phone,
                password: state.user.password,
                token: state.user.token
            }
        }
    } else {
        return {
            login: {
                phone: state.user.phone,
                password: state.user.password
            }
        }
    }
};

export default connect(mapStateToProps, mapDispathcToProps)(withRouter(LoginContainer));