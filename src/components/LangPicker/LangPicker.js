import React, { useEffect, useState } from 'react';
import { LangManager, C } from '../../lang';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocalStorageManager from '../../util/LocalStorageManager';
import { updateSelectedLangAction } from '../../store/actions/langActions';
import { Menu, MenuItem, Button, ListItemText,Icon } from '@material-ui/core';

// Component used to define and change the selected lang
// This component initialize the default lang and will update the Redux store used for lang
const LangPicker = ({ selectedLang, data, translation, langToState }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    // Lang options
    const options = [
        { label: translation["FR_LANG"], value: C.LANG_FR },
        { label: translation["EN_LANG"], value: C.LANG_EN },
    ];

    // on init
    useEffect(() => {
        const storageManager = new LocalStorageManager();
        storageManager.getItem(storageManager.KEYS.LANG_DATA)
            .then(({ selectedLang }) => {
                if (data && selectedLang) {
                    langToState({ selectedLang }); // Redux set selectedLang
                    storageManager.setItem(storageManager.KEYS.LANG_DATA, selectedLang); // local storage
                } else {
                    langToState({ selectedLang: C.LANG_FR }); // Redux set selectedLang (default fr)
                    storageManager.setItem(storageManager.KEYS.LANG_DATA, C.LANG_FR); // local storage
                }
            }); // get lang data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Reaction to a change in the selectedLang
    useEffect(() => {
        const manager = new LangManager();
        const translation = manager.translate(selectedLang, data);
        langToState({ translation }); // Redux update translation
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLang])

    // Changing the selected lang
    const changeSelectedLang = (selected) => {
        langToState({ selectedLang: selected }); // Redux update selected lang
        const storageManager = new LocalStorageManager();
        storageManager.setItem(storageManager.KEYS.LANG_DATA, { selectedLang: selected }); // Local storage
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
                        onClick={event => changeSelectedLang(option.value)}
                    >
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
    data: state.lang.data, // Data from the lang file
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