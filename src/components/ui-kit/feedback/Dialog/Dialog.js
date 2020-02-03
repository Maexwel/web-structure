import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as MaterialDialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Style def
const useStyles = makeStyles((theme) =>
    createStyles({
        head: {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
        }
    })
);
// Custom Dialog component
// The dialog should contain a header, a body (that is a component) and a footer with actions possibility
// Override of Material Dialog
const Dialog = ({ isOpen, toggle, title, children, actions = [] }) => {
    const classes = useStyles();

    return (
        <MaterialDialog
            scroll="paper"
            open={isOpen}
            onClose={toggle}
        >
            {/** HEAD */}
            <DialogTitle className={classes.head}>
                {title}
            </DialogTitle>
            {/** BODY */}
            <DialogContent dividers>
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