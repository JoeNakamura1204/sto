export const state = () => ({
  isLoggedIn:false,
  workingSteps:4,
  my_account:"",
  current_provider:"",
  ERC1400Factory_address:"0xba206a609f46230d13744e87D8DbECe6f1a3e813",
  ERC1400_address:"0xe7f2c7A808c525c5eB5be00c679d6CE7936eE8C8",
  token_name:"Not issued yet",
  token_symbol:"",
  token_amount:0,
  documents_attached:["https://polymath.network/"],
  investers_address:[],
  partion_history:[
    {
      txhash: "fdfadsfsdafgsasgsasa",
      amount:1000,
      name:"Name",
      data:"sample.com"
    }
  ]
});

export const mutations = {
  sign(state){
    state.isLoggedIn= !state.isLoggedIn
  },
  proceedStep(state){
    state.workingSteps++;
    if(state.workingSteps == 6 ){
      this.$router.push('home');
    }
  },
  set_my_account(state, account){
    state.my_account= account;
    // document.getElementById('my-account-created').style.color="#67c23a"
  },
  set_current_provider(state, provider){
    state.current_provider= provider
  },
  set_token_amount(state, amount){
    state.token_amount = state.token_amount + amount;
    // document.getElementById('token-amount-created').style.color="#67c23a"
  },
  set_token_name(state, token_name){
    state.token_name= token_name;
    // document.getElementById('token-name-created').style.color="#67c23a"
  },
  set_token_symbol(state, token_symbol){
    state.token_symbol= token_symbol;
    // document.getElementById('token-symbol-created').style.color="#67c23a"
  },
  set_ERC1400_address(state, ERC1400_address){
    state.ERC1400_address= ERC1400_address;
    // document.getElementById('token-address-created').style.color="#67c23a"
  },
  set_documents_attached(state, url){
    state.documents_attached.push(url)
  },
  // 一旦応急処置
  set_investers_address(state, invester_address){
    const invester = {
      date: "2019/08/29",
      name: "undifined",
      address: invester_address
    };
    state.investers_address.push(invester)
  },
  set_partion_history(state, txhash,amount, name, data){
    const partion = {
      txhash: txhash,
      amount:amount,
      name:name,
      data:data
    };
    state.partion_history.push(partion)
  }
};


