import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VueResource from 'vue-resource';
Vue.component('multiselect', Multiselect)
Vue.use(VueResource);


Vue.component('state-validation', {
    data () {
        return {
            allStates: window.glObj?.states || [],
            allConstitutions: [],
            form: {
                state: '',
                constitution: ''
            },
            final: {
                state: 'TN',
                constitution: 'Radhakrishnan Nagar - Chennai'
            },
        }
    },
    created () {
        // this.getStates();
    },
    mounted () {
        var $menuIcon = document.querySelector("#hamburger-menu");
        var $menuItems = document.querySelector(".c-Main-nav");
        var $body = document.querySelector('body');

        $menuIcon.addEventListener("click", function () {
            var classList = $menuItems.classList || [];
            if (classList && classList.length) {
                classList = Array.from(classList);
                var isVisible = classList.indexOf('show') === -1 ? false : true;
                if (isVisible) {
                    $menuItems.classList.remove('show');
                    $body.classList.remove('menu-open');
                } else {
                    $menuItems.classList.add('show');
                    $body.classList.add('menu-open');
                }
            }
        });
    },
    watch: {
    },
    methods: {
        getConstituions (query) {
          this.$http.post('/api/get-constitutions/', {
            state: this.form.state.code,
            keywords: query
          }).then(res=> {
            if (res && res.body && Array.isArray(res.body) && res.body.length)
            this.allConstitutions = res.body.map(item=> {
              const constituencies = `${item.constituency} - ${item.district}`;
              
              return {
                id: item.id,
                constituencies
              };
            });
          })
        },
    }
});