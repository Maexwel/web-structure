import React, { useState, useContext } from 'react';
import { C } from '../../lang';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSelectedLangAction } from '../../store/actions/langActions';
import { Menu, MenuItem, Button, ListItemText, Icon } from '@material-ui/core';
import { ServiceLocatorContext } from '../context';

// Component used to define and change the selected lang
// This component should be used inside of the LangProvider component
const LangPicker = ({ selectedLang, translation, langToState }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { localStorageManager } = useContext(ServiceLocatorContext);

    // Lang options
    const options = [
        { label: translation["FR_LANG"], value: C.LANG_FR },
        { label: translation["EN_LANG"], value: C.LANG_EN },
    ];

    // Changing the selected lang
    const changeSelectedLang = (selected) => {
        langToState({ selectedLang: selected }); // Redux update selected lang
        localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, { selectedLang: selected }); // Local storage
        handleClose(); // Close picker
    }

    // Get label to display
    const getLabel = (value) => {
        switch (value) {
            case C.LANG_FR:
                return translation["FR_LANG"];
            case C.LANG_EN:
                return translation["EN_LANG"];
            default: break;
        }
    }

    // Fermeture du menu de langue
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Triggered to open the menu
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="secondary"
                onClick={openMenu}
            >
                <span>{getLabel(selectedLang)}</span>
                <Icon>arrow_drop_down</Icon>
            </Button>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === selectedLang}
                        onClick={event => changeSelectedLang(option.value)}>
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

}
LangPicker.propTypes = {
    selectedLang: PropTypes.string,
    data: PropTypes.object,
    translation: PropTypes.object,
    langToState: PropTypes.func
}
// // // 
// Redux connexion
const mapStateToProps = state => ({
    selectedLang: state.lang.selectedLang, // Current location in the app
    translation: state.lang.translation, // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {
        langToState: (val) => {
            dispatch(
                updateSelectedLangAction(val) // Update the lang
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LangPicker);