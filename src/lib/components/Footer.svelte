<script lang="ts" context="module">
	import {
		cleanupZeroValueTags,
		predefinedTags,
		remainingAmount,
		reorderTagsByValue,
		tags
	} from '$lib/stores/tags';
	import { writable } from 'svelte/store';
	import TagSelect from './TagSelect.svelte';
	import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { THB } from '$lib';
	import { state, viewOtherStats } from '$lib/stores/state';
	export const footer = writable(true);
</script>

<script lang="ts">
	$: initialState = $tags.length == 0;
	$: submittedState = $state === 'submitted';

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	function submit() {
		cleanupZeroValueTags();
		reorderTagsByValue();
		state.set('submitted');
		viewOtherStats.set(false);

		const entries = $tags.map((tag) => ({ name: tag.label, amount: tag.value }));

		fetch('/api/submit', {
			method: 'POST',
			body: JSON.stringify(entries),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	function restart() {
		state.set('input');
		tags.set([]);
	}
</script>

{#if $footer}
	{#if submittedState}
		<AppBar slotDefault="place-self-center" background="bg-transparent">
			<svelte:fragment slot="lead">
				<div>
					<div class="text-sm">
						made with 🧡 by <a
							href="https://narze.live"
							target="_blank"
							class="text-primary-500 hover:text-primary-800">narze</a
						>
					</div>
					<div class="text-sm">
						<a
							href="https://ko-fi.com/narze"
							target="_blank"
							class="text-primary-500 hover:text-primary-800">เลี้ยงกาแฟ ☕️</a
						> เพื่อสนับสนุนผลงาน
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn rounded-lg variant-ghost-secondary" on:click={restart}>เริ่มใหม่</button>
			</svelte:fragment>
		</AppBar>
	{:else if initialState}
		<AppBar
			gridColumns="grid-cols-1"
			slotDefault="place-self-center text-center"
			background="bg-transparent"
		>
			<div class="text-sm">
				made with 🧡 by <a
					href="https://narze.live"
					target="_blank"
					class="text-primary-500 hover:text-primary-800">narze</a
				>
			</div>
			<div class="text-sm">
				<a
					href="https://ko-fi.com/narze"
					target="_blank"
					class="text-primary-500 hover:text-primary-800">เลี้ยงกาแฟ ☕️</a
				> เพื่อสนับสนุนผลงาน
			</div>
		</AppBar>
	{:else}
		<div class="bg-surface-100-800-token">
			<div class="container mx-auto -space-y-2 max-w-screen-md">
				<AppBar gridColumns="grid-cols-1" slotDefault="max-h-40 m-0 overflow-y-auto" class="!p-0">
					<div class="p-4">
						<div class="flex gap-2 flex-wrap justify-center">
							{#each predefinedTags as tag}
								<TagSelect label={tag} small={true} />
							{/each}
						</div>
					</div>
				</AppBar>

				<AppBar
					gridColumns="grid-cols-3"
					slotDefault="place-self-center"
					slotTrail="place-content-end"
				>
					<svelte:fragment slot="lead">
						<div class="text-lg">
							เหลือ: {$remainingAmount.toLocaleString()}
							{THB}
							{#if $remainingAmount == 0}
								✅
							{/if}
						</div>
					</svelte:fragment>

					<svelte:fragment slot="trail">
						{#if $remainingAmount !== 0}
							<button
								disabled={true}
								class="btn rounded-lg variant-filled-primary [&>*]:pointer-events-none"
								use:popup={popupHover}>ต่อไป</button
							>
							<div class="!m-0 card p-2 variant-filled-warning" data-popup="popupHover">
								<p>ใช้ให้ครบ 10,000 {THB} ก่อน</p>
								<div class="arrow variant-filled-warning" />
							</div>
						{:else}
							<button class="btn rounded-lg variant-filled-success" on:click={submit}>ต่อไป</button>
						{/if}
					</svelte:fragment>
				</AppBar>
			</div>
		</div>
		<!-- <svelte:fragment slot="lead"><div></div></svelte:fragment>

			<svelte:fragment slot="trail">

			</svelte:fragment> -->
	{/if}
{/if}
