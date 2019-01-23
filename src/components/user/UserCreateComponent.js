import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { ComponentLabel, StyledTextField, StyledGrid } from '../../media/styledComponents/Components';
import {LabelColor} from "../../constants/Colors";

const UserCreateComponent = (props) => {

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
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <ComponentLabel color={LabelColor}>Create User</ComponentLabel>
            </Grid>
            <StyledGrid item xs={12}>
                <form noValidate autoComplete="off">
                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <StyledTextField
                                id="user-name-input"
                                label="name"
                                type="text"
                                autoComplete="current-name"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTextField
                                id="user-phone-input"
                                label="Phone"
                                type="password"
                                autoComplete="current-phone"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTextField
                                id="user-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTextField
                                id="user-select-active"
                                select
                                label="Active"
                                value={props.userForm.active !== undefined ? props.userForm.active : ''}
                                onChange={props.handleChangeActive}
                                helperText="Select Active"
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
                                label="Category"
                                value={props.userForm.category !== undefined ? props.userForm.category : ''}
                                onChange={props.handleChangeCategory}
                                helperText="Select Category"
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
                </form>
            </StyledGrid>
        </Grid>
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

export default UserCreateComponent;
