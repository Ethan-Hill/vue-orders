import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    userEmail: null,
  },
})

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
