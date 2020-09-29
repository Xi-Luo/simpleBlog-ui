import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from "vue-session/index.esm";
import store from './store/index'
import moment from "moment";

Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://localhost:8080/'
Vue.use(VueSession)
Vue.prototype.$axios =axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$moment = moment

router.beforeEach((to,from,next)=>{
  if (to.meta.require) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect:to.fullPath}
      })
    }
  } else {
    next()
  }
})


new Vue({
  router,
  render: h => h(App),
  store,
  comments:{App},
  template:'<App/>'
}).$mount('#app')
