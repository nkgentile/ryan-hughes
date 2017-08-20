'use strict';

Vue.component('navigation-bar', {
    props: {
        color: String,
        routes: Array
    },

    template: `
        <nav id="main">
            <navigation-item
                v-for="(route, index) in routes"
                :model="route"
                :style="{ color: color }"
                :key="index"
            ></navigation-item>
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
        <div class="item"
            :class="{ open: isOpen }"
            v-on="{ mouseenter: open, mouseleave: close }"
        >
            <router-link :to="{ path: model.route }"
                :class="[ {fa: isIcon }, isIcon ? model.fa : '' ]"
            >
                {{ isIcon ? '' : model.name }}
            </router-link>
            <span v-if="isFolder">+</span>
            <div class="dropdown-container"
               v-if="isFolder"
            >
               <div class="dropdown">
                   <navigation-item 
                        v-for="(link, index) in model.children"
                        :model="link"
                        :key="index"
                   >
                   </navigation-item> 
               </div>
            </div>
        </div>
    `
});

Vue.component('navigation-mobile', {
    props: {
        map: Array,
        close: Function
    },

    template: `
        <nav id="mobile">
            <page-title></page-title>
            <navigation-list-item v-for="(node, i) in map"
                :name="node.name"
                :route="node.route"
                tag="h2"
                :childNodes="node.children"
                :key="i"
            >
            </navigation-list-item>
        </nav>
    `
})

Vue.component('navigation-list-item', {
    props: {
        name: String,
        type: String,
        fa: String,
        route: String,
        childNodes: Array,
        tag: String
    },

    computed: {
        hasChildren(){
            return this.childNodes !== undefined;
        },

        isIcon(){
            return this.type === 'icon';
        }
    },

    template: `
        <div>
            <router-link :tag="tag"
                :to="{ path: route }"
                :class="[{ fa: isIcon }, fa]"
            >
                <span v-if="!isIcon">{{ name }}</span>
            </router-link>
            <template v-if="hasChildren">
                <div>
                    <navigation-list-item v-for="(c, i) in childNodes"
                        :type="c.type"
                        :fa="c.fa"
                        :name="c.name"
                        :route="c.route"
                        :key="i"
                        tag="h3"
                    >
                    </navigation-list-item>
                </div>
            </template>
        </div>
    `
});
