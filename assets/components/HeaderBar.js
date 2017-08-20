'use strict';

Vue.component('header-bar', {
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

    beforeDestroy(){
        this.closeMobileNav();
    },

    template: `
        <header>
            <page-title :color="color"></page-title>
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
    props: {
        color: String
    },

	computed: {
		title(){
			return `RYAN HUGHES`;
		},

		pageName(){
            if(this.$route.params.slug !== undefined){
                return this.$route.params.slug.toUpperCase();
            }
			return this.$route.name.toUpperCase();
		},

		isRoot(){
			return this.$route.path === '/';
		}
	},
	
    template: `
        <router-link tag="h1"
            :to="{ name: 'home' }"
            :style="{ color: color }"
        >
            {{ title }}<span v-show="!isRoot">, {{ pageName }}</span>
        </router-link>
    `
});
