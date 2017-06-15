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

import {axios, goodsApiUrl} from './http'

export const getAttributesOptionsByType = (categoryId, attributeType) => {
  return axios.get(`${goodsApiUrl}/category/${categoryId}/attributes/${attributeType}`)
}
export const createAttributeForTemplate = (categoryId, attribute) => {
  return axios.post(`${goodsApiUrl}/category/${categoryId}/attributes`, attribute)
}
export const updateAttributeForTemplate = (categoryId, attribute) => {
  return axios.put(`${goodsApiUrl}/category/${categoryId}/attributes`, attribute)
}
export const createOptionForAttribute = (option) => {
  return axios.post(`${goodsApiUrl}/category-attribute-options`, option)
}
export const deleteOptionOfAttribute = (optionId) => {
  return axios.delete(`${goodsApiUrl}/category-attribute-options/${optionId}`)
}
export const updateOptionForAttribute = (option) => {
  return axios.put(`${goodsApiUrl}/category-attribute-options`, option)
}

