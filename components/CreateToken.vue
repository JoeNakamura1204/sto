<template>
  <el-card class="box-card create-token">
    <div slot="header" class="clearfix">
      <span>株式トークンの発行</span>
    </div>

    <div class="text-item explanation">
      次は発行するトークンに関する設定を行いましょう<br>
      発行するトークンの名前・トークンに付与する情報のURLを設定しましょう。

    </div>

    <el-divider></el-divider>

    <el-form label-width="120px" label-position="top" class="token-name">
      <el-form-item label="トークン名" required>
        <el-input placeholder="Enter Token Name" v-model="token_name_input"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="create_token">トークンを作成する</el-button>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
  import Web3 from 'web3'
  import Abi from './ERC1400Facroty_abi'
    export default {
      name: "ticker",
      computed:mapState(["my_account","workingSteps","ERC1400Factory_address","current_provider","token_name","token_symbol","ERC1400_address"]),
      data:function () {
        return{
          symbol:"",
          token_name_input:""
        }
      },
      watch:{
        symbol:function () {
          this.$store.commit('set_token_symbol',this.symbol);
          console.log(this.token_symbol)
        }
      },
      methods: {
        create_token:function () {
          // contract abi
          let abi = Abi['abi'];
          let web3 = new Web3(Web3.givenProvider);
          // connect contract
          let myContract = new web3.eth.Contract(abi, this.ERC1400Factory_address, {
            from: this.my_account, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
          });

          let self = this;
          // create ERC1400
          myContract.methods.createERC1400(this.token_name_input,this.token_symbol,1, [this.my_account]).send({from: this.my_account})
            .then(function (result) {
              console.log(result);
              myContract.methods.getDeployedERC1400().call().then(function (result) {
                const ERC1400_id = result.length -1;
                const ERC1400Contract_address = result[ERC1400_id];
                console.log(ERC1400_id);
                console.log(result[ERC1400_id]);
                console.log(self.token_name_input);
                self.$store.commit('set_ERC1400_address',ERC1400Contract_address);
              })
            })
          // proceed step
          this.$store.commit('proceedStep')
        },
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
