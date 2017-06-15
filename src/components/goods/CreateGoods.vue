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
    <el-row>
      <el-col :span="18" :offset="3">
        <el-form ref="create-goods-form" :model="goodsInfo" label-width="80px">
          <el-form-item label="商品分类">
            <el-cascader
              class="category-selector"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select v-model="goodsInfo.brand.name" placeholder="请选择品牌">
              <el-option label="品牌一" value="apple"></el-option>
              <el-option label="品牌二" value="huawei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script type="text/babel">
export default{
  data () {
    return {
      goodsInfo: {
        brand: {
          name: ''
        }
      },
      selectedOptions: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  methods: {
    handleChange (value) {
      console.log(value)
    },

    onSubmit () {
      console.log(this.goodsInfo)
    }
  }
}

</script>
