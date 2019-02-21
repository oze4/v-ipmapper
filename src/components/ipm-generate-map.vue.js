let ipm_generate_map = {
    template: `
    <div :style='{ display: shown }'>

        <v-layout row wrap justify-center mb-2>
            
            <v-flex xs10 sm6 md4 lg4>
                <v-card style='overflow-x:auto;'>
                    <v-card-text>
                        <pre>{{ jsonResponse }}</pre>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>

        <v-layout row wrap justify-center>

            <v-flex xs10 sm10 md10 lg10>
                <v-card style='overflow-x:auto;'>
                    <v-card-text>
                        <div id='map-card'></div>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>

    </div>
    `,
    props: {
        options: {
            type: Object,
        },
    },
    computed: {
        shown() {
            return this.isShown === false ? 'none' : '';
        },
        jsonResponse() {
            return JSON.stringify(this.response, undefined, 2)
        }
    },
    data() {
        return {
            isShown: false,
            response: '',
            overlay: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        };
    },
    watch: {
        options() {
            if (this.options) {
                this.mapData(this.options);
            }
        },
    },
    methods: {
        mapData(data) {
            // this is here to verify what we are being given
            switch (data.provider.name) {
                case "http://ip-api.com":
                    {
                        // No API key required here, but lets verify
                        if (data.provider.isKeyRequired === false) {
                            let h = data.host === '_current_' ? '' : data.host;
                            let u = `http://ip-api.com/json/${String(h)}`;

                            axios.get(u).then((res) => {

                                this.isShown = true;
                                this.response = res.data;
                                let lat = this.response.lat;
                                let long = this.response.lon;
                                let displayElement = 'map-card';
                                
                                let map = L.map(displayElement).setView([lat, long], 13);
                                L.tileLayer(this.overlay, {
                                    attribution: this.attribution
                                }).addTo(map);
                                L.marker([lat, long]).addTo(map);

                            }).catch((err) => {
                                alert(`Unable to gather map data from ${u}! We encountered the following error: ${err.error}`);
                            });
                            
                        }

                    }

                case "http://ipstack.com":
                    {
                        // API key is required here, lets verify
                        if (data.provider.isKeyRequired === true) {

                        }
                    }

            };
        }
    },
}