import Vue from 'vue'

const constantValues = {
  // NOTE: 상수로 사용할 Object를 import해 여기 넣어 사용.
}

const ConstantsPlugin = {
  install(Vue) {
    Object.keys(constantValues).forEach((key) => {
      const newKey = `$${key}`
      if (!Vue.prototype[newKey]) {
        Object.defineProperty(Vue.prototype, newKey, {
          get: () => constantValues[key],
        })
      }
    })
  },
}

Vue.use(ConstantsPlugin)
