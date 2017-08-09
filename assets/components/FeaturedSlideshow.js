'use strict';

Vue.component('featured-slideshow', {
    computed: {
        projects(){
            return store.getters.getFeaturedProjects;
        },

        index(){
            return store.state.index;
        },

        color(){
            return store.state.color;
        }
    },

    created(){
        const currentSlide = this.projects[this.index];

        this.changeColor(currentSlide.color);
    },

    methods: Vuex.mapMutations([
        'go',
        'changeColor'
    ]),

    template: `
         <section class="slideshow full-page">
            <slideshow-slider :slides="projects" :index="index"></slideshow-slider>
            <slideshow-event-container :index="index" :color="color"></slideshow-event-container>
        </section>
    `
});
