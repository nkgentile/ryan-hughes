'use strict';

const Home = Vue.extend({
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
    
    template: `
        <section>
            <header-bar class="color-fade" :class="[ {floating: fullpage}, color ]"></header-bar>
            <featured-slideshow></featured-slideshow>
        </section>
    `
});
