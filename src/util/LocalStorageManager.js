export const LOCAL_STORAGE_KEYS = {
    AUTH_TOKEN: "auth_token",
    LANG_DATA: "lang_data",
}; // Local storage keys constant

// Local storage module
// This module is used to manager LocalStorage using async call and stringification
export default class LocalStorageManager {
    constructor() {
        this.KEYS = LOCAL_STORAGE_KEYS; // Keys used in localStorage
    }

    // resolve a JSON item from the localstorage
    getItem = (key = '') => {
        return new Promise((resolve, reject) => {
            try {
                if (this._checkKey(key)) {
                    const stringified = localStorage.getItem(key);
                    resolve(JSON.parse(stringified)); // Parse the object to get it as pure JSON
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    // Set an item in the localStorage
    // The item will be stored as a Stringify
    setItem = (key = '', value) => {
        return new Promise((resolve, reject) => {
            try {
                if (this._checkKey(key)) {
                    const stringified = JSON.stringify(value); // Stringify the object to store it
                    localStorage.setItem(key, stringified);
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    // Private func used to check if the key provided is valid
    // The key is the key of a localStorage entry
    _checkKey = (key = '') => {
        try {
            if (Object.keys(this.KEYS).find(k => this.KEYS[k] === key)) { // Test if the key is in the keys defined
                return true; // Key is valid
            } else {
                throw new Error('Wrong key provided !'); // Throw custom error
            }
        } catch (err) {
            throw err; // throw to parent function
        }
    };
}