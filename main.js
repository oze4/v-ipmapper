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
        selectedProvider: '',
        isKeyFieldShown: false,
        isHostIpFieldShown: false,
    },
    computed: {

    },
    watch: {

    },
    methods: {
        selectedProviderChanged (val) {
            if (val !== '' && val !== undefined) {
                this.selectedProvider = val.label;
                this.isHostIpFieldShown = true;
                this.isKeyFieldShown = val.keyRequired;
            } else {
                this.selectedProvider = '';
                this.isHostIpFieldShown = this.isKeyFieldShown = false;
            }
        },
    },
});