new Vue({
    el: '#root',
    template: `
    <v-app>
        <v-content :style="{ height: content.calculatedHeight + 'px' }">
            <v-topbar :extension-height="topbarExtension.height">
            </v-topbar>
                <v-select-provider
                    @provider-changed="selectedProviderChanged" 
                    :api-providers="providers"
                    :show-api-key-field="field.apiKey.show"
                    :show-host-ip-field="field.hostIp.show"
                >
                </v-select-provider>
        </v-content>
    </v-app>
    `,
    components: {
        'v-topbar': topbar,
        'v-select-provider': select_provider,
        //'v-welcome-banner': welcome_banner,
    },
    data: {
        providers: [{
                name: "http://ip-api.com",
                isKeyRequired: false,
            },
            {
                name: "http://ipstack.com",
                isKeyRequired: true,
            },
        ],
        provider: {
            selected: '',
        },
        content: {
            calculatedHeight: 0,
        },
        topbarExtension: {
            height: 300,
        },
        field: {
            apiKey: {
                show: false,
            },
            hostIp: {
                show: false,
            }
        },
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.content.calculatedHeight = window.innerHeight > this.topbarExtension.height ?
                window.innerHeight + this.topbarExtension.height :
                window.innerHeight;
        },
        selectedProviderChanged(selectedProvider) {
            if (selectedProvider !== '' && selectedProvider !== undefined) {
                this.provider.selected = selectedProvider.name;
                this.field.apiKey.show = selectedProvider.isKeyRequired;
                this.field.hostIp.show = true;
            } else {
                this.provider.selected = '';
                this.field.hostIp.show = this.field.apiKey.show = false;
            }
        },
    },
});