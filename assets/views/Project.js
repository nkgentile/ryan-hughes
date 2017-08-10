'use strict';

const Project = Vue.extend({
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

    computed: Vuex.mapState({
        project(state){
            const slug = this.$route.params.slug;

            return state.projects.filter(
                a => a.slug === slug
            )[0];
        }
    }),

    beforeRouteUpdate(to, from, next){
        console.log(to);
        next();
    },

    template: `
        <section>
            <header-bar class="color-fade" :class="[ {floating: fullpage}, color ]"></header-bar>
            <single-project></single-project>
        </section>
    `
});
