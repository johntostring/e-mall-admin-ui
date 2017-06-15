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

import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import attributeTemplate from './modules/attribute-template'
import attributesOptions from './modules/attribute-option'
import auth from './modules/auth'
import albumManagerStore from 'mall-ui-common/lib/albumManagerStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  },

  modules: {
    auth,
    category,
    attributeTemplate,
    attributesOptions,
    albumManagerStore
  },

  actions: {

  },

  mutations: {

  },

  getters: {

  }
})

export default store
