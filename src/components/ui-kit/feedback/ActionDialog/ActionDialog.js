import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ActionButton } from '../../';
import { isMobile } from 'react-device-detect';

// Style def
const useStyles = makeStyles((theme) =>
    createStyles({
        head: {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
        }
    })
);
// Custom ActionDialog component
// The dialog should contain a header, a body (that is a component) and a footer with actions
// This component is usefull for form dialog purpose or to show message
// Override of Material Dialog
const ActionDialog = ({ isOpen, toggle, title, children, onCancel, onSubmit, fullWidth = true, fullScreen = isMobile, action = true, cancelLabel = "", submitDisabled = false, submitLabel = "" }) => {
    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            scroll="paper"
            open={isOpen}
            onClose={toggle}>
            {/** HEAD */}
            <DialogTitle className={classes.head}>
                {title}
            </DialogTitle>
            {/** BODY */}
            <DialogContent dividers>
                {children}
            </DialogContent>
            {/** FOOTER (actions) */}
            {action &&
                <DialogActions>
                    <ActionButton label={cancelLabel} onClick={onCancel} />
                    <ActionButton disabled={submitDisabled} label={submitLabel} onClick={onSubmit} color="primary" />
                </DialogActions>}
        </Dialog>
    );
};
ActionDialog.propTypes = {
    children: PropTypes.node.isRequired, // Children is the body of the Dialog.
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    submitDisabled: PropTypes.bool,
    action: PropTypes.bool, // Determine if the dialog should display a footer with actions buttons
    fullScreen: PropTypes.bool,
    fullWidth: PropTypes.bool,
};
export default ActionDialog;