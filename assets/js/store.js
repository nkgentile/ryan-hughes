'use strict';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        index: 0,
        slides: []
    },
    mutations: {
        populateSlides(state, payload){
            state.slides = payload;
        }
    },
    actions: {
        getSlides(){
            axios.get('assets/json/featured.json')
            .then( r => store.commit('populateSlides', r.data.slides) )
        }
    }
});
