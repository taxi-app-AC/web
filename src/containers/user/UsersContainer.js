import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import UsersComponent from '../../components/user/UsersComponent';

export default class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {

        Axios.get(
            'http://localhost:3000/api/user',
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}
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
            return <div>Loading...</div>;
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
                Header: 'Active',
                accessor: 'active',
                Cell: props => (props.value == 1) ? 'active' : 'deactive'
            }, {
                Header: 'Driver',
                accessor: 'driver',
                Cell: props => (props.value == 1) ? 'driver' : 'user'
            }];

            return (
                <UsersComponent data={this.state.items.data} columns={columns}/>
            );
        }
    }
}