let topbar = {     
    template: `
    <div>
        <v-toolbar color='primary' dark fixed flat app prominent> 
            <v-spacer></v-spacer>
            <a :href='logo.url' :rel='logo.rel' target='_blank' style='margin-top:5px;'>
                <img :src='logo.image' :alt='logo.alt' :style='logo.style'>
            </a>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar color='primary' dark flat :height='extensionHeight'>
                <v-layout text-xs-center>
                    <v-flex>
                        <span>{{ message.header }}</span>
                        <h2>{{ message.subHeader }}</h2>
                    </v-flex>
                </v-layout>
        </v-toolbar>
    </div>
    `,
    props: {
        extensionHeight: {
            type: Number,
            default: 64,
        },
    },
    computed: {},
    data() { 
        return {
            message: {
                header: "Welcome to v-ipmapper!",
                subHeader: "Map Public IP Addresses"
            },
            logo: {
                url: 'https://github.com/oze4',
                image: './docs/img/ostrike_logo.png',
                rel: 'noopener noreferrer',
                alt: 'matt_oestreich_github',
                style: 'width:56px; height:52px;',
            },
        }; 
    },
    methods: {}
}
