<template>
  <el-card class="box-card create-token">
    <div slot="header" class="clearfix">
      <span>トークンにドキュメント情報付与</span>
    </div>

    <div class="text-item explanation">
      発行したトークンに株式に関する情報を付与しましょう<br>
      発行するトークンに付与する情報のURLを設定してください。
    </div>

    <el-divider></el-divider>

    <el-form label-width="120px" label-position="top" class="token-name">
      <el-form-item label="株式トークンに付与する情報URL" required>
        <el-input placeholder="Enter URL here" v-model="token_document_url"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="set_document">トークンに情報を付与する</el-button>
    <el-button @click="get_document">トークンに情報を閲覧する</el-button>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
  import Web3 from 'web3'
  import Abi from './ERC1400_abi'
    export default {
      name: "DocumentManage",
      computed:mapState(["my_account","workingSteps","ERC1400Factory_address","current_provider","token_name","token_symbol","ERC1400_address"]),
      data:function () {
        return{
          token_document_url:"",
          token_name_byte:""
        }
      },
      methods: {
        set_document:function () {
          // contract abi
          if(this.token_document_url.length > 0){
            let abi = Abi['abi'];
            let web3 = new Web3(Web3.givenProvider);
            // connect contract
            let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
              from: this.my_account, // default from address
              gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
            });
            console.log(ERC1400Contract.methods);
            this.token_name_byte = web3.utils.sha3(this.token_document_url);

            ERC1400Contract.methods.setDocument(this.token_name_byte, this.token_document_url,this.token_name_byte).send({from:this.my_account}).then(function (result) {
              console.log(result)
            });
            this.$store.commit('proceedStep')
          }else{
            alert("URLを入力してください！")
          }
        },
        get_document:function () {
          if(this.token_document_url.length > 0){
            let abi = Abi['abi'];
            let web3 = new Web3(Web3.givenProvider);
            // connect contract
            let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
              from: this.my_account, // default from address
              gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
            });

            ERC1400Contract.methods.getDocument(this.token_name_byte).call().then(function (result) {
              console.log(result)
            });
            console.log(ERC1400Contract.methods);
            this.$store.commit('proceedStep')
          }else{
           alert("URLを入力してください！")
          }
        }
      }
    }

</script>

<style scoped>
  .box-card.create-token{
    color: rgb(37, 45, 107);
    width: 750px;
  }
  .clearfix{
    font-size: 20px;
    font-weight: 600;
  }
  .text.item{
    color: rgb(37, 45, 107);
    margin-bottom: 15px;
  }
  .text.item>span{
    color: rgb(90, 104, 114);
    margin-bottom: 15px;
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
