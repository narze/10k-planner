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
