import styled from "styled-components";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


// Header

export const StyledHeaderLink = styled(Link)`
    color: white
    &:hover {
        color: white;
        text-decoration: none;
    }
`;

// Auth Form

export const StyledForm = styled.form`
    width: ${props => props.styledProps.width || undefined};
    margin: ${props => props.styledProps.margin || undefined};
`;

export const StyledLoginButton = styled(Button)`
    width: 100%;
    margin-top: 10px !important;
`;

export const StyledUserButton = styled(Button)`
    font-size: 10px !important;
    outline: none;
    &:focus {
        outline:none;
    }
`;

export const StyledButtonLink = styled(Link)`
     color: ${props => props.color || undefined};
     &:hover {
     color: ${props => props.color || undefined};
        text-decoration: none;
    }
`;

// Common Components

export const ComponentLabel = styled.label`
    margin-top: 20px;
    font-size: 30px;
    color: ${props => props.color || undefined}
`;

export const CreateButton = styled(Button)`
    margin-top: 30px !important;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const StyledGrid = styled(Grid)`
    margin: 0px 40px !important;
    text-align: left;
`;

// Register

