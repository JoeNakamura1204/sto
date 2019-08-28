<template>
  <div class="content-container">

    <el-row :gutter="21">
      <el-col :span="15">

        <template>
          <el-alert
            title="株式の発行履歴"
            type="success"
            description="今までに発行した株式の記録が表示されます">
          </el-alert>
        </template>

        <el-tabs type="border-card">
          <el-tab-pane label="株式発行の履歴">

            <el-collapse accordion v-for="(partion, index) in partion_history" :key="index">
              <el-collapse-item name="1">
                <template slot="title">
                  {{partion.name}}
                </template>
                <div>発行株式数：{{partion.amount}}</div>
                <div>添付データ：{{partion.data}}</div>
                <div>トランザクションハッシュ：{{partion.txhash}}</div>
              </el-collapse-item>
            </el-collapse>

          </el-tab-pane>
          <el-tab-pane label="株価">株価</el-tab-pane>
        </el-tabs>

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
      computed:mapState(["isLoggedIn","documents_attached","partion_history"]),
    }
</script>

<style scoped>
  .el-alert{
    margin-bottom: 15px;
  }
</style>
