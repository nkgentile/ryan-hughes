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
        },

        currentProject(){
            return this.projects[this.index];
        }
    },

    created(){
        this.changeColor(this.currentProject.color);
    },

    methods: Object.assign(
        {
            click(){
                router.push({
                    name: 'project',
                    params: {
                        slug: this.currentProject.slug
                    }
                });
            }
        },

        Vuex.mapMutations([
            'go',
            'changeColor'
        ]),

        Vuex.mapActions([
            'nextSlide',
            'prevSlide'
        ])
    ),

    template: `
         <section class="slideshow full-page">
            <slideshow-slider
                :slides="projects"
                :index="index"
            ></slideshow-slider>
            <slideshow-event-container
                :index="index"
                :color="color"
                :next="nextSlide"
                :prev="prevSlide"
                :click="click"
                :keys="true"
            ></slideshow-event-container>
        </section>
    `
});
