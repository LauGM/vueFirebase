import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@/assets/css/main.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('filtroDecimal',function(precio){
  return precio.toFixed(2);
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
