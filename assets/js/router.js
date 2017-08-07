'use strict';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/projects',
        component: Projects
    },
    {
        path: '/projects/:name',
        component: Project
    }
];

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});
