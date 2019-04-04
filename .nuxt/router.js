import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2dde563e = () => import('../pages/thankyou.vue' /* webpackChunkName: "pages/thankyou" */).then(m => m.default || m)
const _64c1e2b4 = () => import('../pages/start.vue' /* webpackChunkName: "pages/start" */).then(m => m.default || m)
const _d5fd284a = () => import('../pages/bookings/_experienceId.vue' /* webpackChunkName: "pages/bookings/_experienceId" */).then(m => m.default || m)
const _1c67bb16 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/thankyou",
			component: _2dde563e,
			name: "thankyou___id"
		},
		{
			path: "/en/thankyou",
			component: _2dde563e,
			name: "thankyou___en"
		},
		{
			path: "/start",
			component: _64c1e2b4,
			name: "start___id"
		},
		{
			path: "/en/start",
			component: _64c1e2b4,
			name: "start___en"
		},
		{
			path: "/bookings/:experienceId?",
			component: _d5fd284a,
			name: "bookings-experienceId___id"
		},
		{
			path: "/en/bookings/:experienceId?",
			component: _d5fd284a,
			name: "bookings-experienceId___en"
		},
		{
			path: "/",
			component: _1c67bb16,
			name: "index___id"
		},
		{
			path: "/en/",
			component: _1c67bb16,
			name: "index___en"
		}
    ],
    
    
    fallback: false
  })
}
