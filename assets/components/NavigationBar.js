'use strict';

Vue.component('navigation-bar', {
    computed: Vuex.mapState([
        'navigation'
    ]),

    template: `
        <nav>
            <navigation-item v-for="(link, index) in navigation" :model='link' key="index"></navigation-item>
        </nav>
    `
});

Vue.component('navigation-item', {
    computed: {
        isFolder(){
            return this.model.children &&
                this.model.children.length;
        },

        isIcon(){
            return this.model.type === "icon";
        }
    },

    methods: {
        open(){
            this.isOpen = (this.isFolder) ? true : false;
        },

        close(){
            this.isOpen = (this.isFolder) ? false : false;
        }
    },

    props: {
        model: Object
    },

    data(){
        return {
            isOpen: false 
        };
    },

    template: `
        <div class="item" :class="{ open: isOpen }" v-on="{ mouseenter: open, mouseleave: close }">
            <router-link :to="{ path: model.route }" :class="[ {fa: isIcon }, isIcon ? model.fa : '' ]">{{ isIcon ? '' : model.name }}</router-link>
            <span v-if="isFolder">+</span>
            <div class="dropdown-container" v-if="isFolder">
               <div class="dropdown">
               <navigation-item v-for="(link, index) in model.children" :model="link" key="index"></navigation-item> 
               </div>
            </div>
        </div>
    `
});
