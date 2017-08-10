'use strict';

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: Home,
        props: {
            fullpage: true,
        }
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
        props: {
        }
    },
    {
        path: '/projects/:slug',
        name: 'project',
        component: Project,
        props: {
        }
    }
];

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});
