'use strict';

Vue.component('header-bar', {
    computed: Vuex.mapState([
        'color'
    ]),

    template: `
        <header class="color-fade" :class="color">
            <navigation-bar></navigation-bar>
        </header>
    `
});
