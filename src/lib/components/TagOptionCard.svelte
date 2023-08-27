<script lang="ts">
	import { remainingAmount, type ChosenTag } from '$lib/stores/tags';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { removeTag } from '$lib/stores/tags';
	import { THB } from '$lib';

	export let tag: ChosenTag;

	function handleDelete() {
		removeTag(tag.label);
	}

	function validateValue(event: Event) {
		const target = event.target as HTMLInputElement;
		const inputValue = +target.value;

		if (inputValue < 0 || inputValue > $remainingAmount + tag.value) {
			tag.value = 0;
		}
	}
</script>

<div class="card card-hover rounded-sm variant-soft-primary relative">
	<button
		on:click={handleDelete}
		class="btn btn-sm rounded-full variant-filled-error flex items-center font-bold absolute top-0 right-0 m-1 w-6 h-6"
	>
		<span class="">X</span>
	</button>

	<section class="p-4">
		<span class="flex justify-center items-center gap-x-2"
			>{tag.label}
			<span
				><input
					class="input w-20 h-6 px-1 text-center rounded-sm variant-ghost-primary border-none"
					bind:value={tag.value}
					on:input={validateValue}
					max={$remainingAmount + tag.value}
					type="number"
					step={100}
					min={0}
				/>
				{THB}</span
			></span
		>
		<RangeSlider
			name="range-slider"
			bind:value={tag.value}
			max={$remainingAmount + tag.value}
			step={100}
			min={0}
		></RangeSlider>
	</section>
</div>
