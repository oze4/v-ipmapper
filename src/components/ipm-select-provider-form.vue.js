var ipm_select_provider_form = {
    components: {
        'ipm-use-current-ip-toggle': ipm_use_current_ip_toggle,
        'ipm-select': ipm_select,
        'ipm-generate-map': ipm_generate_map,
    },
    template: `
    <div>
        <v-container>
            <v-layout justify-center wrap>
                <v-flex xs12 md10>
                    <v-card class="elevation-10">
                        <v-form v-model='form.valid' ref='form'>
                            <v-container>
                                <v-layout justify-center wrap>
                                    <v-flex xs12 md4>
                                        <ipm-select
                                            v-model='selectedProvider'  
                                            @ipm-cleared='resetForm'                                      
                                        ></ipm-select>
                                    </v-flex>
                                    <v-flex v-if="fields.hostIp.show" xs12 md4>
                                        <v-text-field                                        
                                            :label='fields.hostIp.label'
                                            v-model='fields.hostIp.value'
                                            hide-details clearable required
                                            :rules="rules.requiredFieldWithToggle"
                                            :disabled='toggle.checked'
                                            ref='host_ip_field'
                                        ></v-text-field>
                                        <ipm-use-current-ip-toggle
                                            v-model='toggle.checked'
                                        ></ipm-use-current-ip-toggle>
                                    </v-flex>                                
                                    <v-flex v-if="fields.apiKey.show" xs12 md4>
                                        <v-text-field
                                            :label='fields.apiKey.label'
                                            v-model='fields.apiKey.value'
                                            hide-details clearable required
                                            :rules="rules.requiredField"
                                        ></v-text-field>
                                    </v-flex>                                
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card>
                    <v-container class="text-center">
                        <v-btn
                            @click="generateMap" 
                            v-ripple 
                            color="green"
                            :disabled="!form.valid"
                        >{{ form.button.text }}</v-btn>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
        <ipm-generate-map
            :options='map.options'
        ></ipm-generate-map>
    </div>
    `,
    props: {
        showApiKeyField: {
            type: Boolean,
            default: false,
        },
        showHostIpField: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {

    },
    data() {
        return {
            form: {
                valid: false,
                button: {
                    text: 'Generate Map',
                },
            },
            fields: {
                dropdown: {
                    selected: '',
                },
                hostIp: {
                    value: '',
                    label: 'Hostname or IP',
                    show: false,
                },
                apiKey: {
                    value: '',
                    label: 'API Key',
                    show: false,
                },
            },
            toggle: {
                checked: false,
            },
            rules: {
                requiredField: [(v) => !!v || "This field is required!"],
                requiredFieldWithToggle: [
                    (v) => {
                        if (this.toggle.checked) return true;
                        return !!v || "This field is required!"
                    }
                ],
            },
            map: {
                show: false,
                options: {},
            },
        }
    },
    computed: {
        selectedProvider: {
            get() {
                return this.fields.dropdown.selected;
            },
            set(provider) {
                if (provider !== '' && provider !== undefined) {
                    this.fields.dropdown.selected = provider;
                    this.fields.apiKey.show = provider.isKeyRequired;
                    this.fields.hostIp.show = true;
                } else {
                    this.fields.dropdown.selected = '';
                    this.fields.hostIp.show = this.fields.apiKey.show = false;
                };
            },
        },
    },
    watch: {
        'toggle.checked'() {
            if (this.fields.hostIp.value !== '') this.fields.hostIp.value = '';
            this.$refs.host_ip_field.reset();
        },
    },
    methods: {
        resetForm() {
            this.fields.hostIp.value = '';
            this.fields.apiKey.value = '';
            this.$refs.form.reset();
        },
        generateMap() {
            let selectedOptions = {
                provider: this.fields.dropdown.selected,
                host: this.toggle.checked === true ? '_current_' : this.fields.hostIp.value,
                apiKey: this.fields.apiKey.show === true ? this.fields.apiKey.value : false,
            };
            this.map.options = selectedOptions;
            //this.map.show = true;
        },
    },
};