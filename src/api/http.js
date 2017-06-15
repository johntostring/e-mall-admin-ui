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

import axios from 'axios'
import store from '../store'
import * as types from '../store/mutation-types'
import router from '../routes'
import { Notification } from 'element-ui'

const adminApiGateway = `http://localhost:9898`
const uploadServer = `http://localhost:9801`
const imageServer = `http://localhost:9333`
const imagePreviewUrl = `${imageServer}`
const uploadUrl = `${uploadServer}/upload`
const goodsApiUrl = `${adminApiGateway}/goods-api/v1`
const albumApiUrl = `${adminApiGateway}/album-api/v1`

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = adminApiGateway
axios.defaults.headers.common['Content-Type'] = 'application/json'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    let authInfo = store.state.auth.authInfo
    if (authInfo) {
      config.headers.Authorization = `${authInfo.token_type} ${authInfo.access_token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    let model = response.data
    if (model && !model.ok) {
      Notification.error({
        title: '提示',
        message: model.message
      })
      return Promise.reject({response})
    }
    return response
  },
  error => {
    let response = error.response
    if (response) {
      let data = response.data
      let message = data.message
      switch (response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
          message = '登录超时，请重新登录'
          break
        default:
      }
      Notification.error({
        title: '提示',
        message: message
      })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  })

export { axios, goodsApiUrl, uploadUrl, imagePreviewUrl, albumApiUrl }
