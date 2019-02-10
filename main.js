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
        showApiKeyField: false,
        showHostIpField: false,
    },
    computed: {

    },
    watch: {

    },
    methods: {
        selectedProviderChanged (selected) {
            if (selected !== '' && selected !== undefined) {
                this.selectedProvider = selected.provider;
                this.showHostIpField = true;
                this.showApiKeyField = selected.isKeyRequired;
            } else {
                this.selectedProvider = '';
                this.showHostIpField = this.showApiKeyField = false;
            }
        },
    },
});