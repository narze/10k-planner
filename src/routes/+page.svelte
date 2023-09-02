<script lang="ts">
	import TagViewCard from '$lib/components/TagViewCard.svelte';
	import TagOptionCard from '$lib/components/TagOptionCard.svelte';
	import TagSelect from '$lib/components/TagSelect.svelte';
	import { state, viewOtherStats } from '$lib/stores/state';
	import { predefinedTags, tags } from '$lib/stores/tags';
	import { writable } from 'svelte/store';

	$: initialState = $tags.length == 0;
	$: submittedState = $state === 'submitted';

	const otherStatTags = writable([]);

	function toggleViewStats() {
		viewOtherStats.update((prev) => !prev);
	}

	$: if ($viewOtherStats && $otherStatTags.length === 0) {
		fetch('/api/stats', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(async (result) => {
			const resultJson = await result.json();
			otherStatTags.set(
				resultJson.stats.map((tag: { name: string; _sum: { amount: number } }) => ({
					label: tag.name,
					value: tag._sum.amount
				}))
			);
		});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1 text-primary-500 font-bold">10k Planner</h1>

		{#if submittedState}
			{#if !$viewOtherStats}
				<div>คุณจะนำเงินดิจิทัล 10,000 ฿ ไปใช้ทำอะไรบ้าง ?</div>

				<div class="flex gap-2 flex-col px-4 justify-center w-96 max-w-[100vw]">
					{#each $tags as tag}
						<TagViewCard {tag} />
					{/each}
				</div>

				<div class="flex gap-2 flex-col px-4 justify-center w-96 max-w-[100vw]">
					<button class="btn variant-soft-primary" on:click={toggleViewStats}
						>ดูผลรวมของคนอื่นๆ</button
					>
				</div>
			{:else}
				<div>คนอื่นๆ จะนำเงินดิจิทัล 10,000 ฿ ไปใช้ทำอะไรบ้าง ?</div>

				<div class="flex gap-2 flex-col px-4 justify-center w-96 max-w-[100vw]">
					{#if $otherStatTags.length == 0}
						<TagViewCard tag={{ label: 'Loading...', value: 0 }} />
					{/if}

					<!-- Remarks -->
					<!-- <div class="text-sm"></div> -->

					{#each $otherStatTags as tag}
						<TagViewCard {tag} />
					{/each}
				</div>

				<div class="flex gap-2 flex-col px-4 justify-center w-96 max-w-[100vw]">
					<button class="btn variant-soft-primary" on:click={toggleViewStats}>ดูผลของตัวเอง</button>
				</div>
			{/if}
		{:else}
			<div>คุณจะนำเงินดิจิทัล 10,000 ฿ ไปใช้ทำอะไรบ้าง ?</div>

			{#if initialState}
				<div class="flex gap-2 flex-wrap px-8 justify-center">
					{#each predefinedTags as tag}
						<TagSelect label={tag} />
					{/each}
				</div>
			{/if}

			{#if !initialState}
				<div class="flex gap-2 flex-col px-4 justify-center w-96 max-w-[100vw]">
					{#each $tags as tag}
						<TagOptionCard bind:tag />
					{/each}
				</div>
			{/if}

			{#if initialState}
				<div>คลิกที่หัวข้อเพื่อเริ่มวางแผนการใช้เงินดิจิทัล</div>
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
