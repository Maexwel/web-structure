import React, { useEffect } from 'react';
import { routes as C } from '../../../router/routes';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
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
    }
}));
// Base Page template of the application
const TopbarPage = (props) => {
    const { component: Component, path, name, displayText, viewToState, history } = props; // Component to inject
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    // Main menu's links
    const links = [
        {
            icon: 'TODO',
            ...C.APP_ROUTE
        }
    ];

    useEffect(() => {
        viewToState({ currentPage: { path, name, displayText } }); // set the current page (route = { path: '/', name: '/' })
        setValue(links.findIndex(l => l.name === name)); // set the tab value when navigation happen
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, name])

    // Handle the tab value change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Topbar tab">
                    {links.map(link => (
                        <TabLink
                            {...link}
                            key={link.name}
                            history={history}
                        />
                    ))}
                </Tabs>
            </AppBar>
            {/** Component injection */}
            <Box m={theme.spacing(0.8)}>
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
// Link displayed in the tabs (appBar)
const TabLink = ({ path, displayText, icon, name, history }) => {

    const navigationClicked = (path) => {
        history.push(path); // Redirect to "path"
    }

    return (
        <Tab
            label={displayText}
            onClick={() => navigationClicked(path)} />
    )
}