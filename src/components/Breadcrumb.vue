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

<template lang="html">
  <el-breadcrumb separator="/">
    <span class="db-breadcrumb-loc">位置：</span>
    <el-breadcrumb-item v-for="item in breadcrumbs" :to="item" :key="item.name">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'admin-breadcrumb',
  data () {
    return {
      breadcrumbs: []
    }
  },
  mounted () {
    this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || []
  }
}
</script>

<style lang="css">
  .db-breadcrumb-loc {
    float: left
  }
</style>
