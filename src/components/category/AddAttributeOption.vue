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
      <el-form ref="form" :model="newOption" label-width="80px">
        <el-form-item label="选项" prop="option">
          <el-input v-model="newOption.option"></el-input>
        </el-form-item>
        <el-form-item label="选项图标" prop="option">
          <el-upload
            class="option-image-uploader"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleOptionImageSuccess"
            :before-upload="beforeOptionImageUpload">
            <img v-if="!optionImagePreviewUrl && newOption.optionImage" :src="newOption.optionImage" class="option-img-review">
            <img v-if="optionImagePreviewUrl" :src="optionImagePreviewUrl" class="option-img-review">
            <i v-else class="el-icon-plus option-image-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
  $option-image-height: 60px;

  .option-image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .option-image-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .option-image-uploader-icon {
    font-size: 15px;
    color: #8c939d;
    width: $option-image-height;
    height: $option-image-height;
    line-height: $option-image-height!important;
    text-align: center;
  }
  .option-img-review {
    width: $option-image-height;
    height: $option-image-height;
    display: block;
  }
</style>
<script>
  import {uploadUrl, imagePreviewUrl} from '../../api/http'
  import {mapGetters} from 'vuex'

  export default {
    props: {
      newOptionForm: Object
    },
    data () {
      return {
        newOption: this.newOptionForm,
        uploadUrl: uploadUrl,
        imagePreviewUrl: imagePreviewUrl,
        optionImagePreviewUrl: null
      }
    },

    computed: {
      ...mapGetters([
        'authInfo'
      ]),
      uploadHeaders () {
        return {
          Authorization: `${this.authInfo.token_type} ${this.authInfo.access_token}`
        }
      }
    },

    methods: {
      onSubmit () {
        this.$emit('onSubmit', this.newOption)
      },

      onReset () {
        this.$refs.form.resetFields()
      },

      onCancel () {
        this.$emit('onCancel')
      },

      handleOptionImageSuccess (response, file) {
        console.log('handleOptionImageSuccess', response)
//        let localUrl = window.URL.createObjectURL(file.raw)
        if (response.ok) {
          this.optionImagePreviewUrl = `${imagePreviewUrl}${response.body.fullFileName}?width=60`
          this.$set(this.newOption, 'optionImage', response.body.fullFileName)
        } else {
          this.$message.error('图片上传失败')
        }
      },
      beforeOptionImageUpload (file) {
        const isJPG = /jpeg|jpg|png/.test(file.type)
        const isLt500K = file.size / 1024 < 500

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt500K) {
          this.$message.error('上传图片大小不能超过 500KB!')
        }
        return isJPG && isLt500K
      }
    }
  }
</script>
