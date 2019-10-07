import React, { useEffect } from 'react';
import { routes as C } from '../../../router/routes';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Grid, AppBar, Toolbar, List, ListItemText, ListItemIcon, ListItem, IconButton, Divider, CssBaseline } from '@material-ui/core';
import { AccountCircleTwoTone, VisibilityTwoTone, ChevronRight, ChevronLeft, Menu } from '@material-ui/icons';
import { connect } from 'react-redux';
import { updateViewAction } from '../../../store/actions/viewActions';
import { withRouter } from 'react-router-dom';
import { BorderedButton } from '../../ui-kit/buttons/BorderedButton'

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        selectedListItem: {
            color: theme.palette.secondary.main,
            background: "#EAEAEA"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        brand: {
            fontSize: "3em"
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(8),
            width: "100%"
        },
    }),
);
// Base Page template of the application
const Page = (props) => {
    const { component: Component, path, name, displayText, viewToState, currentPage, history } = props; // Component to inject

    useEffect(() => {
        viewToState({ currentPage: { path, name, displayText } }); // set the current page (route = { path: '/', name: '/' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, name])

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    // Main menu's links
    const links = [
        {
            icon: <AccountCircleTwoTone />,
            ...C.APP_ROUTE
        },
    ]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                color="primary"
            >
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container
                    >
                        <Grid item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <Menu />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <BorderedButton label="Login" onClick={() => { }} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <VisibilityTwoTone
                        className={classes.brand} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {currentPage ?
                        links.map((link, index) => (
                            <DrawerLink key={index} {...link} isCurrent={currentPage.name === link.name} history={history} />
                        )) : null}
                </List>
            </Drawer>
            <div className={classes.content}>
                {/** Component injection */}
                <Component {...props} />
            </div>
        </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));

// // //
// Link displayed in the drawer
const DrawerLink = ({ path, displayText, icon, isCurrent, history }) => {

    const navigationClicked = (path) => {
        history.push(path); // Redirect to "path"
    }

    const classes = useStyles();
    return (
        <ListItem className={clsx(null, { [classes.selectedListItem]: isCurrent })} onClick={() => navigationClicked(path)} button >
            <ListItemIcon className={clsx(null, { [classes.selectedListItem]: isCurrent })}>{icon}</ListItemIcon>
            <ListItemText className={clsx(null, { [classes.selectedListItem]: isCurrent })} primary={displayText} />
        </ListItem>
    )
}