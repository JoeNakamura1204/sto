<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="19">
              <h1 class="metamask-error-title">Aw,Snap!</h1>
              <p class="metamask-error-description">
                Metamaskがインストールされていないようです。<br>
                このアプリケーションをご利用するためには、Chrome拡張機能のMetamaskをインストールしてください
              </p>
            </el-col>
            <el-col :span="5">
              <img src="~/assets/metamask.png" class="metamask-error">
            </el-col>
          </el-row>
        </div>

        <div class="text item">
          <el-link href="https://dapps.gamewith.jp/?p=78"> > Metamaskとは？<i class="el-icon-edit el-icon--right"></i></el-link>
          <br>
          <el-divider></el-divider>
          <el-link href="https://kasobu.com/metamask/">>Metamaskのインストール方法<i class="el-icon-view el-icon--right"></i></el-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "error_metamask"
    }
</script>

<style scoped>
  .box-card{
    margin-top: 160px;
    padding: 15px;
  }
  .metamask-error{
    width:130px;
  }
  .metamask-error-title{
    color: rgb(37, 45, 107);
  }
  .metamask-error-description{
    padding: 10px 20px 0px 0px;
  }
</style>
