'use strict';

Vue.component('slideshow-event-container', {
    created(){
        window.addEventListener("keydown", function(e){
            console.log(e);
            switch(e.key){
                case "ArrowLeft": this.prev();
                case "ArrowRight": this.next();
                default: return;
            }
        });
    },

    methods: Vuex.mapMutations([
        'prev',
        'next',

        'activateLeftArrow',
        'deactivateLeftArrow',

        'activateRightArrow',
        'deactivateRightArrow'
    ]),

    computed: Vuex.mapState([
        'isLeftArrowActive',
        'isRightArrowActive'
    ]),


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
