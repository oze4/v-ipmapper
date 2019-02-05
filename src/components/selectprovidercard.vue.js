Vue.component('v-select-provider-card', {
    template: `
    <v-layout justify-center row>
        <v-flex md8 elevation-5>
            <v-card class="grey lighten-3">
                <v-card-title class="justify-center">
                    <div md4>
                        <h2>{{ title }}</h2>
                        <small>{{ subTitle }}</small>
                    </div>
                </v-card-title>
            </v-card>
            <v-card>
                <v-card-title class="justify-center">
                    <v-flex md4>
                        <v-select solo>
                        </v-select>
                    </v-flex>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>  
    `,
    data: function () {
        return {
            title: "Select API Provider",
            subTitle: "KEY means API key is required"
        };
    },
    mounted: function () {
        return {

        };
    },
    methods: {

    }
})
