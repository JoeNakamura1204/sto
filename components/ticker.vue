<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix tiker">
      発行するトークンのシンボル
    </div>
    <div  class="text item">
      Your token symbol will be reserved for 15 days, and is permanently yours once you create your Token. This reservation ensures that no other organization can create a token symbol identical to yours using the Polymath platform. This operation carries a cost of: 250 POLY.
    </div>

    <div  class="text item symbol-name">
      <el-form label-width="120px" label-position="top">
        <el-form-item label="Enter Token Symbol" class="token-symbol-form" required>
          <el-input placeholder="Up to 10 characters(example: TARO-A)"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div  class="text item">
      <el-form label-width="120px" label-position="top">
        <el-form-item label="Issuer's address" required>
          <el-input disabled :value="my_account"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-button >Next step</el-button>
  </el-card>

</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "ticker",
      computed:mapState(["my_account","current_provider"]),
    }
</script>

<style scoped>
  .box-card{
    width:800px !important;
    margin: auto;
  }

  .clearfix.tiker{
    color: rgb(37, 45, 107);
    font-weight: 800;
    font-size: 24px;
  }
  .symbol-name{
    text-align: center;
    background-color: #ebf0f7;
    padding: 10px;
    margin-bottom: 20px;
  }
  .token-symbol-form{
    color: rgb(37, 45, 107);
    font-weight: 500;
    font-size: 18px;
  }
</style>
