<template>
  <div class="content-container">

    <el-row :gutter="21">
      <el-col :span="15">

        <template>
          <el-alert
            title="株式の発行履歴"
            type="success"
            description="今までに発行した株式の記録が表示されます">
          </el-alert>
        </template>

        <el-tabs type="border-card">
          <el-tab-pane label="株式発行の履歴">

            <el-collapse accordion v-for="(partition, index) in partion_history" :key="index">
              <el-collapse-item name="1">
                <template slot="title">
                  {{partition.name}}
                </template>
                <div>発行株式数：{{partition.amount}}</div>
                <div>発行株式：{{partition.partition_byte}}</div>
                <div>添付データ：{{partition.data}}</div>
                <div>トランザクションハッシュ：{{partition.txhash}}</div>
                <el-button @click="dialogFormVisible = true">株式トークンを送付する</el-button>
              </el-collapse-item>
              <!--              Dialog　　　　　　　　-->
              <el-dialog title="発行したトークンの送付" :visible.sync="dialogFormVisible">
                <el-form >
                  <el-form-item label="投資家のアドレス" required>
                    <el-input v-model="invester_address" autocomplete="off" ></el-input>
                  </el-form-item>

                  <el-form-item label="送付する株式数" required>
                    <el-input v-model="token_send_amount" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>

                <el-form label-width="120px" label-position="top" class="token-name">
                  <el-form-item label="株式トークンに付与する情報URL" required>
                    <el-input placeholder="Enter URL here" v-model="token_document_url">
                      <template slot="prepend">Http://</template>
                    </el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="send_token(partition.partition_byte)">送付する</el-button>
                </span>
              </el-dialog>


            </el-collapse>

          </el-tab-pane>
          <el-tab-pane label="株価">株価</el-tab-pane>
        </el-tabs>

      </el-col>
      <el-col :span="6">
        <Side_token></Side_token>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Side_token from '~/components/Side_token.vue'
  import {mapState} from 'vuex'
  import Web3 from 'web3'
  import Abi from './abi/ERC1400_abi'
    export default {
      name: "home",
      layout:'navbar',
      components:{
        Side_token
      },
      computed:mapState(["isLoggedIn","documents_attached","partion_history","ERC1400_address","my_account"]),
      data:function () {
        return{
          dialogTableVisible: false,
          dialogFormVisible: false,
          invester_address:"",
          token_send_amount:0,
          token_document_url:""
        }
      },
      methods:{
        send_token:function (Partition) {
          let abi = Abi['abi'];
          let web3 = new Web3(Web3.givenProvider);
          // connect contract
          let ERC1400Contract = new web3.eth.Contract(abi, this.ERC1400_address, {
            from: this.my_account, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
          });
          const self = this;
          const attache_data = web3.utils.sha3(this.token_document_url);
          console.log(this.invester_address);
          ERC1400Contract.methods.transferByPartition(Partition, this.invester_address, this.token_send_amount, attache_data).send({from: this.my_account})
            .then(function (result) {
              console.log(result);
              self.$router.push('home');
          })
        },
      }
  }
</script>

<style scoped>
  .el-alert{
    margin-bottom: 15px;
  }
</style>
