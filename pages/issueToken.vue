<template>
  <div>
    <el-row :gutter="21">
      <el-col :span="15">

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

      </el-card>
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
  import Web3 from 'web3'
  import Abi from './abi/ERC1400_abi'

  export default {
    name: "issueToken",
    layout:'navbar',
    components:{
      Side_token
    },
    computed:mapState(["isLoggedIn","documents_attached","my_account","ERC1400_address"]),
    data:function () {
      return{
        issue_token_partion:"",
        issue_token_amount:0,
        issue_token_attached_data:""
      }
    },
    methods:{
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
       ERC1400Contract.methods.issueByPartition(partition,this.my_account, this.issue_token_amount, attache_data).send({from: this.my_account})
         .then(function (result) {
           console.log(result.transactionHash);
           self.$store.commit('set_partion_history', result.transactionHash, self.issue_token_amount,self.issue_token_partion, self.issue_token_attached_data);
           self.$store.commit('set_token_amount',self.issue_token_amount);
           console.log()
           self.$router.push('home');
         });
     }
    }
  }
</script>

<style scoped>

</style>
