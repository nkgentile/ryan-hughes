'use strict';

Vue.component('featured-slideshow', {
    created(){
    },

    template: `
         <section class="slideshow full-page">
            <slideshow-slider></slideshow-slider>
            <slideshow-event-container></slideshow-event-container>
        </section>
    `
});
