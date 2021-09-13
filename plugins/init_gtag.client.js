
// init_gtag.js

import Vue from "vue";
import VueGtag from "vue-gtag";

// export default ({ isDev, app }) => {
// 	if (!isDev){
// 		Vue.use(VueGtag, {
// 			config: { id: 'G-XXX' }
// 		},
// 		app.router);
// 	} else {
// 		console.log("Skipping GA in development")
// 	}
// }

export default function ({ app } ) {
  Vue.use(VueGtag, {
      config: { id: app.context.env.gtagId },
      appName: 'Otherlove Netlify Site',
      pageTrackerScreenviewEnabled: true,
  }, app.router);
}
