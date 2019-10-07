export default class Service {
    constructor() {
        this.AUTH_TOKEN_KEY = 'SERVICE_AUTH_TOKEN';
    }
    
    // Retrieve token from local storage
    getAuthToken() {
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }
}