import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Auth component used to wrap base Pages
// This component is there to redirect user to login page if auth doesn't match (token not there in most cases)
// Toggle the isAuth state to make redirection to login page
const Auth = ({ loginPath, children, isAuth = true, history }) => {

    // use effect to redirect if not logged in
    useEffect(() => {
        if (!isAuth) {
            history.push(loginPath); // Redirect to login page
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, loginPath]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};
Auth.propTypes = {
    loginPath: PropTypes.string.isRequired, // Login path to login page in the app
    isAuth: PropTypes.bool, // If true, user is auth, else redirect to login page
    children: PropTypes.node, // Elements to render inside of the component
    history: PropTypes.object, // History object from react-router-dom
};
export default withRouter(Auth);