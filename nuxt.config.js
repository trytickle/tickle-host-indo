const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Tickle Hosts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Create, edit and manage your Tickle experiences and bookings' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {href: "https://unpkg.com/vue-croppa/dist/vue-croppa.min.css", rel: "stylesheet", type: "text/css"}
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCY3x0GxjLNamXJG-ghiecuPejkuLkIHQQ' },
      {src: 'https://apis.google.com/js/platform.js'},
      {src: "https://unpkg.com/vue-croppa/dist/vue-croppa.min.js"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#08C0FF' },

  /*  
  ** Global CSS
  */
  css: [
    '@/static/css/normalize.css',
    '@/static/css/tickle-create.webflow.css',
    '@/static/css/webflow.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  env: {
    // firebaseConfig: {
    //   apiKey: "AIzaSyCxjzIiNtQ0Nc2V1_j8eWFdHx0avp7-CSs",
    //   authDomain: "tickle-development.firebaseapp.com",
    //   databaseURL: "https://tickle-development.firebaseio.com",
    //   projectId: "tickle-development",
    //   storageBucket: "tickle-development.appspot.com",
    //   messagingSenderId: "1053739599789"
    // },
    // functionsUrl: 'https://us-central1-tickle-development.cloudfunctions.net/'
    firebaseConfig: {
      apiKey: "AIzaSyA1i2qU-jYhuVqlcWVeSAwuXvaHI9OqZpM",
      authDomain: "tickle-indonesia.firebaseapp.com",
      databaseURL: "https://tickle-indonesia.firebaseio.com",
      projectId: "tickle-indonesia",
      storageBucket: "tickle-indonesia.appspot.com",
      messagingSenderId: "228048389763"
    },
    functionsUrl: 'https://us-central1-tickle-indonesia.cloudfunctions.net/'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
