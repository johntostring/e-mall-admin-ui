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
import * as api from '../../api/attribute-option-api'

const state = {
  attributesOptions: []
}

const getters = {
  attributesOptions: state => state.attributesOptions
}

const actions = {
  getAttributesOptionsByType: ({ commit }, {categoryId, attributeType}) => {
    return api.getAttributesOptionsByType(categoryId, attributeType).then(res => {
      let model = res.data
      if (res.status === 204) {
        commit(types.REMOVE_TEMPLATE_ATTRIBUTES_OPTIONS, {attributeType})
      } else if (model.ok) {
        let attributesOptions = model.body
        if (attributesOptions && attributesOptions.length > 0) {
          // commit(types.RECEIVE_ATTRIBUTES_OPTIONS, {attributesOptions})
          commit(types.RECEIVE_TEMPLATE_ATTRIBUTES_OPTIONS, {attributesOptions})
        } else {
          commit(types.REMOVE_TEMPLATE_ATTRIBUTES_OPTIONS, {attributeType})
        }
      }
      return Promise.resolve(model)
    }).catch(error => {
      return Promise.reject(error)
    })
  },

  createAttributeForTemplate: ({commit}, attribute) => {
    api.createAttributeForTemplate(attribute.categoryId, attribute).then(res => {
      let model = res.data
      if (res.status === 201 || model.ok) {
        let attribute = model.body
        commit(types.ADD_TEMPLATE_ATTRIBUTE, attribute)
      }
      return Promise.resolve(model)
    }).catch(error => {
      return Promise.reject(error)
    })
  },

  updateAttributeForTemplate: ({commit}, attribute) => {
    return api.updateAttributeForTemplate(attribute.categoryId, attribute).then(res => {
      let model = res.data
      if (res.status === 200 || model.ok) {
        let attribute = model.body
        commit(types.UPDATE_TEMPLATE_ATTRIBUTE, attribute)
      }
      return Promise.resolve(model)
    }).catch(error => {
      return Promise.reject(error)
    })
  },

  createOptionForAttribute: ({ commit, getters }, option) => {
    return api.createOptionForAttribute(option).then(res => {
      let model = res.data
      let option = model.body
      let attribute = getters.activatedTemplate.attributes.find((current) => {
        return (current.attribute.id === option.attributeId)
      })
      commit(types.ADD_ATTRIBUTE_OPTION, {attribute, option})
      return Promise.resolve(model)
    }).catch(error => {
      return Promise.reject(error)
    })
  },

  deleteOptionOfAttribute: ({ commit, getters }, option) => {
    console.log('deleteOptionOfAttribute', getters)
    return api.deleteOptionOfAttribute(option.id).then(res => {
      let model = res.data
      if (res.status === 200 && model.ok) {
        commit(types.DELETE_ATTRIBUTE_OPTION, {
          template: getters.activatedTemplate,
          option: option
        })
        return Promise.resolve(model)
      }
      return Promise.reject(model)
    }).catch(error => {
      return Promise.reject(error)
    })
  },

  updateOptionForAttribute: ({ commit, getters }, option) => {
    return api.updateOptionForAttribute(option).then(res => {
      let model = res.data
      if (model.ok) {
        let attribute = getters.activatedTemplate.attributes.find((current) => {
          return (current.attribute.id === option.attributeId)
        })
        commit(types.UPDATE_ATTRIBUTE_OPTION, {attribute, option})
        return Promise.resolve(model)
      }
    }).catch(error => {
      return Promise.reject(error)
    })
  }
}

const mutations = {
  [types.RECEIVE_ATTRIBUTES_OPTIONS]: (state, {attributesOptions}) => {
    state.attributesOptions = attributesOptions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
