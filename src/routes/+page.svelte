<script lang="ts">
	import TagOptionCard from '$lib/components/TagOptionCard.svelte';
	import TagSelect from '$lib/components/TagSelect.svelte';
	import { predefinedTags, tags } from '$lib/stores/tags';

	$: initialState = $tags.length == 0;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1">10k Planner</h1>

		<p>คุณจะนำเงินดิจิทัล 10,000 ฿ ไปใช้ทำอะไรบ้าง ?</p>

		{#if initialState}
			<div class="flex gap-2 flex-wrap px-8 justify-center">
				{#each predefinedTags as tag}
					<TagSelect label={tag} />
				{/each}
			</div>
		{/if}

		<div class="flex gap-2 flex-col px-4 justify-center w-96 max-w-[100vw]">
			{#each $tags as tag}
				<TagOptionCard bind:tag />
			{/each}
		</div>

		{#if initialState}
			<p>คลิกที่หัวข้อเพื่อเริ่มวางแผนการใช้เงินดิจิทัล</p>
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
