export const state = () => ({
  isLoggedIn:false,
  workingSteps:1,
  my_account:"",
  current_provider:"",
  ERC1400Factory_address:"0xba206a609f46230d13744e87D8DbECe6f1a3e813",
  ERC1400_address:"Not issue yet",
  token_name:"Not issued yet",
  token_symbol:"",
  token_amount:0,
  documents_attached:["https://polymath.network/"],
  investers_address:[],
  partion_history:[]
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
  set_investers_address(state, invester_address){
    state.investers_address.push(invester_address)
  },
  set_partion_history(state, address,amount, name, data){
    const partion = {address:"",amount:0,name:"",data:""};
    state.partion_history.push(partion)
  }
};


