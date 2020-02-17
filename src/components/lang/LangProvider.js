import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSelectedLangAction } from '../../store/actions/langActions';
import { ServiceLocatorContext } from '../context';
import { C } from '../../lang';

// Provider for lang implementation in redux
// This component should be at the highest level of the app (index.js)
// It provide a translation of the texts of the website
const LangProvider = ({ selectedLang, data, langToState, children }) => {
    const { localStorageManager, langManager } = useContext(ServiceLocatorContext);

    // on init
    useEffect(() => {
        localStorageManager.getItem(localStorageManager.KEYS.LANG_DATA)
            .then(({ selectedLang }) => {
                if (data && selectedLang) {
                    langToState({ selectedLang }); // Redux set selectedLang
                    localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, selectedLang); // local storage
                } else {
                    langToState({ selectedLang: C.LANG_FR }); // Redux set selectedLang (default fr)
                    localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, C.LANG_FR); // local storage
                }
            })
            .catch((err) => {
                // Error is thrown, there is no items in local storage
                langToState({ selectedLang: C.LANG_FR }); // Redux set selectedLang (default fr)
                localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, C.LANG_FR); // local storage
            }); // get lang data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reaction to a change in the selectedLang
    useEffect(() => {
        const translation = langManager.translate(selectedLang, data); // translate to selected lang
        langToState({ translation }); // Redux update translation
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLang]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
};
LangProvider.propTypes = {
    selectedLang: PropTypes.string,
    translation: PropTypes.object,
    langToState: PropTypes.func,
    children: PropTypes.node,
}
// // // 
// Redux connexion
const mapStateToProps = state => ({
    selectedLang: state.lang.selectedLang, // Current location in the app
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
export default connect(mapStateToProps, mapDispatchToProps)(LangProvider);