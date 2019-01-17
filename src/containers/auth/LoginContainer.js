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

        this.phoneInput = React.createRef();
        this.passwordInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async event => {

        event.preventDefault();

        console.log(this.phoneInput.current.value)

        this.setState({
            isLoaded: true
        });

        try {

            const response = await
                Axios.post('http://localhost:3000/api/auth/login', {
                    phone: this.phoneInput.current.value,
                    password: this.passwordInput.current.value,
                });

            if (response.data.data.auth) {

                let user = { token: response.data.data.token };
                let userLogin = response.data.data.token;
                localStorage.setItem('user', JSON.stringify(user));

                this.props.getLogin({
                    token: userLogin
                });

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
                            inputRef={{
                                phoneInput: this.phoneInput,
                                passwordInput: this.passwordInput
                            }}
                            handleSubmit={this.handleSubmit}
                        />
                    </Grid>

                </Grid>
            </div>
        );
    }
}

LoginContainer.propTypes = {
    handleSubmit: PropTypes.func,
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

    return {
        login: {
            token: state.login.token
        }
    }

};

export default connect(mapStateToProps, mapDispathcToProps)(withRouter(LoginContainer));