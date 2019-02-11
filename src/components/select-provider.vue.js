let select_provider = {
    template: `
    <v-flex xs12 md10>
        <v-card class="elevation-10">
            <v-form v-model="valid" ref="form">
                <v-container>
                    <v-layout justify-center wrap>
                        <v-flex xs12 md4>
                            <v-select
                                v-model="selectedItem"
                                label="Select API Provider"
                                @change="providerChanged"
                                @focusout="checkValidation"
                                @click:clear="checkValidation"
                                :items="apiProviders"
                                item-text="provider" 
                                clearable 
                                return-object
                                persistent-hint
                                hint="<small><i class='mdi mdi-key red--text'></i> means API key is required</small>"
                                required
                                :rules="rules.requiredField"
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.provider }}
                                    <span v-if="data.item.isKeyRequired" class="mdi mdi-key red--text"></span>
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.provider }}
                                    <span v-if="data.item.isKeyRequired" class="mdi mdi-key red--text"></span>
                                </template>
                            </v-select>
                        </v-flex>
                        <v-flex v-if="showApiKeyField" xs12 md4>
                            <v-text-field
                                label="API Key"
                                clearable
                                required
                                :rules="rules.requiredField"
                            ></v-text-field>
                        </v-flex>
                        <v-flex v-if="showHostIpField" xs12 md4>
                            <v-text-field
                                label="Hostname or IP"
                                clearable
                                required
                                :rules="rules.requiredField"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-card>
        <v-container class="text-xs-center">
            <v-btn 
                @click="generateMap" 
                v-ripple 
                :class="{ red: !valid, green: valid }"
                :disabled="!valid"
            >Generate Map</v-btn>
        </v-container>
    </v-flex>
    `,
    props: {
        apiProviders: {
            type: Array,
            default: {},
        },
        showApiKeyField: {
            type: Boolean,
            default: false,
        },
        showHostIpField: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            valid: false,
            selectedItem: '',
            rules: {
                requiredField: [
                    (v) => !!v || "This field is required!",
                ]
            },
        }
    },
    computed: {},
    watch: {},
    methods: {
        checkValidation() {
            let s = this.selectedItem;
            function cve(f) {
                f.$refs.form.resetValidation();
            };
            if (s === '' || s === undefined || s === null) {
                setTimeout(cve, 3000, this);
            }
        },
        providerChanged(val) {
            this.$emit('provider-changed', val);
        },
        generateMap() {
            /**
             * TODO
             */
        },
    },
}