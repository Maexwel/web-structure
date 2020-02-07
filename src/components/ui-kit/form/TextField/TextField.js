import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MaterialTextField } from '@material-ui/core';

// Custom TextField component
// Override of Material Input Textfield
const TextField = (props) => {
    const { onChange, inputRef } = props;

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
            onChange={handleChange}
            ref={inputRef}
            {...props}
        />
    );
};
TextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    InputProps: PropTypes.object,
    inputRef: PropTypes.object, // To pass ref
};
TextField.defaultProps = {
    value: '',
    disabled: false,
    InputProps: null,
};
export default TextField;