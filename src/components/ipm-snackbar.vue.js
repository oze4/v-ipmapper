let ipm_snackbar = {
    template: `
    <v-snackbar 
        v-model='isShown' 
        :color='snackbar.color'
        :timeout='snackbar.timeout'
        vertical 
        top 
        left 
        multi-line 
    >{{ snackbar.message }}

        <v-btn 
            :ripple=false 
            @click='isShown = false'
            dark 
            flat 
        >{{ snackbar.button.message }}</v-btn>

        <v-progress-linear 
            :active='progress.active'
            :value='progress.value'
            :color='progress.color'
        ></v-progress-linear>

    </v-snackbar>    
    `,
    props: {
        value: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            snackbar: {
                color: 'info',
                message: "You have been redirected from https to http due to Mixed Content issues",
                multi: true,
                timeout: 0, // 0 means it will stay until closed
                button: {
                    message: 'Close',
                },
            },
            progress: {
                timeout: 6000,
                active: true,
                value: 0,
                color: 'green',
                interval: 0,
            },
        }
    },
    watch: {
        value() {
            if (this.value){
                this.doProgressBar();
            } else {
                clearInterval(this.progress.interval);
            }
        }
    },
    computed: {
        isShown: {
            get() {
                return this.value
            },
            set(isShown) {
                this.$emit('input', isShown)
            }
        }
    },
    methods: {
        doProgressBar() {
            this.progress.value = 99; // ensure our progress bar is 'full'
            let step = 100, // how often to update progress bar
                totalTime = this.progress.timeout,
                chunk = totalTime / step,
                factor = 100 / chunk;

            this.progress.interval = setInterval(() => {
                if(this.progress.value <= 0) {
                    this.isShown = false;
                };
                this.progress.value -= factor;
            }, step);
        }
    },
}
