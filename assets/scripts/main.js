import Vue from 'vue';
//import App from './components/App.vue';
import VueConfetti from 'vue-confetti';
import EmailValidation from './components/EmailValidatoin';
import StateValidation from './components/StateValidation';

Vue.use(VueConfetti);

new Vue({
  el: '#app',
  components: {
    // EmailValidation
  },
  //render: h => h(App),
  data: {
    allCandidates: [],
    name: 'world',
    state: window.glObj?.state,
    constituencyId: window.glObj?.constituencyId,
    voteTo: '',
    formSubmitted: false,
    isValid: false
  },
  created () {
    this.getCandidates();
  },
  mounted () {
    if (window.voteSuccess) {
      setTimeout(()=>{
        this.$confetti.start();
        setTimeout(()=>{
          this.$confetti.stop();
        }, 1250);
      }, 750);
    }
  },
  watch: {
    voteTo () {
      this.checkValid();
    }
  },
  methods: {
    getCandidates () {
      this.$http.get('/data/statest-and-constitutions.json').then(res=> {
        this.allCandidates = res.body.filter(item => item.state === this.state).map(item => item.majorParties)[0];
      });
    },
    voteCasted () {
      this.formSubmitted = true;
      this.checkValid();
      if (this.isValid) {
        document.querySelector("#castForm").submit();
      }
    },
    checkValid () {
      this.isValid = this.voteTo ? true : false;
    }
  }
});

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