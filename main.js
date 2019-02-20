var myvm = new Vue({
    el: '#root',
    beforeCreate() {
        if (location.protocol === "https:") {
            Cookies.set('____vipmapperredirection____', 'true', 1);
            location.replace("http://" + location.hostname);
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    mounted() {
        function redirectionCheck(vm) { 
            if((Cookies.get('____vipmapperredirection____')) === 'true'){
                vm.isSnackbarShown = true;
            }
            Cookies.remove('____vipmapperredirection____');
        }
        setTimeout(redirectionCheck, 300, this);
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    components: {
        'ipm-snackbar': ipm_snackbar,
        'ipm-topbar': ipm_topbar,
        'ipm-select-provider-form': ipm_select_provider_form,
        'ipm-generate-map': ipm_generate_map,
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
    methods: {
        handleResize() {
            this.content.calculatedHeight = window.innerHeight > this.topbarExtension.height ?
                window.innerHeight + this.topbarExtension.height :
                window.innerHeight;
        },
    },
});