import React from 'react';
import Axios from 'axios';
import UserComponent from '../../components/user/UserComponent';

export default class UserContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isLoaded: false,
            item: undefined
        }
    }

    componentDidMount() {
console.log();
        Axios.get(
            'http://localhost:3000/api/user/' + this.props.match.params.id,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}
            }
            )
            .then( (res) => {
                console.log(res)
            })
            .catch( (err) => {
                console.log(err)
            });
    }

    render() {
        return (
            <UserComponent />
        );
    }
}