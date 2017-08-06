'use strict';

Vue.component('header-bar', {
    computed: Vuex.mapState([
        'name'
    ]),
    
    template: `
        <header>
            <a id="name">{{ name }}</a>
            <navigation-bar></navigation-bar>
        </header>
    `
});
