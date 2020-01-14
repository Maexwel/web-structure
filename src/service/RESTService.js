import Service from "./Service";

export default class RESTService extends Service {
    _uri; // Uri of the web service to call

    constructor(uri) {
        super();
        this.uri = uri; // URI used to make service calls
    }
}