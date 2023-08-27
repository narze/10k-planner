<script lang="ts">
	import { remainingAmount, type ChosenTag } from '$lib/stores/tags';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { removeTag } from '$lib/stores/tags';

	export let tag: ChosenTag;

	function handleDelete() {
		removeTag(tag.label);
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
		<span class="">{tag.label}</span> : <span class="variant-soft">{tag.value} ฿</span>
		<RangeSlider
			name="range-slider"
			bind:value={tag.value}
			max={$remainingAmount + tag.value}
			step={100}
		></RangeSlider>
	</section>
</div>
