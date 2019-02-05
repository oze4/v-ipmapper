Vue.component("v-topbar-part", {
    template: `
    <div style="margin-bottom:90px;">
      <v-toolbar dark color="primary" fixed app> 
        <v-spacer></v-spacer>
            <a href="https://github.com/oze4" rel="noopener noreferrer" target="_blank" style="margin-top:5px;">
                <img style="width: 56px; height: 52px;" alt="homepage" src="./docs/img/ostrike_logo.png">
            </a>
        <v-spacer></v-spacer>
        </v-toolbar>
    </div>
    `,
    mounted: function () {
        return {

        };
    },
    methods: {

    }
})
