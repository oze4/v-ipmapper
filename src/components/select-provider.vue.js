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
                                        v-model='dropdown.selected'
                                        :label='dropdown.label'
                                        @click:clear="resetFormUniqueKey"
                                        :items="apiProviders"
                                        item-text="name" 
                                        clearable 
                                        return-object
                                        persistent-hint
                                        :hint='dropdown.hint'
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
                                        :label='fields.apiKey.label'
                                        v-model='fields.apiKey.value'
                                        hide-details
                                        clearable
                                        required
                                        :rules="rules.requiredField"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex v-if="showHostIpField" xs12 md4>
                                    <v-text-field                                        
                                        :label='fields.hostIp.label'
                                        v-model='fields.hostIp.value'
                                        hide-details
                                        clearable
                                        required
                                        :rules="rules.requiredField"
                                        :disabled='toggle.checked'
                                        ref='host_ip_field'
                                    ></v-text-field>
                                    <ipm-use-current-ip-toggle
                                        :label='toggle.label'
                                        :labelFontSize='toggle.fontSize'
                                        :height='toggle.height'
                                        v-model='toggle.checked'
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
                checked: false,
            },
            form: {
                key: Date.now(),
                valid: false,
            },
            dropdown: {
                selected: '',
                label: 'Select API Provider',
                hint: `<small><i class='mdi mdi-key red--text'></i> means API key is required</small>`,
            },
            fields: {
                hostIp: {
                    value: '',
                    label: 'Hostname or IP',
                },
                apiKey: {
                    value: '',
                    label: 'API Key',
                },
            },
            rules: {
                requiredField: [
                    (v) => { 
                        if (this.toggle.checked) return true;
                        return !!v || "This field is required!";
                    },
                ]
            },
        }
    },
    watch: {
        'toggle.checked'() {            
            if (this.fields.hostIp.value !== '') this.fields.hostIp.value = '';
            this.$refs.host_ip_field.resetValidation();
        },
        'dropdown.selected'() {
            this.$emit('provider-changed', this.dropdown.selected);
        }
    },
    methods: {
        resetFormUniqueKey() {
            console.log('resetFormUniqueKey()');
            this.$nextTick().then(() => {
                this.form.key = Date.now();
            })
            this.toggle.checked = false;
        },
        generateMap() {
            /**
             * TODO
             */
        },
    },
};