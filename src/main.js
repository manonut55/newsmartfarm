// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import '../node_modules/vuetify/dist/vuetify.min.css'
import Vuetify from '../node_modules/vuetify'

Vue.use(colors)
Vue.use(Vuetify)
var VueFire = require('vuefire')
Vue.use(VueFire)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import {
//   Vuetify,
//   VApp,
//   VNavigationDrawer,
//   VFooter,
//   VList,
//   VBtn,
//   VIcon,
//   VGrid,
//   VToolbar,
//   transitions,
//   VDataTable,
//   VTooltip
// } from 'vuetify'
// import '../node_modules/vuetify/src/stylus/app.styl'
// import colors from 'vuetify/es5/util/colors'
// Vue.use(Vuetify, {
//   components: {
//     VApp,
//     VNavigationDrawer,
//     VFooter,
//     VList,
//     VBtn,
//     VIcon,
//     VGrid,
//     VToolbar,
//     transitions,
//     VDataTable,
//     VTooltip
//   },
//   theme: {
//     primary: colors.red.darken1, // #E53935
//     secondary: colors.red.lighten4, // #FFCDD2
//     accent: colors.indigo.base, // #3F51B5
//     // primary: '#ee44aa',
//     // secondary: '#424242',
//     // accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107'
//   }
// })
// var VueFire = require('vuefire')
// Vue.use(VueFire)
// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
