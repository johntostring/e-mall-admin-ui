/*
 * Millimall is an E-commerce platform based on microservice architecture design
 * Copyright (C) 2017 John Zhang
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './routes'
import { axios } from 'MyHttp'
import Breadcrumb from './components/Breadcrumb'
import * as types from './store/mutation-types'
import AlbumManager from 'mall-ui-common/lib/album-manager'

Vue.use(ElementUI)
Vue.use(AlbumManager)
Vue.prototype.axios = axios
Vue.component('admin-breadcrumb', Breadcrumb)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `
    <div>
      <App/>
    </div>
  `,
  axios,
  router,
  store,
  components: {
    App
  }
}).$mount('#app')

let authInfo = window.sessionStorage.getItem('MALL_ADMIN_AUTH')
if (authInfo) {
  authInfo = JSON.parse(authInfo)
  store.commit(types.LOGIN, {authInfo})
}

router.beforeEach((to, from, next) => {
  // if (to.matched.some(r => r.meta.requireAuth)) {
  //
  // } else {
  //   next();
  // }
  console.log(store.state.auth.authInfo)
  if (to.path === '/login' || store.state.auth.authInfo.access_token) {
    next()
  } else {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  }
})
