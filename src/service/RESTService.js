export default class RESTService {
    constructor(uri) {
        this.uri = uri; // URI used to make service calls
    }

    // Retrieve the authToken from the localStorage
    getAuthToken() {
        return localStorage.getItem("SERVICE_AUTH_TOKEN");
    }
}