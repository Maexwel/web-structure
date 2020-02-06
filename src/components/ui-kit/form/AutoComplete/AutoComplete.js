import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, ClickAwayListener, Paper } from '@material-ui/core';

// Custom AutoComplete component
// This component is used to filter results based on option provided
// This component also display options
// It's an override of Material-ui components
const AutoComplete = ({ label, loading = false, suggestions = [], }) => {
    const [displayOptions, setDisplayOptions] = useState(false);
    return (
        <ClickAwayListener onClickAway={() => setDisplayOptions(true)}>
            <TextField onClick={() => setDisplayOptions(true)} />
            {/** Options provided from search query */}
            {displayOptions &&
                <Paper>
                    {suggestions.map((suggestion, key) => (
                        <div key={key}>{suggestion}</div>
                    ))}
                </Paper>}
        </ClickAwayListener>
    );
};
AutoComplete.propTypes = {
    label: PropTypes.string,
    loading: PropTypes.bool,
    suggestions: PropTypes.arrayOf(PropTypes.string),

};
export default AutoComplete;