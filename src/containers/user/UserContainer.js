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

        let user = JSON.parse(localStorage.getItem('user'));

        Axios.get(
            'http://localhost:3000/api/user/' + this.props.match.params.id,
            {
                headers: {"Authorization" : `Bearer ${user.token}`}
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