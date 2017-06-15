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
  <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="isLogging">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import * as types from '../store/mutation-types'

  export default {
    data () {
      return {
        loginForm: {
          account: 'test',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
            // { validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            // { validator: validaePass2 }
          ]
        },
        checked: true,
        isLogging: false
      }
    },
    methods: {
      handleLogin () {
        this.isLogging = true

        let instance = this.axios.create({
          headers: {
            'Authorization': 'Basic bWFsbC1zYW1wbGUtY2xpZW50OjEyMzQ1Ng==',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        instance.post('/sso/oauth/token', `grant_type=password&scope=read&username=${this.loginForm.account}&password=${this.loginForm.checkPass}`)
        .then((res) => {
          if (res.data.access_token) {
            let authInfo = res.data
            this.$store.commit(types.LOGIN, {authInfo})
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({
              path: redirect
            })
            this.isLogging = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
</style>
