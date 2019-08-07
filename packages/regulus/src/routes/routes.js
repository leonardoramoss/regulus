import Home from '../views/HomeAsync';
import NotFound from '../views/NotFound';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        desc: 'home'
    },
    {
        path: '*',
        component: NotFound
    }
];

export default routes;
