import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../static/css/normalize.css'

import '../static/css/tickle-create.webflow.css'

import '../static/css/webflow.css'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"Tickle Hosts","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Create, edit and manage your Tickle experiences and bookings"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.png"},{"href":"https:\u002F\u002Funpkg.com\u002Fvue-croppa\u002Fdist\u002Fvue-croppa.min.css","rel":"stylesheet","type":"text\u002Fcss"}],"script":[{"src":"https:\u002F\u002Fmaps.googleapis.com\u002Fmaps\u002Fapi\u002Fjs?key=AIzaSyCY3x0GxjLNamXJG-ghiecuPejkuLkIHQQ"},{"src":"https:\u002F\u002Fapis.google.com\u002Fjs\u002Fplatform.js"},{"src":"https:\u002F\u002Funpkg.com\u002Fvue-croppa\u002Fdist\u002Fvue-croppa.min.js"}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

