<template>
  <el-steps :active="2" align-center class="steps" finish-status="success">
    <el-step title="Reserve Token Symbol"></el-step>
    <el-step title="Create Token" ></el-step>
    <el-step title="Manage Documents" ></el-step>
    <el-step title="Set Up Offering Details" ></el-step>
  </el-steps>

</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import {mapState} from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  layout:'navbar',
  components: {
    AppLogo
  },
  computed:mapState(["isLoggedIn"]),
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
    saveContent:function (value) {
      let newNoteKey = firebase.database().ref().child('notes').push().key;
      firebase.database().ref('notes/'+ newNoteKey).set({content:value})
    }
  }
}
</script>

<style>
  .steps{
    margin-top: 30px;
  }
</style>

