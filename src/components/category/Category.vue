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
  <div>
    <el-row>
      <el-col :span="24">
        <admin-breadcrumb></admin-breadcrumb>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12">
        <el-card>
          <h3 slot="header">商品类目</h3>
          <el-tree ref="categoryTree"
            v-loading="categoryTreeLoading"
            :data="categories"
            :props="{label: 'name', children: 'children'}"
            :default-expand-all="expandAll"
            node-key="id"
            @node-click="toggleCategoryNode">
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-card>
          <h3 slot="header">添加类目</h3>
          <el-form :label-position="'right'" label-width="100px" :model="newCategory" ref="cateForm" :rules="rules">
            <input type="hidden" v-model="newCategory.parentId"/>
            <el-form-item label="顶级类目">
              <el-switch v-model="asRoot" on-text="是" off-text="否" @change="toggleAsRoot"></el-switch>
            </el-form-item>
            <template v-if="!asRoot">
              <el-form-item label="父级类目" prop="parentName">
                <el-input v-model="newCategory.parentName" :disabled="true">
                </el-input>
              </el-form-item>
            </template>
            <el-form-item label="类目名称" prop="name">
              <el-input v-model="newCategory.name"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="saveNode">保存</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
</style>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {
      expandAll: false,
      mockId: 1,
      asRoot: false,
      newCategory: {
        name: '',
        parentId: -1,
        parentName: ''
      },
      categoryTreeLoading: false,
      rules: {
        name: { required: true, message: '请输入类目名称', trigger: 'blur' },
        parentName: { required: true, message: '请选择父级类目', trigger: 'blur' }
      }
    }
  },

  computed: mapGetters({
    categories: 'allCategories'
  }),

  created () {
    this.categoryTreeLoading = true
    this.loadCategoryList().then(message => {
      this.categoryTreeLoading = false
    }).catch(() => {
      this.categoryTreeLoading = false
    })
  },

  methods: {
    ...mapActions([
      'addCategory',
      'loadCategoryList'
    ]),

    toggleAsRoot (state) {
      if (state === true) {
        this.newCategory.parentId = -1
        this.newCategory.parentName = ''
        this.rules.parentName.required = false
      } else {
        this.rules.parentName.required = true
      }
    },

    saveNode () {
      this.$refs['cateForm'].validate((valid) => {
        if (valid) {
          this.addCategory({
            id: this.mockId++,
            name: this.newCategory.name,
            parentId: this.newCategory.parentId
          })
          .then(() => {
            this.newCategory.name = ''
            this.$refs['categoryTree'].$forceUpdate()
          })
          // this.newCategory.name = ''
        } else {
          return false
        }
      })
    },

    toggleCategoryNode (data, node, tree) {
      this.newCategory.parentId = data.id
      if (data.id === -1) {
        this.newCategory.parentName = '顶级类目'
      } else {
        this.newCategory.parentName = data.name
      }
    }
  }
}
</script>
