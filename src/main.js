import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(VueCookies, { expires: '7d'});
Vue.use(VueMeta,{
  refreshOnceOnNavigation: true
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
