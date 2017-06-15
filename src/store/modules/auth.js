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

import * as types from '../mutation-types'

const AUTH_KEY = 'MALL_ADMIN_AUTH'

const auth = {
  state: {
    authInfo: {}
  },

  getters: {
    authInfo: state => state.authInfo
  },

  mutations: {
    [types.LOGIN]: (state, {authInfo}) => {
      window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(authInfo))
      state.authInfo = authInfo
    },
    [types.LOGOUT]: (state) => {
      window.sessionStorage.removeItem(AUTH_KEY)
      state.authInfo = {}
    }
  }
}
export default auth
