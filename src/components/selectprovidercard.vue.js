let componentVSelectProviderCard = { 
    template: `
    <v-layout justify-center row>
        <v-flex md8 elevation-5>
            <v-card class="grey lighten-3">
                <v-card-title class="justify-center">
                    <div md4 text-md-center>
                        <h2>{{ title }}</h2>    
                        <small>
                            <span class="mdi mdi-key red--text"></span>
                            {{ subTitle }}
                        </small>                                         
                    </div>
                </v-card-title>
            </v-card>
            <v-card>
                <v-card-title class="justify-center">
                    <div md4 align-center>
                        <v-select :searchable=false :options="apiProviders">
                            <template slot="option" slot-scope="option">
                                {{ option.label }}
                                <span class="mdi red--text" :class="option.icon"></span>                                
                            </template>
                        </v-select>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout> 
    `,
    data: function () {
        return {
            selectedProvider: '',
            title: "Select API Provider",
            subTitle: " means API key is required",
            apiProviders: [{
                    label: "http://ip-api.com",
                },
                {
                    label: "http://ipstack.com",
                    icon: "mdi-key"
                },
            ],
        };
    },
    mounted: function () {
        let vm = this;
        return {

        };
    },
    methods: {

    }
}
