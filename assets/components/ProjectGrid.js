'use strict';

Vue.component('project-grid', {
    computed: Vuex.mapState([
        'projects'
    ]),

    template: `
        <section class="grid-container">
            <h1>Projects</h1>
            <div class="grid">
                <grid-item v-for="(project, i) in projects" :model="project" :key="i">{{ project.name }}</grid-item>
            </div>
        </section>
    `
});

Vue.component('grid-item', {
    props: {
        model: {
            type: Object
        }
    },

    data(){
        return {
            route: {
                path: 'project',
                params: {
                    slug: this.model.slug
                }
            }
        };
    },

    template: `
        <router-link :to="route" :class="model.color" class="grid-item">
            <img :src="model.hero_image" />
            <figcaption>{{ model.name }}</figcaption>
        </router-link>
    `
});
