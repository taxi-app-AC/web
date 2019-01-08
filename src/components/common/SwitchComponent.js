import React from 'react';
import Switch from '@material-ui/core/Switch';

class SwitchComponent extends React.Component {

    state = {
        checked: (this.props.checked) ? true : false,
    };

    handleChange = event => {
        this.setState({ checked: event.target.checked });
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