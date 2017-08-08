'use strict';

const routes = [
    {
        path: '/',
        component: Home,
        props: {
            fullpage: true
        }
    },
    {
        path: '/projects',
        component: Projects,
        props: {
            fullpage: false
        }
    },
    {
        path: '/projects/:slug',
        component: Project,
        props: {
            fullpage: false
        }
    }
];

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});
