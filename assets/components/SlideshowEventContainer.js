'use strict';

Vue.component('slideshow-event-container', {
    created(){
        var self = this;
        window.addEventListener("keydown", function(e){
            console.log(e.key);
            switch(e.key){
                case "ArrowLeft":
                    self.prev();
                    break;
                case "ArrowRight":
                    self.next();
                    break;
                default:
                    break;
            }
        });
    },

    methods: Object.assign(
        {
            next(){
                if(this.index === this.slides.length-1)
                    return;

                this.increment();
            },

            prev(){
                if(this.index === 0)
                    return;

                this.decrement();
            }
        },
        
        Vuex.mapMutations([
            'increment',
            'decrement',

            'activateLeftArrow',
            'deactivateLeftArrow',

            'activateRightArrow',
            'deactivateRightArrow'
        ])
    ),

    computed: Object.assign(
        Vuex.mapState([
            'index',
            'isLeftArrowActive',
            'isRightArrowActive'
        ]),

        Vuex.mapGetters({
            slides: 'getFeaturedProjects'
        }),
    ),


    template: `
          <div class="event-container">
                <div class="event-area" v-on="{ click: prev, mouseenter: activateLeftArrow, mouseleave: deactivateLeftArrow }">
                    <span class="arrow fa fa-arrow-left"
                            :class="{ active: isLeftArrowActive }"></span>
                </div>
                <div class="event-area" v-on="{ click: next, mouseenter: activateRightArrow, mouseleave: deactivateRightArrow }">
                    <span class="arrow fa fa-arrow-right" :class="{ active: isRightArrowActive }"></span>
                </div>
            </div>
    `
});
