export const state = () => ({
  userMail: '',
  description: '',
  region: '',
})

export const mutations = {
  SET_USER_MAIL(state, userMail) {
    state.userMail = userMail
  },
  SET_DESCRIPTION(state, description) {
    state.description = description
  },
  SET_REGION(state, region) {
    state.region = region
  },
}
