<script lang="ts" context="module">
	import { predefinedTags, remainingAmount, tags } from '$lib/stores/tags';
	import { writable } from 'svelte/store';
	import TagSelect from './TagSelect.svelte';
	import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { THB } from '$lib';
	export const footer = writable(true);
</script>

<script lang="ts">
	$: initialState = $tags.length == 0;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

{#if $footer}
	{#if !initialState}
		<div class="-space-y-4">
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
					{#if $remainingAmount !== 0}
						<button
							disabled={true}
							class="btn variant-filled-primary [&>*]:pointer-events-none"
							use:popup={popupHover}
							on:click={() => tags.set([])}>ต่อไป</button
						>
						<div class="!m-0 card p-2 variant-filled-warning" data-popup="popupHover">
							<p>ใช้ให้ครบ 10,000 {THB} ก่อน</p>
							<div class="arrow variant-filled-warning" />
						</div>
					{:else}
						<button class="btn variant-filled-primary" on:click={() => tags.set([])}>ต่อไป</button>
					{/if}
				</svelte:fragment>
			</AppBar>
		</div>
		<!-- <svelte:fragment slot="lead"><div></div></svelte:fragment>

			<svelte:fragment slot="trail">

			</svelte:fragment> -->
	{/if}
{/if}
