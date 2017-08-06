'use strict';

Vue.component('slideshow-slider', {
    computed: Vuex.mapState({
        slides: state => state.slides,
        translation: state => `translateX(-${state.index}00%)`
    }),

    template: `
        <div class="slider" :style="{ transform: translation }">
            <template v-for="(slide, index) in slides">
                <img class="slide" :src="slide.image_src"/>
            </template>
        </div>
    `
});
