import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { successColor } from '../../../../theme';
import clsx from 'clsx';

// Style def
const useStyle = makeStyles(theme => createStyles({
    icon: {
        padding: theme.spacing(1),
        color: theme.palette.common.white,
    },
    info: {
        background: theme.palette.primary.main,
    },
    error: {
        background: theme.palette.error.main,
    },
    success: {
        background: successColor,
    },
    text: {
        padding: theme.spacing(1),
    }
}));
// Custom Message display to user
// This component is used to give a feed back to user for some actions
const Message = ({ value, type = 'default' }) => {
    const classes = useStyle();

    // Factory of icon name based on the type provided
    const iconFactory = () => {
        switch (type) {
            case 'default':
                return 'info';
            case 'error':
                return 'error';
            case 'info':
                return 'info';
            case 'success':
                return 'check_circle';
            default:
                return 'info';
        }
    };

    return (
        <Paper>
            <Grid container justify="flex-start" alignItems="center">
                {/** ICON */}
                <Grid className={clsx(classes.icon, {
                    [classes.success]: type === 'success',
                    [classes.info]: type === 'info',
                    [classes.info]: type === 'default',
                    [classes.error]: type === 'error',
                })} item >
                    <Icon>{iconFactory()}</Icon>
                </Grid>
                {/** TEXT */}
                <Grid className={classes.text} item>
                    <Typography>{value}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
};
Message.propTypes = {
    value: PropTypes.string,
    type: PropTypes.oneOf(["success", "error", "info", "default"]),
};
export default Message;