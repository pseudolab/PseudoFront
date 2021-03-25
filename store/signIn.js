export const state = () => ({
  isSignIn: false,
})

export const mutations = {
  SET_IS_SIGN_IN(state, signState) {
    state.isSignIn = signState
  },
}

export const actions = {
  async signIn({ commit }) {
    const result = await this.$axios.$get('/routes/auths/authTest')
    console.log(result)
    commit('SET_IS_SIGN_IN', true)
  },
}
