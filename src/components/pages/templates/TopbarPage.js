import React, { useEffect } from 'react';
import clsx from 'clsx';
import { routes as C } from '../../../router/routes';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Box, Grid, Toolbar, IconButton, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateViewAction } from '../../../store/actions/viewActions';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(8),
        width: "100%"
    },
    link: {
        borderRadius: "0px",
        borderBottom: "2px",
    },
    linkSelected: {
        borderBottom: "2px solid",
        borderColor: theme.palette.secondary.main
    }
}));
// Base Page template of the application
const TopbarPage = (props) => {
    const { component: Component, path, name, displayText, viewToState, history, currentPage } = props; // Component to inject
    const classes = useStyles();
    const theme = useTheme();

    // Main menu's links
    const links = Object.keys(C).map(key => C[key])

    useEffect(() => {
        viewToState({ currentPage: { path, name, displayText } }); // set the current page (route = { path: '/', name: '/' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, name])

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start">
                        {currentPage ?
                            links.map(link => (
                                <TopbarLink
                                    key={link.name}
                                    {...link}
                                    isCurrent={currentPage.name === link.name}
                                    history={history} />
                            ))
                            : null}
                    </Grid>
                    <Grid
                        container
                        justify="flex-end"
                        direction="row">
                        <Grid item>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/** Component injection */}
            <Box m={theme.spacing(1.2)}>
                <Component {...props} />
            </Box>
        </div>
    );
}
// // // 
// Redux connexion
const mapStateToProps = state => ({
    currentPage: state.view.currentPage // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {
        viewToState: (val) => {
            dispatch(
                updateViewAction(val) // Update the view
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopbarPage));

// // //
// Link displayed in the topbar (appBar)
const TopbarLink = ({ path, displayText, icon, name, history, isCurrent }) => {
    const classes = useStyles();

    const navigationClicked = (path) => {
        history.push(path); // Redirect to "path"
    }

    return (
        <Grid
            item
            onClick={() => navigationClicked(path)} >
            <IconButton
                color="inherit"
                disableFocusRipple={true}
                className={clsx(classes.link, {
                    [classes.linkSelected]: isCurrent
                })}
            >
                {icon}
                <Typography component="h6" >
                    {displayText}
                </Typography>
            </IconButton>
        </Grid>
    )
}