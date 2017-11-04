import mapComponent from './map_component/mapComponent.vue';

export default {
    components: { 'map-component': mapComponent },
    props: {
        searching: {
            type: Object,
        },
        wData: {
            type: Object,
        },

    },
    data() {
        return {
            now: new Date().toLocaleDateString(),
            mapping: false,
            tomorrow: false,
            f_checked: '',
        }
    },
    methods: {
        closeWeather: function () {
            this.$emit('closed', !this.searching.val);
            this.searching.val = false;
            this.mapping = false;
            let p = location.pathname.toString().trim().toLocaleLowerCase();
            if (p.lastIndexOf('/showweather') > -1) {
                let np = p.replace('/showweather','/');
                history.pushState({data : this.searching.val},'',np);
            }
        },
        showMap: function () {
            this.mapping = !this.mapping;
        },
        showTomorrow: function () {
            this.tomorrow = !this.tomorrow;
        },

    },
    computed: { //get today & tomorrow word
        gettoday: function () {
            var d = new Date().getDay();
            switch (d) {
                case 0: d = "Sunday"; break;
                case 1: d = "Monday"; break;
                case 2: d = "Tuesday"; break;
                case 3: d = "Wednesday"; break;
                case 4: d = "Thursday"; break;
                case 5: d = "Friday"; break;
                case 6: d = "Saturday"; break;
            }
            return d;
        },
        gettomorrow: function () {
            var d = new Date().getDay() + 1;
            if (d == 7) d *= 0;
            switch (d) {
                case 0: d = "Sunday"; break;
                case 1: d = "Monday"; break;
                case 2: d = "Tuesday"; break;
                case 3: d = "Wednesday"; break;
                case 4: d = "Thursday"; break;
                case 5: d = "Friday"; break;
                case 6: d = "Saturday"; break;
            }
            return d;
        }, // convert Celsius to Fahrenheit & vs
         minC2F: function () {
                let val = this.tomorrow ? this.wData.tomorrow.min_temp : this.wData.today.min_temp;
                return Math.floor((val * 9/5) + 32);
        },
         maxC2F: function () {
                let val = this.tomorrow ? this.wData.tomorrow.max_temp : this.wData.today.max_temp;
                return Math.floor((val * 9/5) + 32);
         },
         
    },
    filters: {
        capitalize: function (val) {
            if (!val) return '';
            return val = val.toString().charAt(0).toLocaleUpperCase() + val.slice(1);
        },
        reverseDate: function (val) {
            return val.split('-').reverse().join('-');
        }
    },
    beforeUpdate() {
        let self = this;
        function l_info_pos_solve() {
            // solve l-side icon position issue in chrome for small screen size
            let webkit = window.navigator.userAgent.search(/chrome/gim) > -1,
                icon = self.$refs.w_icon,
                icon_org_style = icon.style;

            if (webkit && window.innerWidth < 768) {
                icon.style.position = "relative";
                icon.style.left = 0;
            } else {
                icon.style = icon_org_style;
            }

            window.onresize = function () {
                if (webkit && window.innerWidth < 768) {
                    icon.style.position = "relative";
                    icon.style.left = 0;
                } else {
                    icon.style = icon_org_style;
                }
            }
        } l_info_pos_solve();

    },
    mounted() {
        let self = this;
        // generate ggl srcmap
        function gglmap_scr() {
            let el = document.createElement('script'),
                lang = window.navigator.languages[1],
                attrs = [{'src':'https://maps.googleapis.com/maps/api/js?key=AIzaSyC7HkqpB-JZagKJ-Q2KbfOftwy0yzTA904&amp;callback=initMap&amp;language=' + lang + ''},
                    {'id':'ggl-map'},
                    {'async': true},
                    {'defer': true}
                    ];

                    attrs.map(function(obj){
                        for (let key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                el.setAttribute(key,obj[key]);
                            }
                        }
                    });

            if (!document.getElementById('ggl-map')) {
                self.$parent.$parent.$el.appendChild(el);
            }
        } gglmap_scr();

        // ===========================

    },
}