import React from 'react';
import { StyledForm, StyledTextField, StyledLoginButton } from '../../media/styledComponents/Components';

const LoginComponent = (props) => {

    return(
        <StyledForm
            styledProps={{
                width: '250px',
                margin: 'auto'
            }}
            onSubmit={props.handleSubmit}
            className='login-form'
            // noValidate
            autoComplete="off"
        >
            <label className='title-login-form'>Login</label>
            <div>
                <StyledTextField
                    inputRef={props.inputRef.phoneInput}
                    type="text"
                    name="phone"
                    label="Phone"
                    margin="dense"
                    variant="outlined"
                    required={true}
                />
            </div>
            <div>
                <StyledTextField
                    inputRef={props.inputRef.passwordInput}
                    type="password"
                    name="password"
                    label="Password"
                    margin="dense"
                    variant="outlined"
                    required={true}
                />
                {props.userDetail.showErr ? <div className='invalid_feedback'>Incorrect password or phone</div> : ''}
            </div>
            <StyledLoginButton
                variant="contained"
                color="primary"
                type="submit"
            >
                Login
            </StyledLoginButton>
        </StyledForm>
    );
};

export default LoginComponent;