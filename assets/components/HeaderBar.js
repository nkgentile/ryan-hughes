'use strict';

Vue.component('header-bar', {
    computed: Vuex.mapState([
        'color',
        'navigation'
    ]),

    data(){
        return {
            isMobileNavOpen: false
        };
    },

    computed: Object.assign(
        {
            icon(){
                return this.isMobileNavOpen ?
                    "fa-times" :
                    "fa-bars";
            }
        },

        Vuex.mapState([
            'color',
            'navigation'
        ])
    ),

    methods: {
        toggleMobileNav(){
            if(this.isMobileNavOpen){
                this.closeMobileNav();
            }

            else{
                this.openMobileNav();
            }
        },

        openMobileNav(){
            document.body.classList.add("no-scroll");
            this.isMobileNavOpen = true;
        },

        closeMobileNav(){
            document.body.classList.remove("no-scroll");
            this.isMobileNavOpen = false;
        }
    },

    template: `
        <header>
            <page-title></page-title>
            <navigation-bar
                :routes="navigation"
                :color="color"
            >
            </navigation-bar>
            <i class="fa mobile-nav"
                :class="icon"
                @click="toggleMobileNav"
            ></i>
            <navigation-mobile
                :class="{ active: isMobileNavOpen }"
                :close="closeMobileNav"
                :map="navigation"
            >
            </navigation-mobile>
        </header>
    `
});

Vue.component('page-title', {
	computed: {
		title(){
			return `RYAN HUGHES`;
		},

		pageName(){
			return this.$route.name.toUpperCase();
		},

		isRoot(){
			return this.$route.path === '/';
		}
	},
	
    template: `
        <h1>
            <router-link :to="{ name: 'home' }">{{ title }}</router-link><span v-show="!isRoot">, {{ pageName }}</span>
        </h1>
    `
});
