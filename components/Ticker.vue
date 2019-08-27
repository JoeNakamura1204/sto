<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix tiker">
      発行するトークンのシンボル
    </div>
    <div  class="text item">
      Start your private environment to select your Token symbol, create your Token, plan and execute your Security Token Offering.
    </div>

    <div  class="text item symbol-name">
      <el-form label-width="120px" label-position="top">
        <el-form-item label="Enter Token Symbol" class="token-symbol-form" required>
          <el-input
            placeholder="Up to 10 characters(example: TARO-A)"
            suffix-icon="el-icon-success"
            maxlength="7"
            show-word-limit
            v-model="symbol">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div  class="text item">
      <el-form label-width="120px" label-position="top">
        <el-form-item label="Issuer's address" required>
          <el-input disabled :value="my_account"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="privacy-check">
      <template>
        <!-- `checked` should be true or false -->
        <el-checkbox >primary利用規約に同意します</el-checkbox>
      </template>
      <template>
        <!-- `checked` should be true or false -->
        <el-checkbox>プライバシーポリシーに同意します</el-checkbox>
      </template>
      <el-button @click="proceed_step">アカウントを作成する</el-button>
    </div>


  </el-card>

</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "ticker",
      computed:mapState(["my_account","workingSteps","current_provider","token_name","token_symbol"]),
      data:function () {
        return{
          symbol:""
        }
      },
      watch:{
        symbol:function () {
          if(this.symbol.length>0){
            document.getElementsByClassName('el-input__icon el-icon-success')[0].style.color="#67c23a"
          }else{
            document.getElementsByClassName('el-input__icon el-icon-success')[0].style.color="#909399"
          }
          this.$store.commit('set_token_symbol',this.symbol);
        }
      },
      methods: {
        proceed_step:function () {
          if(this.symbol.length>0){
            this.$store.commit('proceedStep');
            console.log(this.workingSteps)
          }else{
            alert("トークンシンボルを入力してください")
          }
        }
      }
    }
</script>

<style scoped>
  .box-card{
    width:800px !important;
    margin: auto;
  }
  .clearfix.tiker{
    color: rgb(37, 45, 107);
    font-weight: 800;
    font-size: 24px;
    margin: 0px 25px;
  }
  .symbol-name{
    text-align: center;
    background-color: #ebf0f7;
    padding: 10px;
    margin-bottom: 20px;
  }
  .token-symbol-form{
    color: rgb(37, 45, 107);
    font-weight: 500;
    font-size: 18px;
  }
  .text.item{
    margin: 25px;
    line-height: 25px;
    color: rgb(90, 104, 114);
  }
  .privacy-check{
    display: block;
  }
  .el-checkbox{
    margin: 15px auto;
    display: block;
    width: 250px;
  }
  .el-button{
    background-color:rgb(37, 45, 107);
    margin: auto;
    display: block;
    color: white;
  }
</style>
