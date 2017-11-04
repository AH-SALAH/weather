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
    },
    data() {
        return {
            query: '',
            err: {'msg':'',val: false},
            loading: false,
        }
    },
    methods: {
        submitting: function () {
            let pat     = /[a-zA-Z ]/gi,
                rat     = /[^a-zA-Z ]/gi,
                q       = this.query.match(pat),
                Nt_V    = rat.test(this.query);

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

}