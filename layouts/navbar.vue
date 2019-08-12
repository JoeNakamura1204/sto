<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" >
      <el-menu-item index="1">
        <img src="~/assets/polymath.svg">
      </el-menu-item>
      <el-menu-item index="2"><i class="el-icon-apple"></i>{{currentProvider}}</el-menu-item>
      <el-menu-item class="menu-right" index="3">{{myAccount}}</el-menu-item>
      <el-submenu class="menu-right" index="4">
        <template slot="title"><i class="el-icon-user"></i></template>
        <el-menu-item index="2-1">User Profile</el-menu-item>
        <el-menu-item index="2-2">Sign Out</el-menu-item>
      </el-submenu>

    </el-menu>
  <nuxt></nuxt>
  </div>
</template>

<script>
  import Web3 from 'web3'
    export default {
      name: "navbar",
      data:function () {
        return{
          currentProvider:"",
          myAccount:""
        }
      },
      created:function () {
        let web3 = new Web3(Web3.givenProvider);
        let connectedProvider = web3.currentProvider.networkVersion;
        if(connectedProvider =="42"){
          this.currentProvider = "Kovan Testnet"
        }else if(connectedProvider=="3"){
          this.currentProvider = "Ropsten Testnet"
        }else{
          this.currentProvider = "Other Net"
        }

        web3.eth.getAccounts().then((account)=>{
          this.myAccount = account[0];
        });
      }
    }
</script>

<style scoped>
.menu-right{
  float: right;
}
</style>
