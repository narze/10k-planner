<script lang="ts">
	import { remainingAmount, type ChosenTag } from '$lib/stores/tags';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	export let tag: ChosenTag;
</script>

<div class="card card-hover rounded-sm variant-soft-primary">
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
