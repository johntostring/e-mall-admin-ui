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
  <el-row>
    <el-col :span="24">
      <el-form ref="form" :model="newAttribute" label-width="80px">
        <el-form-item label="属性" prop="name">
          <el-input v-model="newAttribute.name"></el-input>
        </el-form-item>
        <el-form-item label="录入方式" prop="inputType">
          <el-radio-group v-model="newAttribute.inputType">
            <el-radio :label="0">多选</el-radio>
            <el-radio :label="1">手工录入</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss">
</style>
<script>
  export default {
    props: {
      newAttributeForm: Object
    },
    data () {
      return {
        newAttribute: this.newAttributeForm
      }
    },
    methods: {
      onSubmit () {
        this.$emit('onSubmit', this.newAttribute)
      },

      onReset () {
        this.$refs.form.resetFields()
      },

      onCancel () {
        this.$emit('onCancel')
      }
    }
  }
</script>
