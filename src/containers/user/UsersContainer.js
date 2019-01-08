import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from 'prop-types';
import LinearIndeterminate from '../../components/common/LinearIndeterminateComponent';
import UsersComponent from '../../components/user/UsersComponent';
import SwitchComponent from '../../components/common/SwitchComponent';

class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {

        let user = JSON.parse(localStorage.getItem('user'));

        Axios.get(
            'http://localhost:3000/api/user',
            {
                headers: {"Authorization" : `Bearer ${user.token}`}
            }
            ).then( (res) => {

                this.setState({
                    isLoaded: true,
                    items: res
                });
            })
            .catch((err) => {
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    }

    // handleChangeActivity() {
    //
    // }

    render() {
        const { err, isLoaded, items } = this.state;
        if (err) {
            return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
            return <LinearIndeterminate />;
        } else {

            const columns = [{
                Header: 'User Name',
                accessor: 'name', // String-based value accessors!
                Cell: props => <Link to={'/user/' + props.original._id}>{props.value}</Link>
            }, {
                Header: 'Phone',
                accessor: 'phone',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                Header: 'Activity',
                accessor: 'active',
                Cell: props => {
                    return <SwitchComponent checked={props.value} />;
                }
            }, {
                Header: 'Driver',
                accessor: 'driver',
                Cell: props => (props.value === 1) ? 'driver' : 'user'
            }];

            return <UsersComponent data={items.data} columns={columns}/>;
        }
    }
}

// UsersContainer.propTypes = {
//     data: PropTypes.object.isRequired,
//     columns: PropTypes.object.isRequired
// };

export default UsersContainer;