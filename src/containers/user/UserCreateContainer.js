import React from 'react';
import { connect } from 'react-redux';

import UserCreateComponent from '../../components/user/UserCreateComponent';
import { changeActive, clearChanges, changeCategory } from '../../actions/userForm';

class UserCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    handleChangeActive(e) {

        this.props.changeActive(e.target.value);
    }

    handleChangeCategory(e) {

        this.props.changeCategory(e.target.value);
    }

    componentWillUnmount() {
        this.props.clear();
    }

    render() {

        return (
            <UserCreateComponent
                userForm={this.props.userForm}
                handleChangeActive={this.handleChangeActive}
                handleChangeCategory={this.handleChangeCategory}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateContainer);
