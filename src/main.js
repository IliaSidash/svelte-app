import App from './App.svelte';
import page from 'page'
import './styles/global.css';

let app = new App({
	target: document.body,
	props: {
        page: null
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
