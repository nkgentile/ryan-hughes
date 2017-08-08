'use strict';

const Projects = Vue.extend({
    props: {
        fullpage: {
            type: Boolean,
            default: false
        }
    },

    template: `
        <section>
            <header-bar :class="{ floating: fullpage }"></header-bar>
            <project-grid></project-grid>
        </section>
    `
});
