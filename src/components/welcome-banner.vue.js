let welcome_banner = {     
    template: `
    <v-container>
        <v-layout row wrap align-center justify-center>
            <v-flex v-for="image in logos" :key="image.logo" xs4 fill-height>
                <v-img :src="'./docs/img/' + image.logo" width="20%" height="20%"></v-img>
            </v-flex>
        </v-layout>
    </v-container>
    `,
    data() {
        return { 
            logos: [
                { logo: 'vue.png' },
                { logo: 'leaflet.png' },
                { logo: 'vuetify.png' }
            ]
        };
    },
    computed: {
    },
}