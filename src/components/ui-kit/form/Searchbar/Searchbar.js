import React from 'react';
import PropTypes from 'prop-types';
import { InputBase, Icon, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    icon: {
        color: theme.palette.grey[400],
    }
}));
// Custom Searchbar
// The base is material-ui components
const Searchbar = ({ onChange, placeholder = '' }) => {
    const classes = useStyles();

    // Handle change (user typing)
    const handleChange = event => {
        const { target } = event;
        if (target && target.value !== null) {
            onChange(event, target.value); // trigger upper onChange function
        }
    };

    return (
        <Paper
            component="form"
            className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={placeholder}
                onChange={handleChange} />
            <Icon className={classes.icon}>search</Icon>
        </Paper>
    )
};

Searchbar.propTypes = {
    onChange: PropTypes.func.isRequired, // (event, value) => {}
    placeholder: PropTypes.string,
};
export default Searchbar;
