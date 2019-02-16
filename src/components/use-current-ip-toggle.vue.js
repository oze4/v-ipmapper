let use_current_ip_toggle = {
    template: `
    <v-switch
        ref="toggler"
        :height='height'
        :label='label'
        @change='handleToggled'
        v-model='state'
    ></v-switch>    
    `,
    props: {
        label: {
            type: String,
            default: '',
        },
        labelFontSize: {
            type: String | Number,
            default: 12,
        },
        height: {
            type: String | Number,
            default: '',
        },
    },
    data() {
        return {
            state: false,
        }
    },
    mounted() {
        this.setToggleLabelTextSize();
    },
    methods: {
        handleToggled() {
            this.$emit('switch-toggled', this.state.toString());
        },
        setToggleLabelTextSize() {
            this.$refs.toggler.$el.querySelector('label')
                .style.fontSize = this.labelFontSize + 'px';
        },
    }
}