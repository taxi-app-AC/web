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
        };
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

    render() {
        const { err, isLoaded, items } = this.state;
        if (err) {
            return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
            return <LinearIndeterminate />;
        } else {

            const columns = [{
                id: 'userName',
                Header: 'User Name',
                accessor: 'name',
                Cell: props => <Link to={'/user/' + props.original._id}>{props.value}</Link>
            }, {
                id: 'userPhone',
                Header: 'Phone',
                accessor: 'phone',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                id: 'userActive',
                Header: 'Activity',
                accessor: 'active',
                Cell: props => {
                    return <SwitchComponent userId={props.original._id} checked={props.value} />;
                },
                // style: props => {return 'background: red'}
            }, {
                id: 'userDriver',
                Header: 'Driver',
                accessor: 'driver',
                Cell: props => (props.value === 1) ? 'driver' : 'user'
            }];

            return <UsersComponent data={items.data} columns={columns} getTrProps={this.getTrProps}/>;
        }
    }
}

// UsersContainer.propTypes = {
//     data: PropTypes.object.isRequired,
//     columns: PropTypes.object.isRequired
// };

export default UsersContainer;