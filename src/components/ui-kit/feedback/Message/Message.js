import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@material-ui/core';

// Custom Message display to user
// This component is used to give a feed back to user for some actions
const Message = ({ value, type = 'default' }) => {
    return (
        <React.Fragment>
            <Icon></Icon>
        </React.Fragment>
    )
};
Message.propTypes = {
    value: PropTypes.string,
    type: PropTypes.oneOf(["success", "error", "info", "default"]),
};
export default Message;