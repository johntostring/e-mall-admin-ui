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
import Router from 'vue-router'

Vue.use(Router)
import Login from './components/Login'
import Index from './components/Index'
import Category from './components/category/Category'
import CategoryAttributeTemplate from './components/category/CategoryAttributeTemplate'
import CreateGoods from './components/goods/CreateGoods'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: Index,
      name: '首页',
      hidden: true,
      children: [
        {
          path: '/category',
          component: Category,
          name: '后台类目',
          hidden: true
        },
        {
          path: '/category-attribute-template',
          component: CategoryAttributeTemplate,
          name: '类目属性模板',
          hidden: true
        },
        {
          path: '/create-goods',
          component: CreateGoods,
          name: '发布商品',
          hidden: true
        }
      ]
    }
  ]
})

export default router
