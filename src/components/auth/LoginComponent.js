import React from 'react';
import { StyledForm, StyledTextField, StyledLoginButton } from '../../media/styledComponents/Components';

const LoginComponent = (props) => {

    let StyledFormProps = {
      width: '250px',
      margin: 'auto'
    };

   return(
       <StyledForm
           styledProps={StyledFormProps}
           onSubmit={props.handleSubmit}
           className='login-form'
           noValidate
           autoComplete="off"
       >
           <label className='title-login-form'>Authorization</label>
           <div>
               <StyledTextField
                   value={props.inputsValue.phone}
                   onChange={props.handleChange}
                   name="phone"
                   label="Phone"
                   margin="dense"
                   variant="outlined"
               />
           </div>
           <div>
               <StyledTextField
                   value={props.inputsValue.password}
                   onChange={props.handleChange}
                   type="password"
                   name="password"
                   label="Password"
                   margin="dense"
                   variant="outlined"
               />
               {props.userDetail.showErr ? <div className='invalid_feedback'>Incorrect password or phone</div> : ''}
           </div>
           <StyledLoginButton
               disabled={!props.validateForm(props.inputsValue)}
               variant="contained"
               color="primary"
               type="submit"
           >Login</StyledLoginButton>
       </StyledForm>
   )

    // return (
    //     <div className="Login">
    //         <form onSubmit={props.handleSubmit}>
    //             <label className='title-login-form'>Authorization</label>
    //             <FormGroup controlId="phone" bsSize="large">
    //                 <FormControl
    //                     autoFocus
    //                     type="text"
    //                     placeholder='Phone'
    //                     value={props.userDetail.phone}
    //                     onChange={props.handleChange}
    //                 />
    //             </FormGroup>
    //             <FormGroup controlId="password" bsSize="large">
    //                 <FormControl
    //                     placeholder='Password'
    //                     value={props.userDetail.password}
    //                     onChange={props.handleChange}
    //                     type="password"
    //                 />
    //
    //                 {props.userDetail.showErr ? <div className='invalid_feedback'>Incorrect password or phone</div> : ''}
    //             </FormGroup>
    //             <Button
    //                 className='login-button'
    //                 block
    //                 bsSize="large"
    //                 disabled={!props.validateForm(props)}
    //                 type="submit"
    //             >
    //                 Login
    //             </Button>
    //         </form>
    //     </div>
    // );
};

export default LoginComponent;