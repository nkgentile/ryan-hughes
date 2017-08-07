'use strict';

const Project = Vue.extend({
    template: `
        <h1>{{ $route.params.name }}</h1>
    `
});
