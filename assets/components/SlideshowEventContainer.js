'use strict';

Vue.component('slideshow-event-container', {
    props: {
        index: {
            type: Number,
            default: 0
        },

        color: {
            type: String,
            default: "black"
        }
    },

    created(){
        window.addEventListener("keydown", this.onArrow);
    },

    beforeDestroy(){
        window.removeEventListener("keydown", this.onArrow);
    },

    methods: Object.assign(
        {
            onArrow: function(e){
                switch(e.key){
                    case "ArrowLeft":
                        this.prevSlide();
                        break;
                    case "ArrowRight":
                        this.nextSlide();
                        break;
                    default:
                        break;
                }
            }
        },

        Vuex.mapMutations([
            'activateLeftArrow',
            'deactivateLeftArrow',

            'activateRightArrow',
            'deactivateRightArrow',

            'changeColor'
        ]),

        Vuex.mapActions([
            'nextSlide',
            'prevSlide',
            'reset'
        ])
    ),

    computed: Object.assign(
        Vuex.mapState([
            'isLeftArrowActive',
            'isRightArrowActive'
        ]),

        Vuex.mapGetters({
            slides: 'getFeaturedProjects'
        }),
    ),

    template: `
          <div class="event-container color-fade" :class="color">
                <div class="event-area" v-on="{ mouseenter: activateLeftArrow, mouseleave: deactivateLeftArrow }">
                    <span class="arrow fa fa-arrow-left" @click="prevSlide"
                            :class="{ active: isLeftArrowActive }"></span>
                </div>
                <div class="event-area" v-on="{ mouseenter: activateRightArrow, mouseleave: deactivateRightArrow }">
                    <span class="arrow fa fa-arrow-right" @click="nextSlide" :class="{ active: isRightArrowActive }"></span>
                </div>
            </div>
    `
});
