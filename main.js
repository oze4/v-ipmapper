new Vue({
    el: '#root',
    beforeCreate() {
        if(location.protocol === 'https:'){
            location.replace("http://" + location.hostname);
        }
    },
    template: `
    <v-app>
        <v-content :style="{ height: content.calculatedHeight + 'px' }">
            <ipm-topbar :extension-height="topbarExtension.height">
            </ipm-topbar>
                <ipm-select-provider></ipm-select-provider>
        </v-content>
    </v-app>
    `,
    components: {
        'ipm-topbar': topbar,
        'ipm-select-provider': select_provider,
    },
    data: {
        provider: {
            selected: '',
        },
        content: {
            calculatedHeight: 0,
        },
        topbarExtension: {
            height: 300,
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
    },
});