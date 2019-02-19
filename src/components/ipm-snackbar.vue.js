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
        auto-height 
    >   
        {{ snackbar.message }}

        <v-btn 
            :ripple=false 
            @click='isShown = false'
            dark 
            flat 
        >
            {{ snackbar.button.message }}
        </v-btn>

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
                timeout: 6000,
                button: {
                    message: 'Close',
                },
            },
            progress: {
                active: true,
                value: 100,
                color: 'success',
                interval: 0,
            },
        }
    },
    watch: {
        value() {
            if (this.value){
                this.countdown();
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
        countdown() {
            setInterval(() => {
                this.progress.value -= 17;
            }, 1000);
        }
    },
}