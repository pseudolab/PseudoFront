// import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - PseudoFront',
    title: 'PseudoFront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        name: 'google-signin-scope',
        content: 'profile email',
      },
      {
        name: 'google-signin-client_id',
        //client id
        content:
          '1073354523687-i8rp8n5gvkju0uva9nrv8tgh0n5bqf47.apps.googleusercontent.com',
      },
    ],
    script: [
      {
        src: 'https://apis.google.com/js/platform.js',
        defer: true,
        async: true,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/date-filter.js',
    '~plugins/global-constants.js',
    '~/plugins/axios.js',
    '~/plugins/vue-moment.js',
    '~/plugins/persistedState.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },
  proxy: {
    '/git/': 'https://gist.github.com/',
    '/routes/': '18.219.68.85:4000',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: false,
    theme: {
      dark: false,
      themes: {
        // only use assets/styles/common/settings/colors.scss
        light: {
          primary: '#0077a3',
          //   secondary: '#b0bec5',
          //   accent: '#8c9eff',
          error: '#b71c1c',
          anchor: '#e9eff1',
          point: '#2715b9',
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
  },
}
