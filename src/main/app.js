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
        /*result: function () {
            return this.counter > 5 ? "Greater than 5" : "Smaller than 5";
        },*/
    },
    watch: {
        /*counter: function () {
            let vm = this;
            setTimeout(function () {
                vm.counter = 0;
            }, 5000);
        },*/
    },
    methods: {
        /*result: function () {
            console.log('method()');
            return this.counter > 5 ? "Greater than 5" : "Smaller than 5";
        },*/
    },
});
