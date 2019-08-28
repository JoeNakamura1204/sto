<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>書類一覧</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div v-for="document in documents_attached" :key="document" class="text item">
        <i class="el-icon-document"></i>{{document}}
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "home",
      layout:'navbar',
      computed:mapState(["isLoggedIn","documents_attached"]),
    }
</script>

<style scoped>

</style>
