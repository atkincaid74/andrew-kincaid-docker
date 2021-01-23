import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store';
import { router } from "./router";
import axios from 'axios';
import VueSession from 'vue-session';

Vue.config.productionTip = false;
Vue.use(VueSession);

Vue.mixin({
  methods: {
    camelize(str) {
      return str.replace(/[^a-z ]/ig, '').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      })
    },
  }
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');

// axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ?
//     'http://localhost:8000/' :
//     'backend:8000/';
axios.defaults.baseURL = `http://${location.hostname}:8000/`;
// axios.defaults.headers['Authorization'] = `JWT ${store.state.token !== null ? store.state.token : ''}`;
