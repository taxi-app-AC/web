import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { Logout } from '../../actions/auth';

// const LogoutContainer = (props) => {
//
//     localStorage.removeItem('user');
//
//     console.log(props)
//
//     // this.props.logout();
//
//     return (
//         <Route render={() => (
//                 <Redirect to='/login'/>
//         )}/>
//     );
// };


class LogoutContainer extends React.Component {

    componentWillMount() {

        localStorage.removeItem('user');
        this.props.logout();
    }

    render () {
        return (
            <Route render={() => (
                <Redirect to='/login'/>
            )}/>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(Logout())
        }
    }
};

export default connect(null, mapDispatchToProps)(LogoutContainer);