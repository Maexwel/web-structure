import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  ClickAwayListener, Paper, List, MenuItem, Popper, InputAdornment } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Loading,TextField } from '../../';

// Style def
const useStyles = makeStyles(theme => createStyles({
    suggestions: {
        zIndex: theme.zIndex.drawer + 1,
    }
}));
// Custom AutoComplete component
// This component is used to display loading animation while results are fetching
// This component also display the suggestions provided in a Popper
// It's an override of Material-ui components
const AutoComplete = ({ label, placeholder, onChange, onSelect, loading = false, suggestions = [], }) => {
    const classes = useStyles();
    // State
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputWidth, setInputWidth] = useState(0); // Width used to set for paper
    const [value, setValue] = useState('');
    // Ref
    const inputRef = React.useRef(null);

    // Update width when input ref changes
    useEffect(() => {
        setInputWidth(inputRef.current ? inputRef.current.offsetWidth : 0); // Update width
    }, [inputRef.currrent]);

    // Handle user typing in input
    // Should call upper component to update suggestions
    const handleChange = (e) => {
        const { target } = e;
        setValue(target.value);
        if (onChange) {
            onChange(e, target.value); // Call upper component function
        }
    };

    // Handle user select suggestion in the list
    const handleSelectSuggestion = (suggestion) => {
        if (onSelect) {
            onSelect(suggestion); // Trigger upper on select            
        }
        setValue(suggestion.label);
        setTimeout(() => {
            closeSuggestions(); // Close suggestions            
        }, 100);
    };

    // Handle focus on input
    // Options should be displayed
    const showSuggestions = (e) => {
        setAnchorEl(e.currentTarget); // Target will be the input         
        setTimeout(() => {
            setOpen(true); // stay open   
        }, 100);
    };

    // Handle click away from input
    // Close the poper with suggestions
    const closeSuggestions = () => {
        setOpen(false);
    };

    return (
        <div>
            {/** TEXT FIELD */}
            <TextField
                value={value}
                inputRef={inputRef}
                label={label}
                placeholder={placeholder}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{loading && <Loading size={25} />}</InputAdornment>
                }}
                onClick={showSuggestions} />
            {/** SUGGESTIONS */}
            {(!loading && suggestions.length > 0) &&
                <Popper
                    className={classes.suggestions}
                    open={open}
                    transition
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                >
                    <ClickAwayListener onClickAway={closeSuggestions}>
                        <Paper
                            style={{ width: inputWidth }}>
                            <List >
                                {suggestions.map((suggestion, key) => (
                                    <MenuItem key={key} onClick={(e) => handleSelectSuggestion(suggestion)}>{suggestion.label}</MenuItem>
                                ))}
                            </List>
                        </Paper>
                    </ClickAwayListener>
                </Popper>}
        </div>
    );
};
AutoComplete.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    })).isRequired, // Suggestions to display
};
export default AutoComplete;