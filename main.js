new Vue({
    el: '#root',
    components: {
        'v-topbar': topbar,
        'v-welcome-banner': welcome_banner,
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
        content: {
            calculatedHeight: 0,
        },
        toolbarExtension: {
            height: 300,
        },
        selectedProvider: '',
        showApiKeyField: false,
        showHostIpField: false,
    },
    computed: {
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    watch: {

    },
    methods: {
        handleResize() {
            this.content.calculatedHeight = window.innerHeight > this.toolbarExtension.height ?
                window.innerHeight + this.toolbarExtension.height :
                window.innerHeight;
        },
        selectedProviderChanged(selected) {
            console.log('invoked selectedProviderChanged');
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