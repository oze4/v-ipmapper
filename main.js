new Vue({
    el: '#root',
    components: {
        'v-topbar': topbar,
        'v-select-provider': select_provider,
    },
    data: {
        providers: [{
                label: "http://ip-api.com",
                keyRequired: false,
            },
            {
                label: "http://ipstack.com",
                keyRequired: true,
            },
        ],
    },
    computed: {},
    watch: {},
    methods: {
        logProvider: function (val) {
            console.log(val);
        },
    },
});