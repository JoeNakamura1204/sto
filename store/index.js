export const state = () => ({
  isLoggedIn:false
});

export const mutations = {
  sign(state){
    state.isLoggedIn= !state.isLoggedIn
  }
};
