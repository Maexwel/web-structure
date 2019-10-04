# Web structure project
## Goal
The goal of this project is to provide à High-level and customizable structure of React app.
Here are the main principles bootstraped :
* Base configuration (deployment, dev/acceptance/prod, hosting)
* Component structure
* Redux structure and configuration
* Routing structure
* UI base kit configured
* Remote service configuration (http)

## Table of content

- [Web structure project](#web-structure-project)
  - [Goal](#goal)
  - [Table of content](#table-of-content)
  - [Libraries](#libraries)
  - [Base files structure](#base-files-structure)
  - [Installation](#installation)
  - [Base configuration](#base-configuration)
  - [Components structure](#components-structure)
  - [Redux structure and configuration](#redux-structure-and-configuration)
  - [Routing structure](#routing-structure)
  - [UI base kit configured](#ui-base-kit-configured)
  - [Remote service configuration](#remote-service-configuration)

## Libraries
First of all, thanks to all of those libraries that this project is using :
* **react** (base library)
* **react-router-dom** (routing)
* **core-js** and **react-app-polyfill** (polyfills)
* **prop-types** (type checking)
* **redux** and **react-redux** (redux setup)
* **axios** (http requests)
* **@material-ui/core** and **@material-ui/styles** and **@material-ui/theme** (ui base kit)

## Base files structure
```
* root
    * public
        - index.html
        - web.config
        - robot.txt
        - ...png, .ico, .svg
    * src
        * assets
        * components
            * pages
                * template
                    - Page.js
            * ui-kit
        * router
            - routes.js
            - index.js
        * service
            - RESTservice.js
            - GraphQLService.js
            - ...Service.js
        * store 
            * actions
                - constants.js
                - ...Actions.js
            * reducers
                - reducer.js
                - ...Reducer.js
            - index.js
        * theme
            - theme.js
    - package.json
```

## Installation
```
    git clone https://github.com/Maexwel/web-structure.git <-destination-name->
    cd <-destination-name->
    git remote set-url origin <-you-git-remote-url->
    npm i
    npm start
```

## Base configuration
The base configuration of the app include :
 - env files injection (dev, production)
 - web.config configuration (https redirection and router redirection)
 - **index.js** configuration (entry point of the app)

## Components structure
The component structure is really simple : 

```
* components
    * pages
        * template
            - Page.js
        - index.js
    * ui-kit
```

The goal is to create all base ui-kit components inside the ui-kit folder.
For example, if you create a Button component, this button should be in **/components/ui-kit/Button**.
Like this you can have reusable ui components easily configured.
Be aware, those ui components should only be there for ui, they should'nt contain the logic of the app inside.

In the other hand, the **/components/pages** folder is used to provide a way to store all the pages of the application. The **/components/pages/template** folder must contain the base definition of a *Page* (containing the base of routing logic and Redux's store connexion).

## Redux structure and configuration
The redux structure and configuration is this one :
```
* store
    * actions
        - constants.js
        - ...Actions.js
    * reducers
        - reducer.js
        - ...Reducer.js
    - index.js
```

If you want to create a new Reducer, here are the steps :
1. Create the constants for you reducer in **/store/actions/constants.js**
2. Create an action file in **/store/actions** containing the actions
3. Create the reducer in **/store/reducers** using a switch for you created actions's constants
4. Include your reducer inside the **/store/reducers/reducer.js** file
5. Here you are, you can now use you redux store everywhere in your components by connecting theme !

## Routing structure
The routing structure provide a way to use different pages (default and with a path) but also a way to bind it with a PageTemplate and the Redux's store.
```
* router
  - routes.js
  - index.js
```

The **route.js** file is used to store all the route's constants.
Here is a what should contain the route.js file :

```
{
    "APP_ROUTE": {
        path: '/',
        name: 'APP'
    }
}
```

## UI base kit configured
The ui-kit is based on **material-ui** library that is awesome.
First, it include the *Design system* pardagim in wich we use a *theme* to store the base style of the app.

```
* theme
    - theme.js
```

The theme is injected using a *ThemeProvider* component.

Then, for the ui-kit, you just have to define your ui-components (button, input, ...) in the **/components/ui-kit** folder.

## Remote service configuration
Closely all web applications are making HTTP calls to web APIs (such as REST calls, SOAP calls, GraphQL calls).
It is important to build an efficient an reusable way to make those call.

The remote service structure is the following :
```
* service (folder for remote service)
    - RESTService.js
    - GraphQLService.js
    - ...Service.js
```

The goal is to provide a base Service class ([Javascript ES6 classes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)) (**/service/RESTservice.js** and **/service/GraphQLService**) that should be extendend by all new Services.
This is an implementation of the Service Design Pattern.
```
export default class ExampleService extends RESTService {
    constructor(){
        super('https://someurl.com/example'); // Define the uri
    }

    fetch(){
        return new Promise(async (resolve, reject) => {
            try{
                const {data} = await axios.get(super.uri, {headers: { Authorization : super.getAuthToken() }});
                resolve(data);
            }catch(err){
                reject(err);
            }
        });
    }

    create(){
        // AXIOS PROMISE
    }

    udpdate(){
        // AXIOS PROMISE
    }
    
    delete(){
        // AXIOS PROMISE
    }
}
```

RESTService class : 

Properties | Type | Description
--- | --- | ---
`uri` | *string* | Should be given in the constructor. The uri is the endpoint for all the API calls.
`getAuthToken` | *Function* | Is used to access the authToken for the remote calls.

GraphQLService class :

Properties | Type | Description
--- | --- | ---
`client` | *object* | Should be given in the constructor. The client is the GraphQL client provided by a library like **Apollo**. *You have to install your client provider if you use the GraphQLService*
`getAuthToken` | *Function* | Is used to access the authToken for the remote calls.