<script lang="ts" context="module">
	import { predefinedTags, remainingAmount, tags } from '$lib/stores/tags';
	import { writable } from 'svelte/store';
	import TagSelect from './TagSelect.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { THB } from '$lib';
	export const footer = writable(true);
</script>

<script lang="ts">
	$: initialState = $tags.length == 0;
</script>

{#if $footer}
	{#if !initialState}
		<div class="-space-y-6">
			<AppBar gridColumns="grid-cols-1">
				<div class="flex gap-2 flex-wrap justify-center">
					{#each predefinedTags as tag}
						<TagSelect label={tag} />
					{/each}
				</div>
			</AppBar>

			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
				<svelte:fragment slot="lead">
					<div>เหลือ: {$remainingAmount} {THB}</div>
				</svelte:fragment>

				<svelte:fragment slot="trail">
					<button class="btn btn-sm variant-ghost-surface" on:click={() => tags.set([])}
						>ต่อไป</button
					>
				</svelte:fragment>
			</AppBar>
		</div>
		<!-- <svelte:fragment slot="lead"><div></div></svelte:fragment>

			<svelte:fragment slot="trail">

			</svelte:fragment> -->
	{/if}
{/if}
