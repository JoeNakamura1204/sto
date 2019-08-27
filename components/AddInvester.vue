<template>
  <el-card class="box-card create-token">
    <div slot="header" class="clearfix">
      <span>投資家のホワイトリスト作成</span>
    </div>

    <div class="text-item explanation">
      トークンを配布する投資家のホワイトリストを作成します<br>
      配布する投資家のアドレスを入力してください。
    </div>

    <el-divider></el-divider>

    <el-form label-width="120px" label-position="top" class="token-name">
      <el-form-item label="追加する投資家アドレス" required>
        <el-input placeholder="Enter Invester's address here" v-model="invester_address"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="add_invester">投資家を追加する</el-button>
    <el-button @click="pra">Pra</el-button>
    <el-button @click="pere">Pere</el-button>

  </el-card>


</template>

<script>
  import {mapState} from 'vuex'
  import Web3 from 'web3'
  import Abi from './ERC1400_abi'
    export default {
      name: "addInvester",
      computed:mapState(["my_account","workingSteps","ERC1400Factory_address","current_provider","token_name","token_symbol","ERC1400_address"]),
      data:function () {
        return{
          invester_address:"",
        }
      },
      methods: {
        add_invester:function () {
          // contract abi
          let abi = Abi['abi'];
          let web3 = new Web3(Web3.givenProvider);
          // connect contract
          let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
            from: this.my_account, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
          });
          console.log(ERC1400Contract.methods);
          ERC1400Contract.methods.isMinter("0x1c894B2b52AD5189e16618Df912921b9bB49C831").call({from: this.my_account})
            .then(function (result) {
              console.log(result);
          });
          // ERC1400Contract.methods.addMinter("0x1c894B2b52AD5189e16618Df912921b9bB49C831").send({from: this.my_account})
          //   .then(function (result) {
          //     console.log(result);
          // });
          // proceed step
          // this.$store.commit('proceedStep')
        },

        pra:function () {
          let abi = Abi['abi'];
          let web3 = new Web3(Web3.givenProvider);
          // connect contract
          let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
            from: this.my_account, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
          });
          const partion = "0xa6ec48d01da0abd31f5d1eb60b94e44cd1bbca877b1c2d90617bbd9de1b44ab3"
         console.log(ERC1400Contract.methods);
          ERC1400Contract.methods.balanceOfByPartition(partion,"0xe558281Caa9c8a4c19f53ee4F6FFB9b6253Fe721").call().then(function (result) {
            console.log(result)
          });

          ERC1400Contract.methods.totalPartitions().call().then(function (result) {
            console.log(result)
          });

          ERC1400Contract.methods.canTransferByPartition(partion,this.my_account,5000,partion).call().then(function (result) {
            console.log(result)
          });
        },
        pere:function () {
          let abi = Abi['abi'];
          let web3 = new Web3(Web3.givenProvider);
          // connect contract
          let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
            from: this.my_account, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
          });

          const partition = web3.utils.sha3("Partionfafdffsda");
          const partition22 = "0xa6ec48d01da0abd31f5d1eb60b94e44cd1bbca877b1c2d90617bbd9de1b44ab3"
          ERC1400Contract.methods.issueByPartition(partition,"0xe558281Caa9c8a4c19f53ee4F6FFB9b6253Fe721",1000, partition).send({from: this.my_account})
            .then(function (result) {
              console.log(result);
          });
          // ERC1400Contract.methods.addMinter(this.my_account).send().then(function (result) {
          //   console.log(result)

          // })
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
