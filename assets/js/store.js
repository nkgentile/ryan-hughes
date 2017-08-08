'use strict';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        name: 'Ryan Hughes',

        navigation: [
            {
                name: 'Projects',
                type: 'text',
                route: 'projects'
            },
            {
                name: 'About',
                type: 'text',
                route: 'about'
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
						caption: ""
					},
					{
						source: "assets/images/7thFloor,\ Detail.jpg",
						caption: ""
					},
					{
						source: "assets/images/Building\ Together.jpg",
						caption: ""
					}
				],
				feature: true,
				hero_image: "assets/images/8th\ Floor,\ Detail.jpg",
                color: "black"
			},
            {
                name: "Pyrite",
                images: [
                ],
                feature: true,
                hero_image: "assets/images/Hughes,\ Form\ Model\ Cover.jpg",
                color: "white"
            },
            {
                name: "Illustrations",
                images: [
                ],
                feature: true,
                hero_image: "assets/images/Smoke.jpg",
                color: "black"
            }
		]
    },
    
    getters:{
    	getFeaturedProjects: (state) => {
    		return state.projects.filter( a => a.feature );
    	}
    },
    
    mutations: {
        increment(state){
            state.index += 1;
        },
        decrement(state){
            state.index -= 1;
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
    }
});
