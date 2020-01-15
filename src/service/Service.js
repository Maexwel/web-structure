import { LOCAL_STORAGE_KEYS } from '../util/LocalStorageManager';

export default class Service {

    // Retrieve token from local storage
    getAuthToken() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)); // parse the string containing the auth token
    }
}