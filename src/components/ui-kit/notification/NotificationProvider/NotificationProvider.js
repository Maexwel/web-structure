import React, { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { IconButton, Icon, Card, CardActions, Collapse, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// Style
const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            maxWidth: 400,
            minWidth: 344,
        },
        title: {
            fontWeight: 'bold',
        },
        error: {

        },
        success: {

        },
        info: {

        },
        default: {

        },
        actionRoot: {
            padding: '8px 8px 8px 16px',
        },
        action: {
            margin: 0,
        },
        icons: {
            marginLeft: 'auto',
        },
        expand: {
            padding: '8px 8px',
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        collapse: {
            padding: theme.spacing(2),
            display: 'flex',
            flexWrap: 'wrap'
        },
        checkIcon: {
            fontSize: 20,
            color: '#b3b3b3',
            paddingRight: 4,
        },
        button: {
            padding: 0,
            textTransform: 'none',
        },
    })
);

// Custom SnackbarProvider used to provide a close button to all notifications
// This is related to "prevent duplicate section" here : https://iamhosseindhv.com/notistack/demos#material-props 
// Thanks to notistack
const NotificationProvider = ({ children }) => {

    return (
        <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ horizontal: "right", vertical: 'bottom' }}
            autoHideDuration={10000}
            content={
                (key, message) => (<div><SnackMessage key={key} id={key} title={message.title} content={message.content} /></div>)
            }>
            {/** Render children */}
            {children}
        </SnackbarProvider>
    );
};
NotificationProvider.propTypes = {
    children: PropTypes.node,
};
export default NotificationProvider;

// // //
// Custom SnackMessage. Thanks to https://github.com/iamhosseindhv/notistack/issues/120
const SnackMessage = ({ title, content, id, variant = 'default' }) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    // Expand the content of the snack bar on expand clicked
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Close the snack bar on dismiss clicked
    const handleDismiss = () => {
        closeSnackbar(id);
    };

    return (
        <Card className={classes.card}>
            <CardActions className={clsx(classes.actionRoot, classes.action)}>
                <Typography className={classes.title}>{title}</Typography>
                <div className={classes.icons}>
                    <IconButton
                        aria-label="Show more"
                        className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
                        onClick={handleExpandClick}
                    >
                        <Icon >expand_more</Icon>
                    </IconButton>
                    <IconButton className={classes.expand} onClick={handleDismiss}>
                        <Icon >close</Icon>
                    </IconButton>
                </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" mountOnEnter unmountOnExit>
                <Paper className={classes.collapse}>
                    <Typography gutterBottom>{content}</Typography>
                </Paper>
            </Collapse>
        </Card >
    );
}
SnackMessage.propTypes = {
    title: PropTypes.string, // title of the snack
    content: PropTypes.string, // Content of the snack
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Id of the snack
    variant: PropTypes.oneOf(['info', 'error', 'default', 'success']), // Variant of the snack message (color of the header)
}