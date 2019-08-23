<template>
  <el-row :gutter="21">
    <el-col :span="15">
      <el-card class="box-card">
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div  class="text item token-symbol">
          <span class="token-symbol-title">トークンシンボル</span>
          <span class="created-token-symbol">{{token_symbol}}</span>
        </div>
        <div  class="text item token-name">
          トークンネーム
          <span>Undifine</span>
          <span>{{token_name}}</span>
        </div>
        <div  class="text item token-symbol">
          トークンアドレス
          <span>{{token_symbol}}</span>
        </div>
        <el-divider></el-divider>
        <div  class="text item issuer-address">
          発行者アドレス
          <span>{{my_account}}</span>
        </div>
      </el-card>
    </el-col>

  </el-row>


</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "ticker",
      computed:mapState(["my_account","workingSteps","current_provider","token_name","token_symbol"]),
      data:function () {
        return{
          symbol:""
        }
      },
      watch:{
        symbol:function () {
          this.$store.commit('set_token_symbol',this.symbol);
          console.log(this.token_symbol)
        }
      },
      methods: {
        proceed_step:function () {
          this.$store.commit('proceedStep');
          console.log(this.workingSteps)
        }
      }
    }
</script>

<style scoped>
  .box-card{
    width:450px !important;
    margin: auto;
  }
  .text.item{
    color: rgb(37, 45, 107);
    margin-bottom: 15px;
  }
  .text.item>span{
    color: rgb(90, 104, 114);
    margin-bottom: 15px;
  }
  .text.item.token-symbol{
    background-color: #ebf0f7;
    padding: 15px 35px;
    text-align: center;
  }
  .text.item.token-symbol>span{
    background-color: white;
    padding: 15px;
    display: block;
  }
  .text.item.token-symbol>span.token-symbol-title{
    background-color: #ebf0f7;
    padding: 0px;
  }
  .text.item.token-symbol>span.created-token-symbol{
    color: rgb(37, 45, 107);
    font-size: 24px;
    font-weight: 600;
  }
</style>
