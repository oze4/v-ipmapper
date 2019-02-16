let select_provider = {
    template: `
    <v-container>
        <v-layout justify-center wrap>
            <v-flex xs12 md10>
                <v-card class="elevation-10">
                    <v-form v-model="form.valid" ref="form" :key="form.key">
                        <v-container>
                            <v-layout justify-center wrap>
                                <v-flex xs12 md4>
                                    <v-select
                                        v-model="form.selected"
                                        label="Select API Provider"
                                        @change="providerChanged"
                                        @focusout="ifValidationErrorClearAfter(3000)"
                                        @click:clear="clearSelection"
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
                                        hide-details
                                        clearable
                                        required
                                        :rules="rules.requiredField"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex v-if="showHostIpField" xs12 md4>
                                    <v-text-field                                        
                                        label="Hostname or IP"
                                        hide-details
                                        clearable
                                        required
                                        :rules="rules.requiredField"
                                        :disabled='useCurrentIp'
                                        ref='host_ip_field'
                                    ></v-text-field>
                                    <ipm-use-current-ip-toggle
                                        :label='toggle.label'
                                        :labelFontSize='toggle.fontSize'
                                        :height='toggle.height'
                                        @switch-toggled='handleToggle'
                                    ></ipm-use-current-ip-toggle>
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
                        :disabled="!form.valid"
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
    components: {
        'ipm-use-current-ip-toggle': use_current_ip_toggle,
    },
    data() {
        return {
            toggle: {
                label: 'Use Current IP',
                height: 4,
                fontSize: 11,
            },
            form: {
                key: Date.now(),
                valid: false,
                selected: '',
            },
            rules: {
                requiredField: [
                    (v) => !!v || "This field is required!",
                ]
            },
            useCurrentIp: false,
        }
    },
    methods: {
        clearSelection() {
            this.resetFormUniqueKey();
            this.useCurrentIp = false;
        },
        resetFormUniqueKey() {
            /**
             * Had issues with resetting validation errors on click:clear.
             * Had to reset the rendered component :key, which re-renders the
             * form, thus all validation errors are cleared.
             * 
             * This had to be done using a promise so the DOM could render 
             * before mutation.
             */
            this.$nextTick().then(() => {
                this.form.key = Date.now();
            })
        },
        clearFormValidationErrors() {
            let s = this.form.selected;
            if (s === '' || s === undefined || s === null) {
                this.$refs.form.resetValidation();
            }
        },
        ifValidationErrorClearAfter(time) {
            /**
             * Checks if the selection is null/empty after focusout
             * and resets form validation after 'time' seconds so the error
             * doesnt just sit there forever.
             */
            let s = this.form.selected;
            if (s === '' || s === undefined || s === null) {
                setTimeout(this.clearFormValidationErrors, time);
            };
        },
        providerChanged(val) {
            this.$emit('provider-changed', val);
        },
        handleToggle(val) {
            let v = String(val);
            if (v === "true") {
                this.useCurrentIp = true;
                /**
                 * If validaion errors are active when 'use current ip'
                 * is toggled, this removes those displayed errors on JUST
                 * the host-ip field.
                 */
                this.$refs.host_ip_field.resetValidation();
            } else {
                this.useCurrentIp = false;
            }
        },
        generateMap() {
            /**
             * TODO
             */
        },
    },
}