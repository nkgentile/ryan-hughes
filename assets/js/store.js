'use strict';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        navigation: [
            {
                name: 'Projects',
                type: 'text',
                route: '/projects',
                children: [
                    {
                        name: 'Marden',
                        type: 'text',
                        route: '/projects/marden'
                    },
                    {
                        name: 'Pyrite',
                        type: 'text',
                        route: '/project/pyrite'
                    }
                ]
            },
            {
                name: 'About',
                type: 'text',
                route: '/about'
            },
            {
                name: 'Contact',
                type: 'text',
                children: [
                    {
                        name: 'Tumblr',
                        type: 'icon',
                        fa: 'fa-tumblr'
                    },
                    {
                        name: 'Instagram',
                        type: 'icon',
                        fa: 'fa-instagram'
                    }
                ]
            }
        ],

        index: 0,
        isLeftArrowActive: false,
        isRightArrowActive: false,

        color: "black",

        projects: [
			{
				name: "Marden",
				images: [
					{
						source: "assets/images/9th\ Floor,\ Detail.jpg",
						caption: "Seventh Floor, 1/4\" = 1\'",
						color: "#FFFFFF"
					},
					{
						source: "assets/images/7thFloor,\ Detail.jpg",
						caption: "Seventh Floor, 1/4\" = 1\'",
						color: "#FFFFFF"
					},
					{
						source: "assets/images/Building\ Together.jpg",
						caption: "Building Assembled Together, 1/4\" = 1\'",
						color: "#FFFFFF"
					}
				],
				feature: true,
				hero_image: "assets/images/8th\ Floor,\ Detail.jpg",
                color: "black",
                slug: "marden"
			},
            {
                name: "Pyrite",
                images: [
                ],
                feature: true,
                hero_image: "assets/images/Hughes,\ Form\ Model\ Cover.jpg",
                color: "white",
                slug: "pyrite"
            },
            {
                name: "Illustrations",
                images: [
                ],
                feature: true,
                hero_image: "assets/images/Smoke.jpg",
                color: "black",
                slug: "illustrations"
            }
		]
    },
    
    getters:{
    	getFeaturedProjects: (state) => {
    		return state.projects.filter( a => a.feature );
    	},
        getProject: (state, payload) => {
            return state.p
        }
    },
    
    mutations: {
        increment(state){
            state.index += 1;
        },
        decrement(state){
            state.index -= 1;
        },
        go(state, payload){
            state.index = payload;
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
        },
        changeColor(state, payload){
            state.color = payload
        }
    },
    
    actions: {
        nextSlide({ state, getters, commit }){
            const slides = getters.getFeaturedProjects,
                lastSlideIndex = slides.length-1,
                nextSlide = slides[state.index+1];

            if(state.index < lastSlideIndex){
                commit('increment');
                commit('changeColor', nextSlide.color);
            }
        },
        prevSlide({ state, getters, commit }){
            const slides = getters.getFeaturedProjects,
                prevSlide = slides[state.index-1];

            if(state.index > 0){
                commit('decrement');
                commit('changeColor', prevSlide.color);
            }
        }
    }
});
