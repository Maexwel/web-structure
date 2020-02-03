import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MaterialTextField } from '@material-ui/core';

// Custom TextField component
// Override of Material Input Textfield
const TextField = ({ label, placeholder, onChange, name, disabled = false, value = '' }) => {

    // Handle user typing in textfield
    const handleChange = (e) => {
        const { target } = e;
        if (target) {
            const value = target.value;
            onChange(e, value); // Trigger upper component onChange
        }
    };

    return (
        <MaterialTextField
            variant="outlined"
            disabled={disabled}
            label={label}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};
TextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
};
export default TextField;