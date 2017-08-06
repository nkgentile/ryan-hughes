'use strict';

Vue.component('featured-slideshow', {
    created(){
    },

    computed: Vuex.mapState([
        'color'
    ]),

    template: `
         <section class="slideshow full-page" :class="color">
            <slideshow-slider></slideshow-slider>
            <slideshow-event-container></slideshow-event-container>
        </section>
    `
});
