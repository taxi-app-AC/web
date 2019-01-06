import React from 'react';
import {Button, FormControl, FormGroup} from "react-bootstrap";

const LoginComponent = (props) => {

    return (
        <div className="Login">
            <form onSubmit={props.handleSubmit}>
                <label className='title-login-form'>Authorization</label>
                <FormGroup controlId="phone" bsSize="large">
                    <FormControl
                        autoFocus
                        type="text"
                        placeholder='Phone'
                        value={props.userDetail.phone}
                        onChange={props.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormControl
                        placeholder='Password'
                        value={props.userDetail.password}
                        onChange={props.handleChange}
                        type="password"
                    />

                    {props.userDetail.showErr ? <div className='invalid_feedback'>Incorrect password or phone</div> : ''}
                </FormGroup>
                <Button
                    className='login-button'
                    block
                    bsSize="large"
                    disabled={!props.validateForm(props)}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginComponent;