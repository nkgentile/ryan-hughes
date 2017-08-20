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
        }
    },

    template: `
        <div class="slider" :style="{ transform: translation }">
            <router-link tag="figure" class="slide"
                :to="{ name: 'project', params: { slug: s.slug } }"
                v-for="(s, i) in slides"
                :class="s.color"
                :key="i"
            >
                <img :src="s.hero_image"/>
                <figcaption>{{ s.name }}</figcaption>
            </router-link>
        </div>
    `
});
