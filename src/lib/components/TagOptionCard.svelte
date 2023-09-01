<script lang="ts">
	import { remainingAmount, type ChosenTag } from '$lib/stores/tags';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { removeTag } from '$lib/stores/tags';
	import { THB } from '$lib';

	export let tag: ChosenTag;

	const labelEditable = tag.label === 'อื่นๆ';

	function handleDelete() {
		removeTag(tag.label);
	}

	function validateValue(event: Event) {
		const target = event.target as HTMLInputElement;
		const inputValue = +target.value;

		if (inputValue < 0 || inputValue > $remainingAmount + tag.value) {
			tag.value = 0;
			target.value = '0';
		}
	}

	function autofocus(el: HTMLInputElement) {
		el.focus();
		el.select();
	}

	function editLabelOnBlur() {
		tag.label = tag.label.trim();

		if (tag.label === '') {
			tag.label = 'อื่นๆ';
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
		<span class="flex justify-between items-center gap-x-2">
			{#if labelEditable}
				<input
					use:autofocus
					class="input w-24 h-8 px-1 mr-2 text-center rounded variant-ghost-secondary border-primary-300"
					bind:value={tag.label}
					on:blur={editLabelOnBlur}
				/>
			{:else}
				<span class="text-lg mr-4">{tag.label}</span>
			{/if}
			<span class="mr-4"
				><input
					class="input w-20 h-8 px-1 text-center rounded-sm variant-ghost-primary border-primary-300"
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
			class="pt-2"
			name="range-slider"
			bind:value={tag.value}
			max={$remainingAmount + tag.value}
			step={100}
			min={0}
			disabled={$remainingAmount + tag.value == 0}
		></RangeSlider>
	</section>
</div>
