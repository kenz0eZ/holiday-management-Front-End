import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import MdiVue from 'mdi-vue/v2';
import 'mdi-vue/v2/css/materialdesignicons.css'; // Import the CSS

Vue.config.productionTip = false
Vue.use(MdiVue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
