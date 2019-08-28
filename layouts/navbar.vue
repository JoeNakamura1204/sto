<template>
  <el-container>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="1">
          <nuxt-link to="/">
            <img src="~/assets/polymath.svg">
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="2" v-if="isLoggedIn"><i class="el-icon-apple"></i>{{current_provider}}</el-menu-item>
        <el-menu-item class="menu-right" index="3" disabled v-if="isLoggedIn">{{my_account}}</el-menu-item>
        <el-submenu class="menu-right" index="4" v-if="isLoggedIn">
          <template slot="title"><i class="el-icon-user"></i></template>
          <el-menu-item index="2-1">User Profile</el-menu-item>
          <el-menu-item index="2-2">Sign Out</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="68px">
        <el-menu
          default-active="workingSteps"
          class="el-menu-vertical-demo"
        >
          <nuxt-link to="/home">
            <el-menu-item index="1" >
              <i class="el-icon-s-home"></i>
            </el-menu-item>
          </nuxt-link>

          <nuxt-link to="/issueToken">
            <el-menu-item index="2" >
              <i class="el-icon-coin"></i>
            </el-menu-item>
          </nuxt-link>

          <nuxt-link to="/documents">
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
            </el-menu-item>
          </nuxt-link>

          <nuxt-link to="/investers">
            <el-menu-item index="4" >
             <i class="el-icon-user"></i>
            </el-menu-item>
          </nuxt-link>


          <el-menu-item index="5" >
            <i class="el-icon-setting"></i>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-row class="tac">
          <nuxt></nuxt>
        </el-row>
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
  import Web3 from 'web3'
  import {mapState} from 'vuex'

    export default {
      name: "navbar",
      computed:mapState(["isLoggedIn","workingSteps","my_account","current_provider"]),
      data:function () {
        return{
        }
      },
      created:function () {
        document.getElementsByClassName('el-menu-vertical-demo').height = screen.height;
        if (typeof web3 !== 'undefined') {
          let web3 = new Web3(Web3.givenProvider);
          let connectedProvider = web3.currentProvider.networkVersion;
          if(connectedProvider =="42"){
            this.$store.commit('set_current_provider',"Kovan Testnet");
          }else if(connectedProvider=="3"){
            this.$store.commit('set_current_provider',"Ropsten Testnet");
          }else{
            this.$store.commit('set_current_provider',"Local Net");
          }

          web3.eth.getAccounts().then((account)=>{
            this.$store.commit('set_my_account',account[0]);
          });
        }else{
          this.$router.push('sign_in');
        }
      }
    }
</script>

<style scoped>

  .el-main{
    padding: 50px;
  }
  .menu-right{
    float: right;
  }
  .el-menu-vertical-demo{
    width:68px;
    height:100%;
    position:fixed;
  }
</style>
