import Service from "./Service";

export default class RESTService extends Service {
    constructor(uri) {
        super();
        this.uri = uri; // URI used to make service calls
    }
}