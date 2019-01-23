import React from 'react';
import Axios from 'axios';
import Switch from '@material-ui/core/Switch';

class SwitchComponent extends React.Component {

    state = {
        checked: this.props.checked ? true : false,
    };

    handleChange = async event => {

        let user = JSON.parse(localStorage.getItem('user'));

        try {

            let active = this.state.checked ? 0 : 1;

            const response = await
                Axios.get(
                    'http://localhost:3000/api/user/' + this.props.userId + '/' + active,
                    {
                        headers: {"Authorization" : `Bearer ${user.token}`}
                    });

            this.setState({ checked: response.data.data.active });

        } catch (error) {

            console.log(error)
        }

    };

    render() {
        return (
            <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                value="checked"
            />
        );
    }
}

export default SwitchComponent;
