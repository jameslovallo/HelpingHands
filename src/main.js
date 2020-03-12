// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue"
import * as VueGoogleMaps from "vue2-google-maps"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

export default function(Vue, { router, head, isClient, appOptions }) {
	// Set default layout as a global component
	Vue.component("Layout", DefaultLayout)
	Vue.use(VueGoogleMaps, {
		load: {
			key: "AIzaSyAHeFzImxoXokNH2UAXc6lbJPW4qJGTTls",
			libraries: "places"
		}
	})
	Vue.use(Vuetify)
	appOptions.vuetify = new Vuetify({
		icons: { iconfont: "mdiSvg" },
		theme: {
			options: {
				customProperties: true,
				minifyTheme: function(css) {
					return process.env.NODE_ENV === "production"
						? css.replace(/[\r\n|\r|\n]/g, "")
						: css
				}
			},
			themes: {
				light: {
					primary: "#3f51b5",
					secondary: "#b0bec5",
					accent: "#512da8",
					error: "#b71c1c"
				}
			}
		}
	})
}
