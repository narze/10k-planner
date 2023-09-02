<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Analytics from '$lib/components/Analytics.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Analytics />

<svelte:head>
	<title>💸 10k Planner</title>

	<!-- Open Graph-->
	<meta property="og:title" content="💸 10k Planner" />
	<meta property="og:description" content="คุณจะนำเงินดิจิทัล 10,000 ฿ ไปใช้ทำอะไรบ้าง ?" />
	<meta property="og:image" content="https://pptr.io/api/screenshot?url=https://10k.narze.live" />
	<meta property="og:url" content="https://10k.narze.live" />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>
