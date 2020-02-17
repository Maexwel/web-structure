import React from 'react';
import { Button, Tooltip, Icon, Fab, IconButton as MaterialIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

// Base button with theme color as background
// Override of the Button from material-ui
const ActionButton = (props) => {
    const { className, tip = '', buttonType = 'default' } = props;

    // Render button based on his type
    const buttonFactory = () => {
        switch (buttonType) {
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
            <div
                className={className}>
                {buttonFactory()}
            </div>
        </Tooltip>
    );
};
ActionButton.propTypes = {
    label: PropTypes.string,
    tip: PropTypes.string,
    icon: PropTypes.string, // Icon name
    type: PropTypes.oneOf(["submit", "reset", "button"]),
    buttonType: PropTypes.oneOf(["default", "fab", "icon"]),
    color: PropTypes.oneOf(["primary", "secondary", "default", "inherit"]),
    variant: PropTypes.oneOf(["contained", "outlined", "text"]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
};
ActionButton.defaultProps = {
    variant: "contained",
    type: "button",
    buttonType: "default",
    tip: '',
};
export default ActionButton;

// // //
// Default button (Contained button)
const DefaultButton = ({ label, color, icon, onClick, disabled, variant, className, fullWidth }) => {
    return (
        <Button
            fullWidth={fullWidth}
            className={className}
            onClick={onClick}
            variant={variant}
            color={color}
            disabled={disabled}>
            {icon && <Icon>{icon}</Icon>}
            {label}
        </Button>
    );
};

// // //
// Floating Action Button
const FabButton = ({ icon, onClick, disabled, className }) => {
    return (
        <Fab
            className={className}
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
const IconButton = ({ icon, color, onClick, disabled, className }) => {
    return (
        <MaterialIconButton
            className={className}
            disabled={disabled}
            onClick={onClick}
            color={color} >
            <Icon>
                {icon}
            </Icon>
        </MaterialIconButton>
    );
};