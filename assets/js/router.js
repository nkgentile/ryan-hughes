'use strict';

const routes = [
    {
        path: '/',
        component: Home
    }
];

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});
