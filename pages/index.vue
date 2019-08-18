<template>
  <div>
    <el-steps v-if="workingSteps === 3" :active="workingSteps" align-center class="steps" finish-status="success">
      <el-step title="Reserve Token Symbol"></el-step>
      <el-step title="Create Token" ></el-step>
      <el-step title="Manage Documents" ></el-step>
      <el-step title="Set Up Offering Details" ></el-step>
    </el-steps>

    <div class="container"></div>

    <ticker v-if="workingSteps ===1"></ticker>

    <el-button @click="next">Next step</el-button>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Ticker from '~/components/ticker.vue'
import {mapState} from 'vuex'
// import sto from '../polymath-core/CLI/commands/ST20Generator'
import firebase from '@/plugins/firebase'

export default {
  layout:'navbar',
  components: {
    AppLogo,
    Ticker
  },
  computed:mapState(["isLoggedIn","workingSteps"]),
  created:function(){
    if(this.isLoggedIn === true){

    }else {
      this.$router.push('sign_in');
    }
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
    sto_generate:function () {
      executeApp("", "", "Joe","",true);
    }
  }
}
</script>

<style>
  .steps{
    margin-top: 30px;
  }
</style>

