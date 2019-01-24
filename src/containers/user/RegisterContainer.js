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
            isLoaded: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    onSubmit(e) {

        e.preventDefault();

        this.setState({
            isLoaded: true
        });

        let inputs = ['name', 'phone', 'password', 'active', 'category'];
        let errorsArr = {};
        let queryArr = {};

        inputs.map((input) => {
            let value = e.target.querySelector(`input[name=${input}]`).value;

            queryArr[input] = value;

            if (value === '') {
                errorsArr[input] = {
                        error: true,
                        errorMessage: input + ' can\'t be empty'
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
                console.log(response)
            }).catch( error => {
                console.log(error.response)
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
                handleChangeActive={this.handleChangeActive}
                handleChangeCategory={this.handleChangeCategory}
                handleInputChange={this.handleInputChange}
                onSubmit={this.onSubmit}
            />
        );
    }
};

const mapStateToProps = (state) => {

    console.log(state)
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
