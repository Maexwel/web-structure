import { AppPage } from '../components/pages';

export const routes = {
    APP_ROUTE: {
        icon: 'account_circle', // Material icon name
        path: '/',
        name: 'APP_PAGE', // It should match a key in the lang file
        exact: true,
        component: AppPage,
    },
}