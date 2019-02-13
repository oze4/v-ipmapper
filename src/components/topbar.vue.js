let topbar = {     
    template: `
    <div>
        <v-toolbar dark color="primary" fixed flat app> 
            <v-spacer></v-spacer>
            <a href="https://github.com/oze4" rel="noopener noreferrer" target="_blank" style="margin-top:5px;">
                <img style="width: 56px; height: 52px;" alt="homepage" src="./docs/img/ostrike_logo.png">
            </a>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar dark color='primary' flat :height=toolbarHeight>
            
        </v-toolbar>
    </div>
    `,
    props: {
        toolbarExtensionHeight: {
            type: Number,
            default: 64,
        },
    },
    computed: {
        toolbarHeight() {
            return String(this.toolbarExtensionHeight);
        }
    },
    data() {
        return {

        };
    },
    methods: {}
}
