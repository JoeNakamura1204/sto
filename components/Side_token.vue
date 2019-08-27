<template>
  <el-card class="box-card token-symbol">
    <div  class="text item token-symbol">
      <span class="token-symbol-title">トークンシンボル<i id="token-symbol-created" class="el-icon-success"></i></span>
      <span class="created-token-symbol">{{token_symbol}}</span>
    </div>

    <el-divider></el-divider>
    <div  class="text item token-name">
      トークンネーム
      <span class="token-info">{{token_name}}<i id="token-name-created" class="el-icon-success"></i></span>
    </div>
    <div  class="text item ERC1400-address">
      トークンアドレス
      <span class="token-info">{{ERC1400_address}}<i id="token-address-created" class="el-icon-success"></i></span>
    </div>
    <div  class="text item ERC1400-address">
      発行株式数
      <span class="token-info">{{token_amount}}<i id="token-amount-created" class="el-icon-success"></i></span>
    </div>

    <el-divider></el-divider>

    <div  class="text item issuer-address">
      発行者アドレス
      <span>{{my_account}}<i id="my-account-created" class="el-icon-success"></i></span>
    </div>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
  import Web3 from 'web3'
  import Abi from './ERC1400Facroty_abi'
    export default {
      name: "ticker",
      computed:mapState(["my_account","workingSteps","ERC1400Factory_address","current_provider","token_name","token_symbol","ERC1400_address","token_amount"]),
      data:function () {
        return{
          symbol:"",
          token_name_input:""
        }
      },
      methods: {

      }
    }

</script>

<style scoped>
  .box-card.token-symbol{
    width:455px;
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
  .token-info{
    display: block;
  }
  i.el-icon-success{
    margin-left: 5px;
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
    display: block;
  }
  .text-item.explanation{
    color: rgb(90, 104, 114);
    line-height: 25px;
  }
  .el-button{
    background-color:rgb(37, 45, 107);
    display: block;
    color: white;
  }
</style>
