'use strict';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        name: 'Ryan Hughes',

        index: 0,
        slides: [],
        isLeftArrowActive: false,
        isRightArrowActive: false
    },
    mutations: {
        populateSlides(state, payload){
            state.slides = payload;
        },
        next(state){
            state.index = (state.index !== state.slides.length-1) ?
                state.index+1 :
                state.slides.length-1;
        },
        prev(state){
            state.index = (state.index !== 0) ?
               state.index-1 :
               0; 
        },
        activateLeftArrow(state){
            state.isLeftArrowActive = true;
        },
        deactivateLeftArrow(state){
            state.isLeftArrowActive = false;
        },
        activateRightArrow(state){
            state.isRightArrowActive = true;
        },
        deactivateRightArrow(state){
            state.isRightArrowActive = false;
        }
    },
    actions: {
        getSlides(){
            axios.get('assets/json/featured.json')
            .then( r => store.commit('populateSlides', r.data.slides) )
        }
    }
});
