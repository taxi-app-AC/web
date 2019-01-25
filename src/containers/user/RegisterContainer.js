import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import RegisterComponent from '../../components/user/RegisterComponent';
import { changeActive, clearChanges, changeCategory } from '../../actions/userForm';

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: {
                error: false,
                errorMessage: ''
            },
            phone: {
                error: false,
                errorMessage: ''
            },
            password: {
                error: false,
                errorMessage: ''
            },
            isLoaded: false,
            openSnackbar: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    }

    handleChangeActive(e) {

        this.props.changeActive(e.target.value);
    }

    handleChangeCategory(e) {

        this.props.changeCategory(e.target.value);
    }

    handleInputChange(e) {

        let input = e.target.name;

        if (!e.target.value) {

            this.setState({
                [input]: {
                    error: true,
                    errorMessage: input + ' can\'t be empty'
                }
            });
        } else {
            this.setState({
                [input]: {
                    error: false,
                    errorMessage: ''
                }
            });
        }
    }

    handleCloseSnackbar(event, reason) {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });

        this.props.history.push("/users");
    };

    onSubmit(e) {

        e.preventDefault();

        this.setState({ isLoaded: true });

        let inputs = ['name', 'phone', 'password', 'active', 'category'];
        let errorsArr = {};
        let queryArr = {};

        inputs.map((input) => {
            let value = e.target.querySelector(`input[name=${input}]`).value;

            queryArr[input] = value;

            if (value === '') {
                errorsArr[input] = {
                        error: true,
                        errorMessage: input + ' can\'t be empty.'
                    }
            } else if (input === 'password' && value.length < 8) {
                errorsArr[input] = {
                    error: true,
                    errorMessage: input + ' must be at least 8 characters.'
                }
            }
        });

        if (Object.keys(errorsArr).length) {
            errorsArr['isLoaded'] = false;
            this.setState(errorsArr)

        } else {
            let mutation = `
                mutation {
                    register(
                        name: "${queryArr.name}",
                        phone: "${queryArr.phone}",
                        password: "${queryArr.password}",
                        active: ${queryArr.active},
                        driver: ${queryArr.category},
                        view: 1
                    ) {
                       username
                       phone 
                    }
                }
            `;

            Axios.post('http://localhost:3000/graphql', {
                query: mutation
            }).then( response => {

                this.setState({
                    openSnackbar: true,
                    isLoaded: false,
                })
            }).catch( error => {

                if(error.response.data.errors) {

                    error.response.data.errors.map( val => {

                        switch (val.status) {
                            case 9:
                                this.setState({
                                    phone: {
                                        error: true,
                                        errorMessage: val.msg
                                    },
                                    isLoaded: false
                                });
                                break;
                        }
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        this.props.clear();
    }

    render() {

        return (
            <RegisterComponent
                inputs={this.state}
                userForm={this.props.userForm}
                isLoaded={this.state.isLoaded}
                openSnackbar={this.state.openSnackbar}
                onSubmit={this.onSubmit}
                handleChangeActive={this.handleChangeActive}
                handleChangeCategory={this.handleChangeCategory}
                handleInputChange={this.handleInputChange}
                handleCloseSnackbar={this.handleCloseSnackbar}
            />
        );
    }
};

const mapStateToProps = (state) => {

    return {
        userForm: {
            active: state.userForm.active,
            category: state.userForm.category
        }
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        changeActive: (active) => {
            dispatch(changeActive(active))
        },
        changeCategory: (category) => {
            dispatch(changeCategory(category))
        },
        clear: () => {
            dispatch(clearChanges())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
