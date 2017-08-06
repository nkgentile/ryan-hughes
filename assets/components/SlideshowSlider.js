'use strict';

Vue.component('slideshow-slider', {
    computed: Object.assign( 
        Vuex.mapState({
        translation: state => `translateX(-${state.index}00%)`
        }),

        Vuex.mapGetters({
            slides: 'getFeaturedProjects'
        })
    ),

    template: `
        <div class="slider" :style="{ transform: translation }">
            <template v-for="(slide, index) in slides">
                <img class="slide" :src="slide.hero_image"/>
            </template>
        </div>
    `
});
