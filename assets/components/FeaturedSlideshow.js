'use strict';

Vue.component('featured-slideshow', {
    created(){
        this.$store.dispatch('getSlides');
    },

    template: `
         <section class="slideshow full-page">
            <slideshow-slider></slideshow-slider>
            <slideshow-event-container></slideshow-event-container>
        </section>
    `
});
