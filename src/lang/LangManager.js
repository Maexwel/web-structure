export default class LangManager {

    // translation function
    // This will return a JSON translation using the right selectedLang
    translate = (selectedLang = 'fr', data = {}) => {
        const translated = {};
        if (data && selectedLang) {
            Object.keys(data).forEach(key => {
                const translation = data[key][selectedLang] ? data[key][selectedLang] : 'No translation found'; // handle error lang selected
                translated[key] = translation;
            });
        }
        return translated;
    }
}