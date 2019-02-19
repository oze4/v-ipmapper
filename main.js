var myvm = new Vue({
    el: '#root',    
    beforeMount() {
        if (location.protocol === 'file:') {
            //location.replace("http://" + location.hostname);
            this.isSnackbarShown = true;
        }
    },
    components: {
        'ipm-snackbar': ipm_snackbar,
        'ipm-topbar': ipm_topbar,
        'ipm-select-provider-form': ipm_select_provider_form,
    },
    template: `
    <v-app>
        <v-content :style="{ height: content.calculatedHeight + 'px' }">
            <ipm-snackbar v-model='isSnackbarShown'></ipm-snackbar>
            <ipm-topbar :extension-height="topbarExtension.height"></ipm-topbar>
            <ipm-select-provider-form></ipm-select-provider-form>
        </v-content>
    </v-app>
    `,
    data: {
        isSnackbarShown: false,
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