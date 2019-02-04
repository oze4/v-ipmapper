Vue.component("v-topbar-part", {
    template: `
    <div>
      <v-toolbar dark color="primary" fixed app> 
        <v-spacer></v-spacer>
            <!--<v-toolbar-title class="white--text">Title</v-toolbar-title>-->
            <a href="https://github.com/oze4" rel="noopener noreferrer" target="_blank" style="margin-top:5px;">
                <img style="width: 56px; height: 52px;" alt="homepage" src="./docs/img/ostrike_logo.png">
            </a>
        <v-spacer></v-spacer>
        </v-toolbar>
        <div style="margin-bottom: 60px;">
        </div>
    </div>
    `,
    /*data() {
        
    },*/
    mounted() {},
    methods: {

    }
})