<template>
  <div>
    <el-steps v-if="workingSteps !== 1" :active="workingSteps" align-center class="steps" finish-status="success">
      <el-step title="トークンシンボルの作成"></el-step>
      <el-step title="トークンの作成" ></el-step>
      <el-step title="ドキュメントの管理" ></el-step>
      <el-step title="セキュリティオファリングの設定" ></el-step>
    </el-steps>

    <div class="content-container">
      <ticker v-if="workingSteps ===1"></ticker>
      <CreateToken v-if="workingSteps !==1"></CreateToken>

      <el-button @click="call">Call </el-button>
      <el-button @click="poly">Create ERC1400</el-button>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import AppLogo from '~/components/AppLogo.vue'
import Ticker from '~/components/Ticker.vue'
import CreateToken from '~/components/CreateToken.vue'
import {mapState} from 'vuex'
import firebase from '@/plugins/firebase'

import { Polymath, browserUtils } from '@polymathnetwork/sdk';

export default {
  layout:'navbar',
  components: {
    AppLogo,
    Ticker,
    CreateToken
  },
  computed:mapState(["isLoggedIn","workingSteps","my_account","current_provider","ERC1400Factory_address","token_name","token_symbol"]),
  created:function(){
    if(this.isLoggedIn === true){

    }else {
      this.$router.push('sign_in');
    }
    let web3 = new Web3(Web3.givenProvider);
    web3.eth.getAccounts().then((account)=>{
      console.log(account)
    });

  },
  data(context){
    return{
      note_content: 'hello'
    }
  },
  methods:{
    signIn:function(){
      this.$store.commit('sign')
    },
    next:function(){
      this.$store.commit('proceedStep')
    },
    call:function(){
      let web3 = new Web3(Web3.givenProvider);
      var myContract = new web3.eth.Contract(abi, this.ERC1400Factory_address, {
        from: this.my_account, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });
      myContract.methods.getDeployedERC1400().call().then(function (result) {
        console.log(result)
      })
    },
    poly:function () {
      let web3 = new Web3(Web3.givenProvider);
      var myContract = new web3.eth.Contract(abi, this.ERC1400Factory_address, {
        from: this.my_account, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });

      console.log(myContract)

      const controller = '0xb5747835141b46f7C472393B31F8F5A57F74A44f';
      console.log(myContract.methods);
      myContract.methods.createERC1400("joe","joe",1, [controller]).send({from: this.my_account}).then(function (result) {
        console.log(result)
      })
    }
  }
}

let abi =[
  {
    "constant": true,
    "inputs": [],
    "name": "certificateSigner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x06b23667"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deployedERC1400",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x4d54de56"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenDefaultPartitions",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8b81dced"
  },
  {
    "inputs": [
      {
        "name": "certificat",
        "type": "address"
      },
      {
        "name": "tokenDefaul",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "granularity",
        "type": "uint256"
      },
      {
        "name": "controllers",
        "type": "address[]"
      }
    ],
    "name": "createERC1400",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x067f892d"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getDeployedERC1400",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x4f574b0d"
  }
]



</script>

<style>
  .steps{
    margin-top: 30px;
  }

  .content-container{
    padding: 30px;
  }
</style>

