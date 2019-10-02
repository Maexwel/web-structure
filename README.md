# Web structure project
## Goal
The goal of this project is to provide à High-level and customizable structure of React app.
Here are the main principles bootstraped :
* Component structure
* Redux structure and configuration
* Routing structure
* UI base kit configured
* Remote service configuration (http)

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
* [D]root
    * [D]public
        * index.html (entry point)
        * web.config (configuration file for IIS hosting)
        * robot.txt
        * ...png (favicon.ico, ... project base icons)
    * [D]src
        * [D]assets (folder for static assets)
        * [D]components (folder for React components)
            * [D]ui-kit (base directory for the ui-kit of the application)
        * [D]router (folder for routing logic)
            * routes.js (constant file with all the routes)
            * index.js (base router using all routes)
        * [D]service (folder for remote service)
            * constants.js (constant file with all the remote routes)
            * ...Service.js (file containing promises to CRUD data from remote)
        * [D]store (folder containing redux's store)
            * [D]actions
                * constants.js (constant file for all actions)
                * ....Actions.js (Redux's action file)
            * [D]reducers
                * reducer.js (main reducer containing all the reducers)
                * ...Reducer.js (Redux's reducer file)
            * index.js (redux entry point)
        * [D]theme
            * theme.js (base theme file used to set the base colors)
    * package.json

## Components structure
The component structure is really simple : 

* [D]components
    * [D]ui-kit

The goal is to create all base ui-kit components inside the ui-kit folder.
For example, if you create a Button component, this button should be in **/components/ui-kit/Button**.
Like this you can have reusable ui components easily configured.
Be aware, those ui components should only be there for ui, they should'nt contain the logic of the app inside.

## Redux structure and configuration

