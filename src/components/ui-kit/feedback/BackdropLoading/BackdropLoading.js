import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Grid, Typography } from '@material-ui/core';
import { Loading } from '../Loading';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        zIndex: theme.zIndex.drawer + 1, // zIndex over everything
    },
    text: {
        color: theme.palette.common.white,
    }
})
);
// Complete backdrop component that render a loading animation
// Override of base Backdrop to display loading animation on whole screen while loading a lot of data
const BackdropLoading = ({ open = false, message = '' }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.root} open={open}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item><Typography className={classes.text} component="h5" variant="h6">{message}</Typography></Grid>
                <Grid item><Loading /></Grid>
            </Grid>
        </Backdrop>
    );
};
BackdropLoading.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
};
export default BackdropLoading;