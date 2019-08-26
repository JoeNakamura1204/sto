export const state = () => ({
  isLoggedIn:false,
  workingSteps:1,
  my_account:"",
  current_provider:"",
  ERC1400Factory_address:"0x1C42064E15d780Ea98Ce650158be5951cFEdC6ea",
  ERC1400_address:"0x6005B9B9B0051Aa046354827dDc336361d718A5C",
  token_name:"Undifined",
  token_symbol:"",
});

export const mutations = {
  sign(state){
    state.isLoggedIn= !state.isLoggedIn
  },
  proceedStep(state){
    state.workingSteps++;
    if(state.workingSteps == 5 ){
      state.workingSteps = 1
    }
  },
  get_my_account(state, account){
    state.my_account= account
  },
  get_current_provider(state, provider){
    state.current_provider= provider
  },
  set_token_name(state, token_name){
    state.token_name= token_name
  },
  set_token_symbol(state, token_symbol){
    state.token_symbol= token_symbol
  },
  set_ERC1400_address(state, ERC1400_address){
    state.ERC1400_address= ERC1400_address
  }
};


