Vue.component('v-select', VueSelect.VueSelect)

new Vue({
    el: '#root',
    components: {
        'v-topbar-part': componentVTopbarPart,
        'v-select-provider': componentVSelectProviderCard,
    },
    data: {
        providers: [{
                label: "http://ip-api.com",
            },
            {
                label: "http://ipstack.com",
                icon: "mdi-key"
            },
        ],
    },
    computed: {
        logMe: function () {
            console.log('changed');
        }
    },
    watch: {},
    methods: {},
});
