'use strict';

Vue.component('header-bar', {
    computed: Vuex.mapState([
        'color'
    ]),

    template: `
        <header :class="color">
            <navigation-bar></navigation-bar>
        </header>
    `
});
