let ipm_snackbar = {
    template: `
    <v-snackbar 
        v-model='snackbar.isShown' 
        :color='snackbar.color'
        :timeout=0 
        vertical 
        top 
        left 
        multi-line 
        auto-height 
        pa-0
    >   
        {{ snackbar.message }}

        <v-btn 
            :ripple=false 
            @click='this.snackbar.isShown = false'
            dark 
            flat 
            pa-0 
        >
            {{ snackbar.button.message }}
        </v-btn>

        <v-progress-linear 
            active 
            pa-0
        >
        </v-progress-linear>

    </v-snackbar>    
    `,
    data() {
        return {
            snackbar: {
                isShown: false,
                color: 'info',
                message: "You have been redirected from https to http due to Mixed Content issues",
                multi: true,
                timeout: 6000,              
                button: {
                    message: 'Close',
                },
            },
        }
    },
}