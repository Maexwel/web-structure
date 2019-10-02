# Web structure project
## Goal
The goal of this project is to provide à High-level and customizable structure of React app.
Here are the main principles bootstraped :
* Component structure
* Redux structure and configuration
* Routing structure
* UI base kit configured
* Remote service configuration (http)

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

