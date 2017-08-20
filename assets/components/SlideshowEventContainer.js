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
        },

        next: Function,
        prev: Function,
        click: Function,

        keys: {
            type: Boolean,
            default: false 
        }
    },

    mounted(){
        if(this.keys){
            window.addEventListener("keydown", this.onArrow);
        }

        var handler = new Hammer(this.$el);

        handler.on('swipeleft', e => this.next());
        handler.on('swiperight', e => this.prev());
    },

    beforeDestroy(){
        if(this.keys){
            window.removeEventListener("keydown", this.onArrow);
        }
    },

    methods: Object.assign(
        {
            onArrow: function(e){
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
            'reset'
        ])
    ),

    computed: Object.assign(
        Vuex.mapState([
            'isLeftArrowActive',
            'isRightArrowActive'
        ])
    ),

    template: `
          <div class="event-container color-fade">
                <div class="event-area"
                    v-on="{ click: prev, mouseenter: activateLeftArrow, mouseleave: deactivateLeftArrow }"
                >
                    <div class="arrow"
                        :class="{ active: isLeftArrowActive }"
                    >
                        <span class="arrow fa fa-arrow-left"
                            :class="{ active: isLeftArrowActive }"
                            :style="{ color: color }"
                        >
                        </span>
                    </div>
                </div>
                <div class="event-area"
                    v-on="{ click: next, mouseenter: activateRightArrow, mouseleave: deactivateRightArrow }"
                >
                    <div class="arrow"
                        :class="{ active: isRightArrowActive }"
                    >
                        <span class="arrow fa fa-arrow-right"
                            :class="{ active: isRightArrowActive }"
                            :style="{ color: color }"
                        >
                        </span>
                    </div>
                </div>
            </div>
    `
});
