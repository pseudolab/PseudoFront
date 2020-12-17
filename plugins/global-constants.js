import Vue from 'vue';

// define global constants.
const _globalConsts = Object.freeze({
  
});

const ConstantsPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $globalConsts: {
        get () {
          return _globalConsts;
        },
      },
    });
  },
};

Vue.use(ConstantsPlugin);

export default _globalConsts;
