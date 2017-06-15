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
  <div class="nav">
    <div class="nav-left">
      <router-link to="/"><img src="../assets/logo.png" class="logo"></router-link>
      <span class="title">
        <slot name="appName">Dashboard</slot>
      </span>
    </div>
    <div class="nav-middle">

    </div>
    <div class="nav-right">
      <el-menu theme="dark" mode="horizontal" @select="logoff" menu-trigger="click">
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="logoff" >注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as types from '../store/mutation-types'
  export default {
    name: 'topNav',
    methods: {
      logoff (key, keyPath) {
        console.log(key, keyPath)
        if (key === 'logoff') {
          this.$confirm('确定注销？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.commit(types.LOGOUT)
            this.$router.replace('/login')
          }).catch(() => {
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
$nav-height: 60px;
$nav-bg-color: #324157;
$nav-text-color: #fff;

.nav {
  width: 100%;
  max-height: $nav-height;
  background: $nav-bg-color;
  /*padding: 13px 20px;*/
  box-sizing: border-box;
  color: $nav-text-color;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;

  .nav-left {
    max-height: $nav-height;
    width: 230px;
    text-align: center;
    float: left;
    overflow: hidden;

    .logo {
      display: inline-block;
      vertical-align: middle;
      height: $nav-height * 0.7;
      //padding: (($nav-height - ($nav-height * 0.7)) / 2) 10px ;
    }

    .title {
      line-height: $nav-height;
    }
  }
  .nav-middle {
    float: left;
  }

  .nav-right {
    float: right;
  }
  .el-menu {
    border-radius: 0;
    /*background-color: transparent;
    color: $nav-text-color;

    .el-submenu__title {
      color: $nav-text-color;
    }*/
  }

  .el-dropdown {
    color: $nav-text-color;
    cursor: pointer;
  }
}
</style>
