let ipm_use_current_ip_toggle = {
    /**
     * This had to be its own component because I couldnt
     * figure out how to set the font size on the label 
     * for the toggler.
     */
    template: `
    <v-switch
        ref="toggler"
        :height='height'
        :label='label'
        v-model='state'
    ></v-switch>    
    `,
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            label: 'Use Current IP',
            height: 4,
            fontSize: 11,
        }
    },
    computed: {
        state: {
            get() {
                return this.value;
            },
            set(state) {
                this.$emit('input', state);
            }
        },
        setToggleLabelTextSize() {
            this.$refs.toggler.$el.querySelector('label').style.fontSize = this.fontSize + 'px';
        },
    },
    mounted() {
        this.setToggleLabelTextSize;
    },
    methods: {}
};