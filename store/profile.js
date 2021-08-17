export const state = () => ({
  id: null,
  isAdmin: null,
  userName: null,
  profileImageURL: null,
  userMail: null,
  description: '',
  region: '',
  github: '',
  linkedIn: '',
  facebook: '',
  googleScholar: '',
  website: '',
})

export const mutations = {
  SET_USER_INFO(state, payload) {
    Object.keys(state).forEach((key) => {
      state[key] = payload[key] ?? state[key]
    })
    console.log(state, payload)
  },
}
