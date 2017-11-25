import toast from '../../helperComponents/toast.vue';

export default {
    components: {
        'my-toast': toast
        },
    props: {
        searching: {
            type: Object,
        },
        apiimgerr: {
            type: Object,
        },
        initLoader: {
            type: Boolean
        },
        placeName: {
            type: String
        }
    },
    data() {
        return {
            query: '',
            vali: {'good':false,'ok':false,'bad':false},
            err: {'msg':'','val': false},
            loading: false,
        }
    },
    methods: {
        submitting: function () {
            let pat     = /[a-zA-Z ]/gi,
                rat     = /[^a-zA-Z ]/gi,
                q       = this.query.match(pat),
                Nt_V    = rat.test(this.query);

                // if autocomplete name chosen put it in place of the query..
                if(this.placeName != '') this.query = this.placeName;

                // hide autocomplete menu , no need to be still opened
                document.querySelector('.pac-container') ? document.querySelector('.pac-container').style.display = 'none' : '';

            if (this.query != '' && q != null && this.query.length > 1 && Nt_V != true) {
                this.err.msg = '';
                this.err.val = false;
                let valid = this.query.replace(/[^a-zA-Z ]/gi, "").toLocaleLowerCase();
                this.$emit('searching', { "val": true, "query": valid ,"loading": true});
            } else {
                this.err.msg = "Not valid search..!";
                this.err.val = true;
            }
            // ==================

        },

    },
    computed: {
        sign: function () {
            return () => {
                let el = document.querySelector('#search-component .query');

                if (this.query.length == 0) {
                    el.querySelector('span').style.width = 0+'%';
                    this.vali.good  = false;
                    this.vali.ok    = false;
                    this.vali.bad   = false;
                }

                if (this.query.match(/^[a-zA-Z]/gi) && this.query.length == 1) {
                    el.querySelector('span').style.width = 50+'%';
                    this.vali.good  = false;
                    this.vali.ok    = true;
                    this.vali.bad   = false;
                }else if(this.query.match(/^[a-zA-Z]/gi) && this.query.length > 1) {
                    el.querySelector('span').style.width = 100+'%';
                    this.vali.good  = true;
                    this.vali.ok    = false;
                    this.vali.bad   = false;
                }else if (!this.query.match(/^[a-zA-Z]/gi) && this.query.length > 0) {
                    el.querySelector('span').style.width = 100+'%';
                    this.vali.good  = false;
                    this.vali.ok    = false;
                    this.vali.bad   = true;
                }
            }
        }
    }

}