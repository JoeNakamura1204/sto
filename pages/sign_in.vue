<template>
  <el-row>
    <el-col :span="10" :offset="7">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="signin-card-title">
            Sign In with metamask
            <img src="~/assets/metamask.png" class="metamask-signin">
          </span>
        </div>
        <div class="text item">
          ここではMetamaskを利用してログインを行います。<br>
          以下のボタンから本人であることの署名を行なってください。
          <el-row>
            <el-col :span="10" :offset="7">
              <el-button type="primary" class="signIn-button" @click="signIn" >Sign In with Metamask</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import Web3 from 'web3'
  import {mapState} from 'vuex'

    export default {
      name: "sign_in",
      computed:mapState(["isLoggedIn"]),
      layout:"navbar",
      created:function(){
        if (typeof web3 !== 'undefined') {

        }else{
          this.$router.push('error_metamask');
        }
      },
      methods:{
        signIn:function () {
          let web3 = new Web3(Web3.givenProvider);
          let password_sign = "This sign is needed to prove who you are.";
          web3.eth.getAccounts().then((account)=> {
            web3.eth.personal.sign(
              password_sign,
              account.toString(),
              "test password"
            ).then((result) => {
              this.$store.commit('sign');
              this.$router.push('/');
            }).catch((e) => {
              this.$router.push('sign_in');
            })
          })
        }
      }
    }
</script>

<style scoped>
  .box-card{
    margin-top: 160px;
  }
  .clearfix{
    text-align: center;
  }
  .metamask-signin{
    width:30px;
    position:relative;
    top:3px;
  }
  .signin-card-title{
    font-size:24px;
    line-height:30px;
    font-weight: 700;
  }
  .signIn-button{
    margin-top: 40px;
  }
</style>
