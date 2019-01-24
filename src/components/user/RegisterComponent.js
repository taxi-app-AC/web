import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { ComponentLabel, StyledTextField, StyledGrid, CreateButton } from '../../media/styledComponents/Components';
import  LinearIndeterminate from '../../components/common/LinearIndeterminateComponent';
import {LabelColor} from "../../constants/Colors";

const RegisterComponent = (props) => {

    const active = [
        {
            value: 1,
            label: 'active',
        },
        {
            value: 0,
            label: 'deactive',
        }
    ];

    const category = [
        {
            value: 1,
            label: 'driver'
        },
        {
            value: 0,
            label: 'user'
        }
    ];

    return (
        <Fragment>
            {props.isLoaded ? <LinearIndeterminate/> : ''}
            <Grid container spacing={0}>
                <StyledGrid item xs={2}>
                    <ComponentLabel color={LabelColor}>Create User</ComponentLabel>
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <form
                        onSubmit={props.onSubmit}
                    >
                        <Grid container spacing={24}>
                            <Grid item xs={4}>
                                <StyledTextField
                                    id="user-name-input"
                                    label="Name*"
                                    name='name'
                                    type="text"
                                    error={props.inputs.name.error}
                                    helperText={props.inputs.name.errorMessage}
                                    onChange ={props.handleInputChange}
                                    autoComplete="current-name"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTextField
                                    id="user-phone-input"
                                    name='phone'
                                    label="Phone*"
                                    type="text"
                                    error={props.inputs.phone.error}
                                    helperText={props.inputs.phone.errorMessage}
                                    onChange={props.handleInputChange}
                                    autoComplete="current-phone"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTextField
                                    id="user-password-input"
                                    name='password'
                                    label="Password*"
                                    type="password"
                                    error={props.inputs.password.error}
                                    helperText={props.inputs.password.errorMessage}
                                    onChange={props.handleInputChange}
                                    autoComplete="current-password"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTextField
                                    id="user-select-active"
                                    select
                                    name='active'
                                    label="Active"
                                    helperText='Select active'
                                    value={props.userForm.active !== undefined ? props.userForm.active : 1}
                                    onChange={props.handleChangeActive}
                                    margin="normal"
                                >
                                    {active.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTextField
                                    id="user-select-category"
                                    select
                                    name='category'
                                    label="Category"
                                    helperText='Select category'
                                    value={props.userForm.category !== undefined ? props.userForm.category : 0}
                                    onChange={props.handleChangeCategory}
                                    margin="normal"
                                >
                                    {category.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            </Grid>
                        </Grid>
                        <CreateButton
                            variant="contained"
                            color="secondary"
                            type='submit'
                        >
                            Create
                        </CreateButton>
                    </form>
                </StyledGrid>
            </Grid>
        </Fragment>
    );
};

// const styles = theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//         width: 200,
//     },
//     dense: {
//         marginTop: 19,
//     },
//     menu: {
//         width: 200,
//     },
// });

export default RegisterComponent;
