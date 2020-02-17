import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page from '../components/pages/templates/Page';
import { NotFoundPage, AppPage } from '../components/pages'

// Routes of the app in a Switch to handle multiple route matching
const routes = () => (
    <BrowserRouter>
        <Switch>
            <Page path="/" exact component={AppPage} name="APP_PAGE" />
            {/** Handle page not found */}
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);
export default routes;