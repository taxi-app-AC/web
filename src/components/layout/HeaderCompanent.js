import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { StyledLink } from '../../media/styledComponents/Components';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function HeaderComponent(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                        <Grid container spacing={8}>

                            {
                                props.nav.map((value,i) => {
                                    return (
                                        <Grid item xs={1} key={i}>
                                            <StyledLink to={value.url}>{value.label}</StyledLink>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    <Button color="inherit">
                        <StyledLink to={props.logout.url}>{props.logout.label}</StyledLink>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

HeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderComponent);

