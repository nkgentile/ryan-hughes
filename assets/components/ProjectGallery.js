'use strict';

Vue.component('project-gallery', {
    props: {
        assets: {
            type: Array,
            default: () => []
        }
    },
    
    mounted(){
        var handler = new Hammer(this.$el);

        handler.on('swipeleft', e => this.increment());
        handler.on('swiperight', e => this.decrement());
    },

    data(){
        return {
            index: 0
        };
    },

    methods: {
        increment(){
            var lastIndex = this.assets.length-1;

            if(this.index >= lastIndex){
                return lastIndex;
            }

            else{
                return this.index+=1;
            }
        },
        decrement(){
            if(this.index <= 0){
                return 0;
            }

            else{
                return this.index-=1;
            }
        }
    },

    template: `
        <div class="gallery">
            <gallery-slider
                :slides="assets"
                :index="index"
            ></gallery-slider>
            <slideshow-event-container
                :index="index"
                :color="assets[index].color"
                :next="increment"
                :prev="decrement"
            ></slideshow-event-container>
        </div>
    `
});

Vue.component('gallery-slider', {
    props: {
        slides: {
            type: Array,
            default: () => []
        },

        index: {
            type: Number,
            default: 0
        }
    },

    computed: {
        translation(){
            return `translateX(-${this.index}00%)`;
        }
    },

    template: `
        <div class="slider" :style="{ transform: translation }">
            <figure v-for="s in slides">
                <img :src="s.source"/>
                <figcaption :style="{ color: s.color }">{{ s.caption }}</figcaption>
            </figure>
        </div>
    `
});
