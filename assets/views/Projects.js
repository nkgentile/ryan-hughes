'use strict';

const Projects = Vue.extend({
    props: {
        fullpage: {
            type: Boolean,
            default: false
        },

        color: {
            type: String,
            default: 'black'
        }
    },

    created(){
        this.changeColor(this.color);
    },

    methods: Vuex.mapMutations([
        'changeColor'
    ]),

    template: `
        <section>
            <header-bar class="color-fade" :class="{floating: fullpage}"></header-bar>
            <project-grid></project-grid>
        </section>
    `
});
