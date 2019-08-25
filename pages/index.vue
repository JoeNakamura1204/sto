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
      <el-row :gutter="21" v-if="workingSteps !==1">
        <el-col :span="15">
          <CreateToken v-if="workingSteps ===2"></CreateToken>
          <DocumentManage v-if="workingSteps ===3"></DocumentManage>
        </el-col>
        <el-col :span="6">
          <Side_token></Side_token>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import AppLogo from '~/components/AppLogo.vue'
import Ticker from '~/components/Ticker.vue'
import Side_token from '~/components/Side_token.vue'
import CreateToken from '~/components/CreateToken.vue'
import DocumentManage from '~/components/DocumentManage.vue'

import {mapState} from 'vuex'
import firebase from '@/plugins/firebase'


export default {
  layout:'navbar',
  components: {
    AppLogo,
    Ticker,
    CreateToken,
    Side_token,
    DocumentManage
  },
  computed:mapState(["isLoggedIn","workingSteps","my_account","current_provider","ERC1400Factory_address","token_name","token_symbol"]),
  created:function(){
    if(this.isLoggedIn === true){

    }else {
      this.$router.push('sign_in');
    }
    let web3 = new Web3(Web3.givenProvider);
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
    }
  }
}


</script>

<style>
  .steps{
    margin-top: 30px;
  }

  .content-container{
    padding: 30px;
  }
</style>

