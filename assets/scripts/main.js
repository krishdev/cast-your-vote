import Vue from 'vue';
//import App from './components/App.vue';
import Multiselect from 'vue-multiselect';
import VueResource from 'vue-resource';
import VueConfetti from 'vue-confetti';

Vue.component('multiselect', Multiselect)
Vue.use(VueResource);
Vue.use(VueConfetti);

new Vue({
  el: '#app',
  components: {
    
  },
  //render: h => h(App),
  data: {
    allStates: [],
    allConstitutions: [],
    allCandidates: [],
    name: 'world',
    form: {
      state: '',
      constitution: ''
    },
    final: {
      state: 'TN',
      constitution: 'Radhakrishnan Nagar - Chennai'
    },
    voteTo: ''
  },
  created () {
    this.getStates();
    this.getCandidates();
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
    'form.state' () {
      if (this.form.state) {
        this.form.constitution = '';
        this.getConstituions();
      }
    }
  },
  methods: {
    getStates () {
      this.$http.get('/data/statest-and-constitutions.json').then(res=> {
        this.allStates = res.body.map(item=> {
          return {
            state: item.state,
            fullName: item.stateFullName
          }
        });
      })
    },
    getConstituions () {
      this.$http.get('/data/statest-and-constitutions.json').then(res=> {
        this.allConstitutions = res.body.filter(item=>item.state === this.form.state.state).map(item=> {
          const constituencies = item.constituencies.map(item=>`${item.constituency} - ${item.district}`);
          
          return constituencies;
        })[0];
      })
    },
    getCandidates () {
      this.$http.get('/data/statest-and-constitutions.json').then(res=> {
        this.allCandidates = res.body.filter(item => item.state === this.final.state).map(item => item.majorParties)[0];
      });
    },
    voteCasted () {
      this.$confetti.start();
      setTimeout(()=>{
        this.$confetti.stop();
      }, 2800);
    }
  }
});