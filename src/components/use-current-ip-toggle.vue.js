let use_current_ip_toggle = {
    template: `
    <v-switch
        ref="toggler"
        :height='height'
        :label='label'
    ></v-switch>    
    `,
    props: {
        label: {
            type: String,
            default: ''
        },
        labelFontSize: {
            type: String | Number,
            default: 1,
        },
        height: {
            type: String | Number,
            default: '',
        },
    },
    mounted() {
        this.setToggleLabelTextSize();
    },
    methods: {
        setToggleLabelTextSize() {
            /**
             * TODO:
             * THIS IS BROKEN WHY WONT THIS WORK
             */
            let t = this.$refs.toggler.$el.querySelector("label")
            t.style.fontSize = "100px;";
            console.log(t.style);
        },
    }
}