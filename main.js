new Vue({
    el: '#root',
    components: {
        'v-topbar': topbar,
        'v-select-provider': select_provider,
    },
    data: {
        providers: [{
                provider: "http://ip-api.com",
                isKeyRequired: false,
            },
            {
                provider: "http://ipstack.com",
                isKeyRequired: true,
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
        selectedProviderChanged (selected) {
            if (selected !== '' && selected !== undefined) {
                this.selectedProvider = selected.provider;
                this.isHostIpFieldShown = true;
                this.isKeyFieldShown = selected.isKeyRequired;
            } else {
                this.selectedProvider = '';
                this.isHostIpFieldShown = this.isKeyFieldShown = false;
            }
        },
    },
});