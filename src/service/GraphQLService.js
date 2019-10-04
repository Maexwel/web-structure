export default class GraphQLService {
    constructor(client) {
        this.client = client; // client used to make requests (such as Apollo client)
    }

    // Retrieve the authToken from the localStorage
    getAuthToken() {
        return localStorage.getItem("SERVICE_AUTH_TOKEN");
    }
}