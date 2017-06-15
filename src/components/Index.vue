<!--
  ~ Millimall is an E-commerce platform based on microservice architecture design
  ~ Copyright (C) 2017 John Zhang
  ~
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU Affero General Public License as published
  ~ by the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~ GNU Affero General Public License for more details.
  ~
  ~ You should have received a copy of the GNU Affero General Public License
  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->

<template>
  <div class="hello">
    <TopNav>
      <!--<span slot="appName">Mall Admin</span>-->
    </TopNav>

    <div class="console-sidebar">
      <el-menu default-active="/category" @open="handleOpen" @close="handleClose" unique-opened router>
        <div v-for="(route, index) in menu" :key="route.path">
          <template v-if="route.children && route.name">
            <el-submenu :index="route.path">
              <template slot="title"><i class="el-icon-message"></i>{{route.name}}</template>
              <el-menu-item :index="cRoute.path" v-for="cRoute in route.children" :key="cRoute.path">{{cRoute.name}}</el-menu-item>
            </el-submenu>
          </template>
          <template v-if="!route.children && route.name">
            <el-menu-item :index="route.path"><i class="el-icon-message"></i>{{route.name}}</el-menu-item>
          </template>
        </div>
      </el-menu>
    </div>

    <div class="console-content">
      <router-view></router-view>
      <AlbumManager></AlbumManager>
    </div>
  </div>
</template>

<script type="text/babel">
  import router from '../routes'
  import TopNav from './TopNav'
  import * as types from '../store/mutation-types'

  export default {
    components: { TopNav },
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        activeIndex: '1',
        activeIndex2: '1',
        isRouterMenu: true,
        menu: [
          {
            path: '/',
            name: 'Dashboard'
          },
          {
            path: '2',
            name: '类目管理',
            children: [
              {
                path: '/category',
                name: '后台类目'
              },
              {
                path: '/category-attribute-template',
                name: '类目属性模板'
              }
            ]
          },
          {
            path: '3',
            name: '商品管理',
            children: [
              {
                path: '/create-goods',
                name: '发布商品'
              }
            ]
          }
        ]
      }
    },
    methods: {
      httpTest () {
        this.$http.get('https://api.github.com/users/johntostring')
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      },
      logoff () {
        this.$store.state.commit(types.LOGOUT)
        router.replace('/login')
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .console-topbar {
    margin-left: 230px;
  }
  .sidebar-header {
    text-align: center;
  }
  .console-sidebar {
    position: absolute;
    width: 230px;
    top: 60px;
    bottom: 0;
    background: #eef1f6;
  }
  .console-content {
    position: relative;
    top: 60px;
    margin-left: 230px;
    padding: 20px 10px;
  }
  a {
    color: #42b983;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
