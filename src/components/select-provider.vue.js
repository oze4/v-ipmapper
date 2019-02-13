let select_provider = {
    template: `
    <v-container>
        <v-layout justify-center wrap>
            <v-flex xs12 md10>
                <v-card class="elevation-10">
                    <v-form v-model="valid" ref="form" :key="formUniqueKey">
                        <v-container>
                            <v-layout justify-center wrap>
                                <v-flex xs12 md4>
                                    <v-select
                                        v-model="selectedItem"
                                        label="Select API Provider"
                                        @change="providerChanged"
                                        @focusout="ifValidationErrorClearAfter(3000)"
                                        @click:clear="resetFormUniqueKey"
                                        :items="apiProviders"
                                        item-text="name" 
                                        clearable 
                                        return-object
                                        persistent-hint
                                        hint="<small><i class='mdi mdi-key red--text'></i> means API key is required</small>"
                                        required
                                        :rules="rules.requiredField"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            {{ data.item.name }}
                                            <span v-if="data.item.isKeyRequired" class="mdi mdi-key red--text"></span>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            {{ data.item.name }}
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
                        color="green"
                        :disabled="!valid"
                    >Generate Map</v-btn>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
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
    data() {
        return {
            formUniqueKey: Date.now(),
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
        resetFormUniqueKey() {
            /**
             * Had issues with resetting validation errors on click:clear.
             * Had to reset the rendered components :key, which re-renders the
             * form, thus all validation errors are cleared.
             * 
             * This had to be done using a promise so the DOM could render 
             * before mutation.
             */
            this.$nextTick().then(() => {
                this.formUniqueKey = Date.now();
            })
        },
        clearValidation() {
            this.$refs.form.resetValidation();
        },
        ifValidationErrorClearAfter(time) {
            /**
             * Checks if the selection is null/empty after focusout
             * and resets form validation after 3 seconds so the error
             * doesnt just sit there forever.
             */
            let s = this.selectedItem;
            if (s === '' || s === undefined || s === null) {
                setTimeout(this.clearValidation, time);
            };
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