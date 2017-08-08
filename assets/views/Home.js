'use strict';

const Home = Vue.extend({
    props: {
        fullpage: {
            type: Boolean,
            default: false
        }
    },

    template: `
        <section>
            <header-bar :class="{floating: fullpage}"></header-bar>
            <featured-slideshow></featured-slideshow>
        </section>
    `
});
