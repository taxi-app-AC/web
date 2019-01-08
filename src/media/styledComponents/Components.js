import styled from "styled-components";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Header

export const StyledLink = styled(Link)`
    color: white
    &:hover {
        color: white;
        text-decoration: none;
    }
`;

// Login Form

export const StyledForm = styled.form`
    width: ${props => props.styledProps.width || '100%'};
    margin: ${props => props.styledProps.margin || '0'};
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const StyledLoginButton = styled(Button)`
    width: 100%;
    margin-top: 10px !important;
`;
