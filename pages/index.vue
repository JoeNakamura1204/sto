<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        sto
      </h1>
      <el-button @click="signIn">Default</el-button>
      {{isLoggedIn}}
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
      <p><textarea v-model="note_content"></textarea></p>
      <p><button @click="saveContent(note_content)">ノートを保存する</button></p>

      <nuxt-link to="sign_in">Sign In from here</nuxt-link>
    </div>
  </section>
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
      console.log("succeet to move!!")
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
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

