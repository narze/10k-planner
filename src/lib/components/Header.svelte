<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { AppBar } from '@skeletonlabs/skeleton';
	export const header = writable(false);
</script>

{#if $header}
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead">💀</svelte:fragment>
		<strong class="text-xl uppercase">Skeleton</strong>

		<svelte:fragment slot="trail">
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://discord.gg/EXqV7W8MtY"
				target="_blank"
				rel="noreferrer"
			>
				Discord
			</a>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://twitter.com/SkeletonUI"
				target="_blank"
				rel="noreferrer"
			>
				Twitter
			</a>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://github.com/skeletonlabs/skeleton"
				target="_blank"
				rel="noreferrer"
			>
				GitHub
			</a>
		</svelte:fragment>
	</AppBar>
{/if}
