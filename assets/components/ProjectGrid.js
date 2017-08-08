'use strict';

Vue.component('project-grid', {
    computed: Vuex.mapState([
        'projects'
    ]),

    template: `
        <section class="grid-container">
            <h1>Projects</h1>
            <ul class="grid">
                <li class="item" v-for="(project, i) in projects">{{ project.name }}</li>
            </ul>
        </section>
    `
});
