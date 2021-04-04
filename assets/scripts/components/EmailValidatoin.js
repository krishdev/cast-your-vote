import Vue from 'vue';


Vue.component('email-validation', {
    data () {
        return {
            emailToVerify: '',
            isValid: '',
            formSubmitted: false
        }
    },
    created () {

    },
    watch: {
        emailToVerify () {
            this.checkEmail();
        }
    },
    methods: {
        submitEmail () {
            this.formSubmitted = true;
            this.checkEmail();
            if (this.isValid) {
                document.querySelector('#emailForm').submit();
            }
        },
        checkEmail () {
            let isValid = false;
            const regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (this.emailToVerify) {
                isValid = regx.test(this.emailToVerify);
            }
            this.isValid = isValid;
        }
    }
})