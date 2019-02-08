let componentVSelectProviderCard = {
    template: `
    <v-layout justify-center row>
        <v-flex md8 elevation-5>
            <v-card class="grey lighten-3">
                <v-card-title class="justify-center">
                    <div class="md4 text-md-center">
                        <h2>{{ title }}</h2>    
                        <small>
                            <span class="mdi mdi-key red--text"></span>
                            {{ subtitle }}
                        </small>                                         
                    </div>
                </v-card-title>
            </v-card>
            <v-card>
                <v-card-title class="justify-center">
                    <v-flex sm4 align-center justify-center>
                        <v-select @input="providerChanged" :searchable=false :options="apiproviders">
                            <template slot="option" slot-scope="option">
                                {{ option.label }}
                                <span class="mdi red--text" v-bind:class="option.icon"></span>                                
                            </template>
                        </v-select>
                    </v-flex>
                </v-card-title>
                <span v-html="selectedOption"> </span>
            </v-card>
        </v-flex>
    </v-layout> 
    `,
    props: {
        title: {
            type: String,
            default: "Select API Provider",
        },
        subtitle: {
            type: String,
            default: " means API key is required",
        },
        apiproviders: {
            type: Array,
        },
    },
    data: function () {
        return {
            selectedOption: "",
        }
    },
    mounted: function () {
        return {};
    },
    computed: {},
    methods: {
        providerChanged: function (val) {
            if (val != null) { 
                this.selectedOption = "&#8594; " + val.label + " &#8592;" ;
                this.$emit('provider-changed', val);
            } else {
                this.selectedOption = '';
            }
        },
    },
}
