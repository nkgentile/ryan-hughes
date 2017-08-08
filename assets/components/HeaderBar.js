'use strict';

Vue.component('header-bar', {
    computed: Vuex.mapState([
        'name',
        'color'
    ]),
    
    template: `
        <header :class="color">
            <navigation-bar></navigation-bar>
        </header>
    `
});
