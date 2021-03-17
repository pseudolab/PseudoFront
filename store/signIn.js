export const state = () => ({
  isSignIn: true,
})

export const mutations = {
  signIn(state) {
    state.isSignIn = true
  },
  signOut(state) {
    state.isSignIn = false
  },
}
