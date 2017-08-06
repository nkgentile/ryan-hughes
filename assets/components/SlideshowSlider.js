'use strict';

Vue.component('slideshow-slider', {
    computed: Object.assign( 
        Vuex.mapState({
            active: state => state.index,
            translation: state => `translateX(-${state.index}00%)`
        }),

        Vuex.mapGetters({
            slides: 'getFeaturedProjects'
        })
    ),

    template: `
        <div class="slider" :style="{ transform: translation }">
            <figure v-for="(slide, index) in slides" class="slide" :class="{ active: active === index }">
                <img :src="slide.hero_image"/>
                <figcaption>{{ slide.name }}</figcaption>
            </figure>
        </div>
    `
});
