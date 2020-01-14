import React, { createRef } from 'react';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import { IconButton, Icon } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        dismiss: {
            color: 'white'
        }
    })
);

// Custom SnackbarProvider used to provide a close button to all notifications
// This is related to "prevent duplicate section" here : https://iamhosseindhv.com/notistack/demos#material-props 
// Thanks to notistack
const NotificationProvider = ({ children }) => {
    const notistackRef = createRef(); // Ref of the notification provider
    const classes = useStyles();

    // Dismiss notification on click
    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key); // Close the snackbar for this notification
    }

    return (
        <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ horizontal: "right", vertical: 'bottom' }}
            autoHideDuration={10000}
            ref={notistackRef}
            action={(key) => (
                <IconButton
                    className={classes.dismiss}
                    onClick={onClickDismiss(key)}>
                    <Icon>close</Icon>
                </IconButton>
            )}>
            {/** Render children */}
            {children}
        </SnackbarProvider>
    );
};
NotificationProvider.propTypes = {
    children: PropTypes.node,
};
export default NotificationProvider;