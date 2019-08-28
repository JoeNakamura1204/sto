<template>
  <div class="content-container">

    <el-row :gutter="21">
      <el-col :span="15">
        <template>
          <el-alert
            title="with description"
            type="success"
            description="This is a description.">
          </el-alert>
        </template>
      </el-col>
      <el-col :span="6">
        <Side_token></Side_token>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Side_token from '~/components/Side_token.vue'
  import {mapState} from 'vuex'

    export default {
      name: "home",
      layout:'navbar',
      components:{
        Side_token
      },
      computed:mapState(["isLoggedIn","documents_attached"]),
    }
</script>

<style scoped>

</style>
