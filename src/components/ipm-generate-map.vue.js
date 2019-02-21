let ipm_generate_map = {
    template: `
    <div :style='{ display: shown }'>

        <v-layout row wrap justify-center mb-5>

            <v-flex xs10 sm10 md10 lg10>
                <v-card style='overflow-x:auto;' ref='map_container' id='map-container'>
                    <div id='map-card' ref='map_card'></div>
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
            response: null,
            map: {
                object: null,
                height: '750px',
                titleLayer: null,
                displayElement: 'map-card',
                titleLayerString: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attributionString: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
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
        initMap(res, ip, lat, lon) {
            this.$refs.map_card.style.height = this.map.height;
            this.response = res.data;
            this.map.object = L.map(this.map.displayElement).setView([lat, lon], 13);
            L.tileLayer(this.map.titleLayerString, {
                attribution: this.map.attributionString,
                maxZoom: 14,
                minZoom: 10,
            }).addTo(this.map.object);
            L.marker([lat, lon], {
                title: `IP: ${ip} | lat: ${lat} | lon: ${lon}`,
                riseOnHover: true,
            }).bindPopup(`IP Information:<br/><pre>${this.jsonResponse}</pre>`, {
                maxWidth: "auto",
                maxHeight: "auto"
            }).addTo(this.map.object);
        },
        applyLeafletFix() {
            setTimeout((vm) => {
                vm.map.object.invalidateSize();
            }, 200, this);
        },
        clearMap() {
            if (this.map.object !== null) {
                this.map.object.remove();
            }
        },
        mapData(data) {
            // this is here to verify what we are being given
            switch (data.provider.name) {
                case "http://ip-api.com":
                    {
                        // No API key required here, but lets verify
                        if (data.provider.isKeyRequired === false) {
                            this.clearMap();
                            let h = data.host === '_current_' ? '' : data.host;
                            let u = `http://ip-api.com/json/${String(h)}`;
                            axios.get(u).then((res) => {
                                this.isShown = true;
                                let ip = res.data.query;
                                this.initMap(res, ip, res.data.lat, res.data.lon);
                                this.applyLeafletFix();
                            }).catch((err) => {
                                console.log(err);
                                alert(`Unable to gather map data from ${u}! We encountered the following error: ${err}`);
                                this.isShown = false;
                            });
                        }
                    }

                case "http://ipstack.com":
                    {
                        // API key is required here, lets verify
                        if (data.provider.isKeyRequired === true) {
                            this.clearMap();                            
                            let h = data.host === '_current_' ? 'check' : data.host;
                            let u = `http://api.ipstack.com/${String(h)}?access_key=${String(data.apiKey)}`;
                            axios.get(u).then((res) => {
                                this.isShown = true;
                                let ip = res.data.ip;
                                this.initMap(res, ip, res.data.latitude, res.data.longitude);
                                this.applyLeafletFix();
                            }).catch((err) => {
                                console.log(err);
                                alert(`Unable to gather map data from ${u}! We encountered the following error: ${err}`);
                                this.isShown = false;
                            });                            
                        }
                    }

            };
        }
    },
}