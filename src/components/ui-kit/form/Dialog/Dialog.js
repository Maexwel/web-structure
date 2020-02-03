import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as MaterialDialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';

// Custom Dialog component
// The dialog should contain a header, a body (that is a component) and a footer with actions possibility
// Override of Material Dialog
const Dialog = ({ isOpen, toggle, title, children, actions = [] }) => {

    return (
        <MaterialDialog
            open={isOpen}
            onClose={toggle}>
            {/** HEAD */}
            <DialogTitle>{title}</DialogTitle>
            {/** BODY */}
            <DialogContent>
                {children}
            </DialogContent>
            {/** FOOTER */}
            {actions.length > 0 &&
                <DialogActions>
                    {actions.map((action, i) => (
                        <div key={i}>{action}</div>
                    ))}
                </DialogActions>}
        </MaterialDialog>
    );
};
Dialog.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node, // Children is the body of the Dialog.
    actions: PropTypes.arrayOf(PropTypes.node), // actions that are displayed on the footer
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};
export default Dialog;