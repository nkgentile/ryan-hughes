'use strict';

Vue.component('header-bar', {
    computed: Vuex.mapState([
        'name',
        'color'
    ]),
    
    template: `
        <header :class="color">
            <a id="name">{{ name }}</a>
            <navigation-bar></navigation-bar>
        </header>
    `
});
