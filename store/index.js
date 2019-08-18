export const state = () => ({
  isLoggedIn:false,
  workingSteps:1,
  my_account:"",
  current_provider:""
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
  }
};


