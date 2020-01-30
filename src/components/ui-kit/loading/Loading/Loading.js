import React from 'react';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

// Component used to display a loading animation
// This component is using material-ui loading animation
const Loading = ({ variant = 'primary' }) => {
    return (
        <CircularProgress color={variant} />
    );
};
Loading.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary"]), // Variant theme color
}
export default Loading;