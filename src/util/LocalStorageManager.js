// Local storage module
// This module is used to manager LocalStorage using async call and stringification
export default class LocalStorageManager {
    constructor() {
        this.KEYS = {
            "MY_KEY": "key"
        }
    }

    // resolve a JSON item from the localstorage
    getItem = (key) => {
        return new Promise((resolve, reject) => {
            try {
                const stringified = localStorage.getItem(key);
                resolve(JSON.parse(stringified));
            } catch (err) {
                reject(err);
            }
        });
    }

    // Set an item in the localStorage
    // The item will be stored as a Stringify
    setItem = (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                const stringified = JSON.stringify(value);
                localStorage.setItem(key, stringified);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}