import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, Checkbox, Radio } from '@material-ui/core';

// Style
// Style
const useStyles = makeStyles((theme) =>
    createStyles({
        label: {
            margin: theme.spacing(1),
        },
    })
);

// ComboBox component
// Display a dropdown list with a filter possibility
// The combobox can be Multiple or not
// Thanks to the great library https://react-select.com/home
const ComboBox = ({ update, multi = false, options = [], disabled = false, value = false, placeholder = '', label = '', maxHeight = 250 }) => {
    const appTheme = useTheme(); // get theme from material-ui
    const [selectedOption, setSelectedOption] = React.useState(); // Selected option when no value is provided
    const classes = useStyles();

    // Style def using react-select
    const styles = {
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            color: state.isSelected ? appTheme.palette.common.white : appTheme.palette.text.primary,
        }),
        control: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        })
    }
    // Handle select changes
    const handleChange = (selectedOption) => {
        try {
            if (selectedOption && selectedOption.value && selectedOption.label) {
                if (update) {
                    update(selectedOption); // Trigger selected option update for upper component
                }
                setSelectedOption(selectedOption); // update internal selected option
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <InputLabel className={classes.label}>{label}</InputLabel>
            <Select
                styles={styles}
                isMulti={multi}
                hideSelectedOptions={false}
                options={options}
                disabled={disabled}
                placeholder={placeholder}
                onChange={handleChange}
                closeMenuOnSelect={false}
                maxMenuHeight={maxHeight}
                value={value ? value : selectedOption}
                theme={theme => ({
                    ...theme, // use base theme
                    colors: {
                        ...theme.colors, // use base colors
                        primary25: appTheme.palette.grey[200], // input color
                        primary: appTheme.palette.primary.main, // selected color/focus color (for the control)
                        neutral50: appTheme.palette.text.hint, // input placeholder color
                        neutral30: appTheme.palette.grey[900], // input hover
                    }
                })}
                components={{
                    Option: Option
                }}
            />
        </div>

    );
};
ComboBox.propTypes = {
    multi: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Real value behind the label
        label: PropTypes.string, // Label displayed
    })), // Options should be formated for react-select library
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.shape({
            value: PropTypes.string, // Real value behind the label
            label: PropTypes.string, // Label displayed
        }),
        PropTypes.bool,
        PropTypes.array]), // value can be False | {label,value} | [{label,value}]
    placeholder: PropTypes.string,
    label: PropTypes.string,
    maxHeight: PropTypes.number, // Max height of the menu
    update: PropTypes.func,
};
export default ComboBox;

// // //
// Custom Option component
// Display radio when not multi and checkboxes when multi
// https://react-select.com/components#components
const Option = ({ isSelected, innerProps, label, isMulti }) => {
    return (
        <div {...innerProps}>
            <MenuItem selected={isSelected}>
                {isMulti ? <Checkbox checked={isSelected} /> : <Radio checked={isSelected} />}
                <InputLabel>{label}</InputLabel>
            </MenuItem>
        </div >
    );
};
Option.propTypes = {
    innerProps: PropTypes.object, // Base props
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isMulti: PropTypes.bool,
    isSelected: PropTypes.bool,
};