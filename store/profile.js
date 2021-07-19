export const state = () => ({
  userMail: '',
  description: '',
  region: '',
  github: '',
  linkedin: '',
  facebook: '',
  googleScholar: '',
  website: '',
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
  SET_GITHUB(state, github) {
    state.github = github
  },
  SET_LINKEDIN(state, linkedin) {
    state.linkedin = linkedin
  },
  SET_FACEBOOK(state, facebook) {
    state.facebook = facebook
  },
  SET_GOOGLESCHOLAR(state, googleScholar) {
    state.googleScholar = googleScholar
  },
  SET_WEBSITE(state, website) {
    state.website = website
  },
}
