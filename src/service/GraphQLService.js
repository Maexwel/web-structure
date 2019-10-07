import Service from "./Service";

export default class GraphQLService extends Service {
    constructor(client) {
        super();
        this.client = client; // client used to make requests (such as Apollo client)
    }
}