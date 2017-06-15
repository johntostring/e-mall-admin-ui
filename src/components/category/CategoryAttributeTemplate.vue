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
      <el-col :span="12" :offset="6">
        <div style="text-align:center">
          <span>类目：</span>
          <el-cascader
            v-loading="categoryCascaderLoading"
            change-on-select
            class="category-selector"
            :props="categoryCascaderProps"
            :options="categories"
            @change="handleChange">
          </el-cascader>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">

      <el-col :xs="24">
        <el-tabs @tab-click="handleTemplateTabClick" type="border-card" v-loading="templateTabLoading">
          <el-tab-pane v-for="template in attrTemplates"
                       v-model="attrTemplates" :key="template.id"
                       :label="template.attributeTypeName" :name="template.attributeType + ''">
            <template v-if="activatedCategory">
              <div v-if="!template.templateId">
                <el-button @click="createTemplate(template.attributeType)">创建模板</el-button>
              </div>
              <template v-else>
                <el-row>
                  <el-col :span="12">
                    <div class="el-form-item">
                      <label class="el-form-item__label">操作：</label>
                      <div class="el-form-item__content">
                        <el-button type="primary" icon="plus" size="small" @click="openAddAttributeModal">新增属性</el-button>
                      </div>
                    </div>
                    <div class="el-form-item">
                      <label class="el-form-item__label">排序：</label>
                      <div class="el-form-item__content">
                        <el-switch v-model="attributeSortable"></el-switch>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <order-editor v-if="attributeSortable"
                              :array="template.attributes"
                              fieldPath="attribute.name"></order-editor>

                <el-collapse v-if="template.attributes.length > 0 && !attributeSortable">
                  <div v-for="attr in template.attributes">
                    <div class="el-collapse-item__header attribute-header" v-on:mouseover="showOperationsHandler(attr)" v-on:mouseout="hideOperationsHandler(attr)">
                      <i class="el-collapse-item__header__arrow el-icon-arrow-right"></i>{{attr.attribute.name}}
                      <div class="operations" v-show="attr.showOperation">
                        <el-button-group>
                          <el-button icon="edit" size="small" v-on:click="openEditAttributeModal(attr.attribute)"></el-button>
                          <el-button type="danger" icon="delete" size="small"></el-button>
                        </el-button-group>
                      </div>
                    </div>
                    <div class="el-collapse-item__content">
                      <div class="el-form-item" v-if="attr.attribute.inputType === 0">
                        <label class="el-form-item__label">操作：</label>
                        <div class="el-form-item__content">
                          <el-button type="success" icon="plus" size="small" @click="openAddOptionModal(attr)">新增选项</el-button>
                        </div>
                      </div>
                      <div v-if="attr.attribute.inputType === 0">
                        <p>选项：</p>
                        <el-collapse v-if="attr.options.length > 0">
                          <div v-for="(opt, index) in attr.options">
                            <div class="el-collapse-item__header" v-on:mouseover="showOperationsHandler(opt)" v-on:mouseout="hideOperationsHandler(opt)">
                              <i class="el-collapse-item__header__arrow el-icon-document"></i>
                              <template v-if="opt.optionImage">
                                <img :src="imagePreviewUrl + opt.optionImage + '?width=30&height=30'" class="option-img">
                              </template>
                              {{opt.option}}
                            <div class="operations" v-show="opt.showOperation">
                              <el-button-group>
                                <el-button icon="edit" size="small" @click="openEditOptionModal(opt)"></el-button>
                                <el-button type="danger" icon="delete" size="small" v-on:click="openDeleteOptionModal(opt)"></el-button>
                              </el-button-group>
                            </div>
                            </div>
                          </div>
                        </el-collapse>
                        <div v-else>
                          <p>暂无</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-collapse>
                <div v-if="template.attributes.length == 0">
                  <p>没有属性</p>
                </div>
              </template>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>

    </el-row>
    <sweet-modal title="创建属性" ref="addAttributeModal">
      <add-category-attribute :newAttributeForm="addAttributeForm"
                              v-on:onCancel="closeAddAttributeModal"
                              v-on:onSubmit="submitAddAttribute"></add-category-attribute>
    </sweet-modal>
    <sweet-modal title="编辑属性" ref="editAttributeModal">
      <edit-category-attribute :editAttributeForm="editAttributeForm"
                              v-on:onCancel="closeEditAttributeModal"
                              v-on:onSubmit="submitEditAttribute"></edit-category-attribute>
    </sweet-modal>

    <sweet-modal title="创建选项" ref="addOptionModal">
      <add-attribute-option :newOptionForm="newOptionForm"
                              v-on:onCancel="closeAddOptionModal"
                              v-on:onSubmit="submitAddOption"></add-attribute-option>
    </sweet-modal>
    <sweet-modal title="编辑选项" ref="editOptionModal">
      <edit-attribute-option :editOptionForm="editOptionForm"
                             @submitSuccess="afterEditOptionSuccess"
                             v-on:onCancel="closeEditOptionModal"></edit-attribute-option>
    </sweet-modal>
    <sweet-modal icon="warning" blocking ref="deleteOptionConfirm" v-on:close="onCloseDeleteOptionConfirm">
      确定删除选项？
      <p slot="button">
        <el-button v-on:click="closeDeleteOptionModal">取消</el-button>
        <el-button type="danger" v-on:click="submitDeleteOption">删除</el-button>
      </p>
    </sweet-modal>
  </div>
</template>
<style lang="scss">
  .category-selector {
    margin-bottom: 20px;
  }
  .sortable-ghost {
    border-top: 1px dashed #324157;
  }
</style>
<style lang="scss" scoped>
  .attribute-header {
    background: #1d90e6;
    color: #fff;
  }
  .new-template {
    margin-bottom: 20px;
    width: 300px;
  }
  .operations {
    margin: 0 10px;
    float: right;
  }
  img.option-img {
    height: 30px;
    vertical-align: middle;
  }
</style>
<script type="text/babel">
import { mapGetters, mapActions } from 'vuex'
import {imagePreviewUrl} from '../../api/http'
import OptionsEditor from '../common/OptionsEditor'
import OrderEditor from '../common/OrderEditor'
import draggable from 'vuedraggable'
import AddCategoryAttribute from './AddCategoryAttribute'
import EditCategoryAttribute from './EditCategoryAttribute'
import AddAttributeOption from './AddAttributeOption'
import EditAttributeOption from './EditAttributeOption'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import _ from 'lodash'

let loadAttributesByType = function (attributeType) {
  let categoryId = _.get(this.activatedCategory, 'id')
  if (categoryId) {
    this.templateTabLoading = true
    this.getAttributesOptionsByType({
      categoryId: categoryId,
      attributeType: attributeType
    })
      .then(() => {
        this.templateTabLoading = false
      })
      .catch(() => {
        this.templateTabLoading = false
      })
  }
}
export default {
  components: {
    SweetModal,
    SweetModalTab,
    draggable,
    OptionsEditor,
    OrderEditor,
    AddCategoryAttribute,
    EditCategoryAttribute,
    AddAttributeOption,
    EditAttributeOption
  },
  data () {
    return {
      imagePreviewUrl: imagePreviewUrl,
      attributeSortable: false,
      showOperations: false,
      newOption: {
        name: '',
        parentId: -1,
        parentName: ''
      },
      selectedOptions: [],
      categoryCascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      categoryCascaderLoading: false,
      templateTabLoading: false,
      addAttributeForm: {
        name: '',
        inputType: 1
      },
      editAttributeForm: {
        attributeType: null,
        id: null,
        inputType: null,
        name: null,
        templateId: null
      },
      newOptionForm: {
        attributeId: null,
        option: '',
        optionImage: null
      },
      editOptionForm: {
        attributeId: null,
        option: '',
        optionImage: null
      },
      deleteOption: {}
    }
  },

  computed: {
    ...mapGetters({
      categories: 'allCategories',
      activatedCategory: 'activatedCategory',
      attrTemplates: 'allTemplates',
      activatedTemplate: 'activatedTemplate',
      attributeList: 'attributesOptions'
    })
  },

  created () {
    this.categoryCascaderLoading = true
    this.loadCategoryList().then(res => {
      this.categoryCascaderLoading = false
    }).catch(() => {
      this.categoryCascaderLoading = false
    })
  },

  destroyed () {
    this.clearTemplateList()
  },

  methods: {
    ...mapActions([
      'addCategory',
      'activeCategory',
      'loadCategoryList',
      'loadTemplateList',
      'clearTemplateList',
      'activeTemplateByAttributeType',
      'getAttributesOptionsByType',
      'createTemplateForCategory',
      'createAttributeForTemplate',
      'createOptionForAttribute',
      'deleteOptionOfAttribute',
      'updateAttributeForTemplate'
    ]),

    handleChange (activeIds) {
      let categoryId = activeIds[activeIds.length - 1]
      this.activeCategory(categoryId)
      this.loadTemplateList(categoryId)
      let attributeType = _.get(this.activatedTemplate, 'attributeType', 0)
      if (!this.activatedTemplate) {
        this.activeTemplateByAttributeType(attributeType)
      }
      loadAttributesByType.call(this, attributeType)
//      let find = _.chain(this.categories)
//        .map('children')
//        .flatten()
//        .concat(this.categories)
//        .filter({id: categoryId})
//        .value()
//      if (find && find.length > 0) {
//        let category = _.first(find)
//        this.getTemplateList(category.id)
//        this.activatedState.category = category
//      }
    },

    resetAddAttributeForm () {
      this.addAttributeForm.name = ''
      this.addAttributeForm.inputType = 1
    },

    handleTemplateTabClick (tab) {
      this.resetAddAttributeForm()
      let attributeType = window.parseInt(tab.name)
      this.activeTemplateByAttributeType(attributeType)
      loadAttributesByType.call(this, attributeType)
    },

    handleOptionImageSuccess (option) {
      console.log('handleOptionImageSuccess call', option)
      return (res, file) => {
        option.optionImage = window.URL.createObjectURL(file.raw)
        console.log('end:', option)
      }
    },

    createTemplate (attributeType) {
      this.createTemplateForCategory({
        categoryId: this.activatedCategory.id,
        attributeType: attributeType
      })
    },

    showOperationsHandler (opt) {
      this.$set(opt, 'showOperation', true)
    },

    hideOperationsHandler (opt) {
      this.$set(opt, 'showOperation', false)
    },

    addOption (option, attr) {
      console.log('template - addOption', option, attr)
      // this.createOptionForAttribute(option)
    },

    openAddAttributeModal () {
      this.$refs.addAttributeModal.open()
    },

    closeAddAttributeModal () {
      this.$refs.addAttributeModal.close()
    },

    submitAddAttribute (attributeForm) {
      let attribute = {
        name: attributeForm.name,
        inputType: attributeForm.inputType,
        categoryId: this.activatedCategory.id,
        templateId: this.activatedTemplate.templateId,
        attributeType: this.activatedTemplate.attributeType,
        attributeTypeName: this.activatedTemplate.attributeTypeName
      }
      this.resetAddAttributeForm()
      this.createAttributeForTemplate(attribute)
        .then(res => {
          this.$refs.addAttributeModal.close()
          this.resetAddAttributeForm()
          this.$message({
            message: '属性创建成功',
            type: 'success'
          })
        })
    },

    openEditAttributeModal (attribute) {
      _.assign(this.editAttributeForm, attribute)
      this.$refs.editAttributeModal.open()
    },
    closeEditAttributeModal () {
      this.$refs.editAttributeModal.close()
    },

    submitEditAttribute (attribute) {
      attribute.categoryId = this.activatedCategory.id
      this.updateAttributeForTemplate(attribute).then((res) => {
        this.closeEditAttributeModal()
        this.$message({
          message: '属性更新成功',
          type: 'success'
        })
      })
    },

    openDeleteOptionModal (option) {
      _.assign(this.deleteOption, option)
      console.log('openDeleteOptionModal', option, this.deleteOption)
      this.$refs.deleteOptionConfirm.open()
    },

    closeDeleteOptionModal () {
      this.$refs.deleteOptionConfirm.close()
    },

    onCloseDeleteOptionConfirm () {
      this.deleteOption = {}
      console.log('onCloseDeleteOptionConfirm', this.deleteOption)
    },

    submitDeleteOption () {
      console.log('submitDeleteOption', this.deleteOption)
      if (this.deleteOption !== null) {
        this.deleteOptionOfAttribute(this.deleteOption)
        this.$refs.deleteOptionConfirm.close()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },

    openEditOptionModal (option) {
      _.assign(this.editOptionForm, option)
      this.$refs.editOptionModal.open()
    },

    afterEditOptionSuccess () {
      this.closeEditOptionModal()
      this.$message({
        message: '选项更新成功',
        type: 'success'
      })
    },

    closeEditOptionModal () {
      _.forIn(this.editOptionForm, (v, k, o) => {
        o[k] = null
      })
      this.$refs.editOptionModal.close()
    },

    openAddOptionModal (attrOpt) {
      this.newOptionForm.attributeId = attrOpt.attribute.id
      console.log('openAddOptionModal', attrOpt)
      this.$refs.addOptionModal.open()
    },

    closeAddOptionModal () {
      _.forIn(this.newOptionForm, (v, k, o) => {
        o[k] = null
      })
      console.log('closeAddOptionModal', this.newOptionForm)
      this.$refs.addOptionModal.close()
    },

    submitAddOption (option) {
      console.log('submitAddOption', option)
      this.createOptionForAttribute(option)
        .then(res => {
          this.closeAddOptionModal()
          // reset form
          this.$message({
            message: '选项创建成功',
            type: 'success'
          })
        })
    }
  }
}
</script>
