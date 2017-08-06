'use strict';

Vue.component('slideshow-event-container', {
    created(){
        window.addEventListener("keydown", (e) => {
            switch(e.key){
                case "ArrowLeft":
                    this.prev();
                    break;
                case "ArrowRight":
                    this.next();
                    break;
                default:
                    break;
            }
        });

        this.changeColor(this.slides[0].color);
    },

    methods: Object.assign(
        {
            next(){
                if(this.index === this.slides.length-1){
                    return;
                }

                this.increment();

                this.changeColor(this.slides[this.index].color);
            },

            prev(){
                if(this.index === 0){
                    return;
                }

                this.decrement();

                this.changeColor(this.slides[this.index].color);
            }
        },
        
        Vuex.mapMutations([
            'increment',
            'decrement',

            'activateLeftArrow',
            'deactivateLeftArrow',

            'activateRightArrow',
            'deactivateRightArrow',

            'changeColor'
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
