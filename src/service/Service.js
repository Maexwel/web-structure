export default class Service {
    constructor() {
        this.AUTH_TOKEN_KEY = 'SERVICE_AUTH_TOKEN_KEY';
    }
    
    // Retrieve token from local storage
    getAuthToken() {
        return JSON.parse(localStorage.getItem(this.AUTH_TOKEN_KEY)); // parse the string containing the auth token
    }
}