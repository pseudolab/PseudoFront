// https://axios.nuxtjs.org/extend/ for middleware
// export default function ({ $axios, store, redirect }) {
export default function ({ $axios, store, redirect }) {
  // $axios.onRequest((config) => {
  //  config.headers.common.Authorization
  // })
  // $axios.onResponseError(async (err) => {
  // if error response status is 401, it means the request was invalid due to expired access token
  // if (err.config && err.response && err.response.status === 401) {
  //   if (!store.getters.loggedIn) { throw err }
  //   await store.dispatch('logoutUser')
  //   if (err.config.url.endsWith('/token_refresh/')) {
  //     return redirect('/')
  //   }
  // } else {
  // throw err
  // }
  // })
}
