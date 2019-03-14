import App from './App.svelte';
import page from 'page'

let app = new App({
	target: document.body,
	props: {
	}
});

page('/', () => {
	console.log("/")
	import('./Home.svelte').then(m => {
		app.$set({page: m.default})
	})
});
page('/about', () => {
	console.log("about")
	import('./About.svelte').then(m => {
		app.$set({page: m.default})
	})
});
page.start();

export default app;
