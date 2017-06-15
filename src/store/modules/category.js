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
import * as types from '../mutation-types'
import _ from 'lodash'
import {
  createCategory,
  getCategoryList
} from '../../api/category-api'

let flatCategories = function (state) {
  return _.chain(state.categoryList)
    .map('children')
    .flatten()
    .concat(state.categoryList)
}

const state = {
  activeCategoryId: null,
  categoryList: []
}

const getters = {
  allCategories: state => state.categoryList,
  activatedCategory: state => {
    let active = flatCategories(state)
      .filter({id: state.activeCategoryId})
      .value()
    return _.first(active)
  }
}

const actions = {
  addCategory: ({ commit }, category) => {
    commit(types.ADD_CATEGORY, {category})
  },
  loadCategoryList: ({ commit }) => {
    return getCategoryList().then(res => {
      let model = res.data
      if (model.ok) {
        let categoryList = model.body
        commit(types.RECEIVE_CATEGORY_LIST, {categoryList})
      }
      return Promise.resolve(model)
    }).catch(error => {
      return Promise.reject(error)
    })
  },
  activeCategory ({commit}, categoryId) {
    commit(types.ACTIVE_CATEGORY, categoryId)
  }
}

const mutations = {
  [types.RECEIVE_CATEGORY_LIST]: (state, { categoryList }) => {
    state.categoryList = categoryList
  },

  [types.ADD_CATEGORY]: (state, { category }) => {
    let asRoot = category.parentId === -1
    let parentCate = state.categoryList.find(cate => { return (cate.id === category.parentId) })

    if (asRoot || parentCate) {
      createCategory(category).then((res) => {
        console.log('createCategory', res)
        if (res.data.ok) {
          if (asRoot) {
            state.categoryList.push(category)
          } else {
            if (!parentCate.children) {
              Vue.set(parentCate, 'children', [])
            }
            parentCate.children.push(category)
          }
        }
      })
    }
  },

  [types.ACTIVE_CATEGORY]: (state, categoryId) => {
    state.activeCategoryId = categoryId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
