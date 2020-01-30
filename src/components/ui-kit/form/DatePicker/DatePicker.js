import 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers';

// Date picker component
// Override Materialui date picker using an outlined input and moment js
const DatePicker = ({ label, onChange, variant = "inline", date = new Date(Date.now()) }) => {

    // Handle value change
    const handleDateChange = date => {
        onChange(date); // Update date in upper component
    };

    return (
        <KeyboardDatePicker
            disableToolbar
            variant={variant}
            label={label}
            value={date}
            onChange={handleDateChange}
            margin="normal"
            format="DD/MM/YYYY"
            id="date-picker-inline"
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            TextFieldComponent={(props) => <TextField  {...props} variant="outlined" />}
        />
    );
};
DatePicker.propTypes = {
    date: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(['inline', 'dialog', 'static'])
};
export default DatePicker;