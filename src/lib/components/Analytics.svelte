<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let id = 'G-XK8D3TCFDN';

	// run analytics only on production
	const nonDev = process.env.NODE_ENV !== 'development';

	$: if (browser) {
		if (typeof window.gtag !== 'undefined') {
			// console.log('configuring', id, document.title, $page.url.pathname);

			window.gtag('config', id, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	{#if nonDev}
		<script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			// gtag('config', id);
		</script>
	{:else}
		<script>
			console.log('Google Analytics script omitted from development env');
		</script>
	{/if}
</svelte:head>
