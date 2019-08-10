export const state = () => ({
      user_signedIn:false
});

export const mutations = {
  sign(state){
    state.user_signedIn = !state.user_signedIn
  }
};
