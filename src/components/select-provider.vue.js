let select_provider = {
    template: `
    <v-flex xs12 md10>
        <v-card class="elevation-10">
            <v-form>
                <v-container>
                    <v-layout justify-center wrap>
                        <v-flex xs12 md4>
                            <v-select 
                                label="Select API Provider" 
                                @change="providerChanged" 
                                :items="apiProviders"
                                item-text="label" 
                                clearable 
                                return-object
                                persistent-hint
                                hint="<small class='mdi mdi-key red--text'></small> means API key is required"
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.label }}
                                    <span v-if="data.item.keyRequired" class="mdi mdi-key red--text">
                                    </span>
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.label }}
                                    <span v-if="data.item.keyRequired" class="mdi mdi-key red--text">
                                    </span>
                                </template>
                            </v-select>
                        </v-flex>
                        <v-flex v-if="isKeyFieldShown" xs12 md4>
                            <v-text-field 
                                label="API Key"
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex v-if="isHostIpFieldShown" xs12 md4>
                            <v-text-field 
                                label="Hostname or IP"
                                clearable
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-card>
    </v-flex>
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
        apiProviders: {
            type: Array,
            default: {},
        },
        isKeyFieldShown: {
            type: Boolean,
            default: false,
        },
        isHostIpFieldShown: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {}
    },
    computed: {},
    methods: {
        providerChanged(val) {
            this.$emit('provider-changed', val);
        }
    },
}