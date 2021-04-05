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
    allCandidates: window.glObj?.parties || [],
    name: 'world',
    state: window.glObj?.state,
    constituencyId: window.glObj?.constituencyId,
    voteTo: '',
    formSubmitted: false,
    isValid: false
  },
  created () {
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
    voteCasted () {
      this.formSubmitted = true;
      this.checkValid();
      if (this.isValid) {
        document.querySelector("#castForm").submit();
      }
    },
    checkValid () {
      this.isValid = this.voteTo ? true : false;
    },
    copyToClipboard(text) {
      if (window.clipboardData && window.clipboardData.setData) {
          // IE specific code path to prevent textarea being shown while dialog is visible.
          return clipboardData.setData("Text", text); 
  
      } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
          var textarea = document.createElement("textarea");
          textarea.textContent = text;
          textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
          document.body.appendChild(textarea);
          textarea.select();
          try {
              return document.execCommand("copy");  // Security exception may be thrown by some browsers.
          } catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
              return false;
          } finally {
              document.body.removeChild(textarea);
          }
      }
    },
    clickToCopy () {
      this.copyToClipboard('https://electyourfuture.com/results/');
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