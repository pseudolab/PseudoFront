import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
// import cookie from 'cookie'
export default (context) => {
  const { store } = context
  createPersistedState({
    paths: ['signIn', 'profile'],
    storage: {
      getItem: (key) => {
        if (process.client) {
          return Cookies.get(key)
          // } else {
          // NOTE: server 런타임 환경에서 사용
          //   const { req } = context
          //   const parsedCookies = cookie.parse(req.headers.cookie)
          //   return parsedCookies[key]
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 1, secure: false }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
