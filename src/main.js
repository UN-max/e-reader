import Vue from 'vue'
import App from './App'

import { request, toast } from './network/index'
import './static/css/global.css'

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$toast = toast

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
