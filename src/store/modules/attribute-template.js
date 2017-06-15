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
import * as api from '../../api/attribute-template-api'
import _ from 'lodash'

const state = {
  activeAttributeType: null,
  templateList: [
    {
      attributeType: 0,
      attributeTypeName: '搜索属性模板',
      attributes: [],
      newAttribute: {
        name: ''
      }
    },
    {
      attributeType: 1,
      attributeTypeName: '产品属性模板',
      attributes: [],
      newAttribute: {
        name: ''
      }
    },
    {
      attributeType: 2,
      attributeTypeName: 'SKU属性模板',
      attributes: [],
      newAttribute: {
        name: ''
      }
    },
    {
      attributeType: 3,
      attributeTypeName: '规格属性模板',
      attributes: [],
      newAttribute: {
        name: ''
      }
    }
  ]
}

const getters = {
  allTemplates: state => state.templateList,
  activatedTemplate: (state) => {
    return state.templateList.find((current) => {
      return current.attributeType === state.activeAttributeType
    })
  }
}

const actions = {
  clearTemplateList: ({commit}) => {
    commit(types.ACTIVE_CATEGORY, null)
    commit(types.CLEAR_TEMPLATE_LIST)
  },
  loadTemplateList: ({ commit, dispatch }, categoryId) => {
    return api.getTemplatesByCategory(categoryId).then((res) => {
      if (res.status === 204) {
        commit(types.CLEAR_TEMPLATE_LIST)
        return
      }
      let model = res.data
      if (model.ok) {
        let templateList = model.body
        if (templateList && templateList.length > 0) {
          commit(types.RECEIVE_TEMPLATE_LIST, {templateList})
          let attributeType = templateList[0].attributeType
          dispatch('getAttributesOptionsByType', {categoryId, attributeType})
        }
      }
    })
  },
  createTemplateForCategory: ({commit}, template) => {
    api.createTemplateForCategory(template).then(res => {
      let model = res.data
      if (res.status === 201 || model.ok) {
        let template = model.body
        commit(types.ADD_TEMPLATE, template)
      }
    })
  },
  activeTemplateByAttributeType: ({commit}, attributeType) => {
    commit(types.ACTIVE_TEMPLATE, attributeType)
  }
}

const mutations = {
  [types.RECEIVE_TEMPLATE_LIST]: (state, { templateList }) => {
    for (let i in templateList) {
      let tpl = templateList[i]
      let target = state.templateList.find((current) => {
        return current.attributeType === tpl.attributeType
      })
      if (target) {
        Vue.set(target, 'templateId', tpl.id)
        Vue.set(target, 'name', tpl.name)
      }
    }
  },
  [types.RECEIVE_TEMPLATE_ATTRIBUTES_OPTIONS]: (state, {attributesOptions}) => {
    let attribute = null
    if (attributesOptions && attributesOptions.length > 0) {
      attribute = attributesOptions[0].attribute
    }
    let target = state.templateList.find((current) => {
      return (current.templateId === attribute.templateId) && (current.attributeType === attribute.attributeType)
    })
    if (target) {
      Vue.set(target, 'attributes', attributesOptions)
    }
  },
  [types.REMOVE_TEMPLATE_ATTRIBUTES_OPTIONS]: (state, {attributeType}) => {
    for (let i in state.templateList) {
      let tpl = state.templateList[i]
      if (tpl.attributeType === attributeType) {
        Vue.set(tpl, 'attributes', [])
        break
      }
    }
  },
  [types.CLEAR_TEMPLATE_LIST]: (state) => {
    for (let i in state.templateList) {
      let tpl = state.templateList[i]
      Vue.delete(tpl, 'templateId')
      Vue.delete(tpl, 'name')
      Vue.set(tpl, 'attributes', [])
    }
  },
  [types.ACTIVE_TEMPLATE]: (state, attributeType) => {
    state.activeAttributeType = attributeType
  },
  [types.ADD_TEMPLATE]: (state, template) => {
    let target = state.templateList.find((current) => {
      return current.attributeType === template.attributeType
    })
    if (target) {
      Vue.set(target, 'templateId', template.id)
      Vue.set(target, 'name', template.name)
    }
  },
  [types.ADD_TEMPLATE_ATTRIBUTE]: (state, attribute) => {
    let target = state.templateList.find((current) => {
      return (current.attributeType === attribute.attributeType) && (current.templateId === attribute.templateId)
    })
    if (target) {
      // if (!target.hasOwnProperty('attributes')) {
      //   Vue.set(target, 'attributes', [])
      // }
      target.attributes.push({
        attribute: attribute,
        options: []
      })
    }
  },
  [types.UPDATE_TEMPLATE_ATTRIBUTE]: (state, attribute) => {
    let template = _.find(state.templateList, {templateId: attribute.templateId})
    let target = _.find(template.attributes, (a) => {
      return a.attribute.id === attribute.id
    })
    _.assign(target.attribute, attribute)
  },
  [types.ADD_ATTRIBUTE_OPTION]: (state, {attribute, option}) => {
    attribute.options.push(option)
  },
  [types.UPDATE_ATTRIBUTE_OPTION]: (state, {attribute, option}) => {
    let target = _.find(attribute.options, {id: option.id})
    if (target) {
      _.assign(target, option)
    }
  },

  [types.DELETE_ATTRIBUTE_OPTION]: (state, {template, option}) => {
    console.log('types.DELETE_ATTRIBUTE_OPTION', template, option)
    let attribute = _.find(template.attributes, (a) => {
      return a.attribute.id === option.attributeId
    })
    let targetIndex = _.findIndex(attribute.options, (opt) => {
      return opt.id === option.id
    })
    attribute.options.splice(targetIndex, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
