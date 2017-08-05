'use strict';

Vue.component('featured-slideshow', {
    created(){
        this.$store.dispatch('getSlides');
    },

    computed: {
        slides(){
            return this.$store.state.slides;
        }
    },

    template: `
         <section class="slideshow fullPage">
            <div class="slider">
            <template v-for="(slide, index) in slides">
                <img :src="slide.image_src"/>
            </template>
            </div>
        </section>
    `
});
