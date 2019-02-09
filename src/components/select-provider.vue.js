let select_provider = {
    template: `
    <v-flex xs12 md10>
        <v-card theme--light>
            <v-container>
                <v-select label="Select API Provider" @change="providerChanged" :items="api_providers"
                    item-text="label" :clearable=true>
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
                <v-text-field>
                </v-text-field>
            </v-container>
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
        api_providers: {
            type: Array,
        },
    },
    data: function () {
        return {}
    },
    computed: {},
    methods: {
        providerChanged: function (val) {
            if (val !== '' && val !== undefined) {
                this.$emit('provider-changed', val);
            }
        }
    },
}