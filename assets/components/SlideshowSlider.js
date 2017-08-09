'use strict';

Vue.component('slideshow-slider', {
    props: {
        index: {
            type: Number,
            default: 0
        },

        slides: {
            type: Array,
            default: () => [] 
        }
    },

    computed: {
        translation(){
            return `translateX(-${this.index}00%)`;
        },

        classes(){
            return ["slide", this.color];
        }
    },

    template: `
        <div class="slider" :style="{ transform: translation }">
            <figure v-for="(slide, index) in slides" :class="classes">
                <img :src="slide.hero_image"/>
                <figcaption>{{ slide.name }}</figcaption>
            </figure>
        </div>
    `
});
