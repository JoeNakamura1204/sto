<template>
  <el-card class="box-card create-token">
    <div slot="header" class="clearfix">
      <span>株式の発行</span>
    </div>

    <div class="text-item explanation">
      今回発行する株式を設定します。<br>
      発行する株式の名前・発行する株式数・添付するデータを記入してください。
    </div>

    <el-divider></el-divider>

    <el-form label-width="120px" label-position="top" class="token-name">
      <el-form-item label="発行する株式の名前" required>
        <el-input placeholder="Enter Partion here" v-model="issue_token_partion"></el-input>
      </el-form-item>
      <el-form-item label="発行する株式数" required>
        <el-input placeholder="Enter amount of token to issue" type="number" v-model="issue_token_amount"></el-input>
      </el-form-item>
      <el-form-item label="添付するデータ" required>
        <el-input placeholder="Enter attached data URL here" v-model="issue_token_attached_data">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-button @click="issue_token" class="issue">株式を発行する</el-button>
    <el-button @click="skip">あとで設定する</el-button>

  </el-card>


</template>

<script>
  import {mapState} from 'vuex'
  import Web3 from 'web3'
  import Abi from './ERC1400_abi'
    export default {
      name: "addInvester",
      computed:mapState(["my_account","workingSteps","ERC1400Factory_address","current_provider","token_name","token_symbol","ERC1400_address","partion_history"]),
      data:function () {
        return{
          issue_token_partion:"",
          issue_token_amount:0,
          issue_token_attached_data:"",
          partition_byte:""
        }
      },
      methods: {
        issue_token:function () {
          let abi = Abi['abi'];
          let web3 = new Web3(Web3.givenProvider);
          // connect contract
          let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
            from: this.my_account, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
          });

          const partition = web3.utils.sha3(this.issue_token_partion);
          const attache_data = web3.utils.sha3(this.issue_token_attached_data);
          const self = this;

          ERC1400Contract.methods.issueByPartition(partition, this.my_account, this.issue_token_amount, attache_data).send({from: this.my_account})
            .then(function (result) {
              ERC1400Contract.methods.totalPartitions().call().then(function(result){
                const i = result.length -1
                self.partition_byte = result[i];
                const partion = {
                  txhash: result.transactionHash,
                  partition_byte: self.partition_byte,
                  amount:self.issue_token_amount,
                  name:self.issue_token_partion,
                  data:self.issue_token_attached_data
                };

                self.$store.commit('set_partion_history', partion);

              });


          self.$store.commit('set_token_amount',self.issue_token_amount);
          self.$store.commit('proceedStep');
          });
        },
        skip:function(){
          this.$store.commit('proceedStep')
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
  .el-button.issue{
    background-color:rgb(37, 45, 107);
    color: white;
  }
</style>
