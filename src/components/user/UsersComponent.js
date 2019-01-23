import React, { Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { LabelColor } from '../../constants/Colors';
import { ComponentLabel } from '../../media/styledComponents/Components';

const UsersComponent = (props) => {

    const { classes } = props;
    return (
      <Fragment>
          <Grid container spacing={0}>
              <Grid item xs={2}>
                  <ComponentLabel color={LabelColor}>Users</ComponentLabel>
                  <Fab
                      onClick={props.handleClickFab}
                      color="secondary"
                      aria-label="Add"
                      className={classes.fab}
                      size='small'
                  >
                      <AddIcon />
                  </Fab>
              </Grid>
          </Grid>
          <ReactTable data={props.data} columns={props.columns} getTrProps={props.getTrProps}/>;
      </Fragment>
  );
};

const styles = theme => ({
    fab: {
        margin: '20px 0px 30px 20px',
    }
});

UsersComponent.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    handleClickFab: PropTypes.func.isRequired
};

export default withStyles(styles)(UsersComponent);
