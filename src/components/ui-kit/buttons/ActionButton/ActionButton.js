import React from 'react';
import { Button, Tooltip, Icon, Fab, IconButton as MaterialIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

// Base button with theme color as background
// Override of the Button from material-ui
const ActionButton = (props) => {
    const { tip = '', type = 'default' } = props;

    // Render button based on his type
    const buttonFactory = () => {
        switch (type) {
            case "default":
                return <DefaultButton {...props} />
            case "fab":
                return <FabButton {...props} />
            case "icon":
                return <IconButton {...props} />
            default:
                return <DefaultButton {...props} />
        }
    };

    return (
        <Tooltip
            title={tip}
            placement="bottom">
            <div>
                {buttonFactory()}
            </div>
        </Tooltip>
    );
};
ActionButton.propTypes = {
    label: PropTypes.string,
    tip: PropTypes.string,
    icon: PropTypes.string, // Icon name
    type: PropTypes.oneOf(["default", "fab", "icon"]),
    color: PropTypes.oneOf(["primary", "secondary", "default"]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};
export default ActionButton;

// // //
// Default button (Contained button)
const DefaultButton = ({ label, color, icon, onClick, disabled }) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color={color}
            disabled={disabled}
        >
            {icon && <Icon>{icon}</Icon>}
            {label}
        </Button>
    );
};

// // //
// Floating Action Button
const FabButton = ({ icon, onClick, disabled }) => {
    return (
        <Fab
            disabled={disabled}
            onClick={onClick}>
            <Icon>
                {icon}
            </Icon>
        </Fab>
    );
};

// // //
// Icon button (button that is an icon)
const IconButton = ({ icon, color, onClick, disabled }) => {
    return (
        <MaterialIconButton
            disabled={disabled}
            onClick={onClick}
            color={color} >
            <Icon>
                {icon}
            </Icon>
        </MaterialIconButton>
    );
};