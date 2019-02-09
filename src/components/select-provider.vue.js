let select_provider = {
    template: `
    <v-form row>
        <v-container>
            <v-layout>
                <v-flex lg4 justify-center>
                    <v-select 
                        label="Select API Provider"
                        v-model="selectedProvider" 
                        @input="providerChanged" 
                        :items="api_providers" 
                        item-text="label"
                        :clearable=true
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
                <v-flex lg4>
                    <v-text-field>

                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
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
        return {
            selectedProvider: '',
        }
    },
    computed: {
        providerChanged: function () {
            if (this.selectedProvider !== '' && this.selectedProvider !== undefined) {
                this.$emit('provider-changed', this.selectedProvider);
            }
        }
    },
    methods: {},
}