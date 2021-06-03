export const state = () => ({
  isSignIn: false,
  idToken: null,
})

export const mutations = {
  SET_IS_SIGN_IN(state, signState) {
    state.isSignIn = signState
  },
  SET_TOKEN(state, idToken) {
    state.idToken = idToken
  },
}
