<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>ホワイトリスト投資家一覧</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div v-for="invester in investers_address" :key="invester" class="text item">
          <i class="el-icon-document"></i>{{invester}}
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "home",
      layout:'navbar',
      computed:mapState(["isLoggedIn","investers_address"]),
    }
</script>

<style scoped>

</style>
