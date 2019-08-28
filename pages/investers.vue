<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>ホワイトリスト投資家一覧</span>
          <el-button style="float: right;" type="primary" icon="el-icon-plus" circle></el-button>
        </div>

        <template>
          <el-table
            :data="investers_address"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="Date"
              width="280">
              <i class="el-icon-user"></i>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
              width="280">

            </el-table-column>
            <el-table-column
              prop="address"
              label="Address">
            </el-table-column>
          </el-table>
        </template>

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
