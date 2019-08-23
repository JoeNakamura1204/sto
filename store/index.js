export const state = () => ({
  isLoggedIn:false,
  workingSteps:1,
  my_account:"",
  current_provider:"",
  ERC1400Factory_address:"0x38Fa7E3047e93e983D60267368F06460F21a8F17",
  token_name:"",
  token_symbol:"",
});

export const mutations = {
  sign(state){
    state.isLoggedIn= !state.isLoggedIn
  },
  proceedStep(state){
    state.workingSteps++;
    if(state.workingSteps == 4 ){
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
  }
};


