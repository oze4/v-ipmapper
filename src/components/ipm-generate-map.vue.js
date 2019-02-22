let ipm_generate_map = {
    /**
     * 
     * I am only temporarily using jQuery in here for testing
     * and bc f*ck Axios and issues with 307
     * 
     */
    template: `
    <div :style='{ display: shown }'>
        <v-layout row wrap justify-center mb-5>
            <v-flex xs10 sm10 md10 lg10>
                <v-card style='overflow-x:auto;' ref='map_container' id='map-container'>
                    <v-card-title class='justify-center'>
                        <h3>Click Marker For More Info</h3>
                    </v-card-title>
                    <div id='map-card' ref='map_card' :style="{ height: mapHeight + 'px' }"></div>
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
            return JSON.stringify(this.response, undefined, 2);
        },
        mapHeight() {
            if (this.map !== null) {
                setTimeout((vm) => {
                    vm.map.invalidateSize();
                }, 200, this);
            }
            return this.$vuetify.breakpoint.height - 125;
        },
    },
    data() {
        return {
            isShown: false,
            response: null,
            map: null,
        };
    },
    watch: {
        options() {
            if (this.options) {
                this.initMap(this.options);
            }
        },
    },
    methods: {
        buildMap(res, ip, lat, lon) {
            this.clearMap();
            this.isShown = true;
            this.response = res;

            this.map = L.map('map-card')
                .setView([lat, lon], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 14,
                minZoom: 10,
            }).addTo(this.map);

            L.marker([lat, lon], {
                title: `IP: ${ip} | lat: ${lat} | lon: ${lon}`,
                riseOnHover: true,
            }).bindPopup(`IP Information:<br/><pre>${this.jsonResponse}</pre>`, {
                maxWidth: "auto",
                maxHeight: "auto"
            }).addTo(this.map);

            setTimeout((vm) => {
                vm.map.invalidateSize();
            }, 200, this);

        },
        clearMap() {
            if (this.map !== null) {
                this.map.remove();
            }
        },
        handleAxiosError(url, error) {
            alert(`Unable to gather map data from ${url}! We encountered the following error: ${error}`);
        },
        initMap(data) {
            // this is here to verify what we are being given
            switch (data.provider.name) {
                case "http://ip-api.com":
                    {
                        // No API key required here, but lets verify
                        if (data.provider.isKeyRequired === false) {
                            let h = data.host === '_current_' ? '' : `/${data.host}`; // cannot send request with trailing "/"
                            let u = `http://ip-api.com/json${String(h)}`;
                            var vm = this;
                            $.ajax(u, {
                                method: 'get',
                                success(res) {
                                    vm.buildMap(res, res.query, res.lat, res.lon);
                                },
                                error(err) {
                                    console.log(err);
                                },
                            })
                            /*axios.get(u).then((res) => {
                                this.buildMap(res, res.data.query, res.data.lat, res.data.lon);
                            }).catch((err) => {
                                this.handleAxiosError(u, err);
                            });*/
                        }
                    }

                case "http://ipstack.com":
                    {
                        // API key is required here, lets verify
                        if (data.provider.isKeyRequired === true) {
                            let h = data.host === '_current_' ? 'check' : data.host;
                            let u = `http://api.ipstack.com/${String(h)}?access_key=${String(data.apiKey)}`;
                            $.ajax(u, {
                                method: 'get',
                                success(res) {
                                    this.buildMap(res, res.data.ip, res.data.latitude, res.data.longitude);
                                },
                                error(err) {
                                    console.log(err);
                                },
                            })
                            /*
                            axios.get(u).then((res) => {
                                this.buildMap(res, res.data.ip, res.data.latitude, res.data.longitude);
                            }).catch((err) => {
                                this.handleAxiosError(u, err);
                            });
                            */
                        }
                    }
            };
        }
    },
}

