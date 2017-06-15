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
  <div class="option-editor">
    <el-input placeholder="输入选项名称" class="new-option" v-model="newOption.name">
      <el-button slot="append" @click="emitAddOption(newOption)">添加选项</el-button>
    </el-input>
    <div class="el-table el-table--border el-table--enable-row-hover">
      <table width="100%">
        <thead>
        <tr>
          <th class="is-leaf">
            <div class="cell">选项名称</div>
          </th>
          <th class="is-leaf">
            <div class="cell">选项图片</div>
          </th>
          <th class="is-leaf">
            <div class="cell">选项首字母</div>
          </th>
          <th class="is-leaf">
            <div class="cell">操作</div>
          </th>
        </tr>
        </thead>
        <draggable element="tbody" v-model="editableOptions" :options="dragOptions">
          <tr v-for="opt in editableOptions" class="sortable-option">
            <td>
              <el-input class="option-input" v-model="opt.option" v-on:change="testTable(opt)"></el-input>
            </td>
            <td>
              <el-upload
                class="option-img-uploader"
                action="//jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleOptionImageSuccess(opt)">
                <template v-if="opt.optionImage">
                  <img :src="'http://localhost:9333/' + opt.optionImage" class="option-img">
                </template>
                <template v-else>
                  <i class="el-icon-plus option-img-uploader-icon"></i>
                </template>
              </el-upload>
            </td>
            <td>{{opt.initial}}</td>
            <td>
              <el-button v-if="opt.optionImage" :plain="true" type="danger" icon="delete" size="small" v-on:click="removeOptionImage(opt)">移除图片</el-button>
              <el-button class="drag-handler" :plain="true" type="primary" icon="d-caret" size="small"></el-button>
            </td>
          </tr>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script type="text/babel">
import draggable from 'vuedraggable'

export default{
  components: {
    draggable
  },
  props: {
    options: Array
  },
  data () {
    return {
      dragOptions: {
        draggable: '.sortable-option',
        handle: '.drag-handler'
      },
      editableOptions: this.options,
      newOption: {
        name: ''
      }
    }
  },

  methods: {

    handleChange (value) {
      console.log(value)
    },

    handleOptionImageSuccess (option) {
      return (res, file) => {
        option.optionImage = window.URL.createObjectURL(file.raw)
        console.log('end:', option)
      }
    },

    testTable (row) {
      console.log(row)
    },

    removeOptionImage (option) {
      option.optionImage = ''
    },

    emitAddOption (option) {
      this.$emit('addOption', option)
    }
  }
}
</script>
<style lang="scss" scoped>
  $uploader-width: 50px;
  $uploader-margin: 5px;

  .option-editor {

    .new-option {
      margin-bottom: 20px;
      width: 300px;
    }

    .drag-handler.el-button {
      cursor: move;
    }

    table td {
      text-align: center;
    }

    .option-input {
      width: 90%;
    }

    .option-img-uploader {

      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: $uploader-width;
      height: $uploader-width;
      line-height: $uploader-width;
      margin: $uploader-margin auto;

      &:hover {
        border-color: #20a0ff;
      }

      .option-img-uploader-icon {
        font-size: 15px;
        color: #8c939d;
        width: $uploader-width;
        height: $uploader-width;
        line-height: $uploader-width;
        text-align: center;
      }
    }
  }
  .option-img {
    width: $uploader-width;
    height: $uploader-width;
    display: inline-block;
  }

  .option-img-delete {
    line-height: $uploader-width + ($uploader-margin * 2)
  }
</style>
