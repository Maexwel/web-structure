import Service from "./Service";

// Base module for REST Service class
// The REST Service class is used to call HTTP Web Services with or without auth
export default class RESTService extends Service {
    _uri; // Uri of the web service to call

    constructor(uri) {
        super();
        this.uri = uri; // URI used to make service calls
    }
}