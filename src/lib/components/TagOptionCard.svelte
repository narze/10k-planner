<script lang="ts">
	import { remainingAmount, type ChosenTag, predefinedTags } from '$lib/stores/tags';
	import {
		RangeSlider,
		popup,
		Autocomplete,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { removeTag } from '$lib/stores/tags';
	import { THB } from '$lib';
	import { onMount, tick } from 'svelte';
	import { nanoid } from 'nanoid';
	import { fly } from 'svelte/transition';

	export let tag: ChosenTag;
	let popupEl: HTMLDivElement;

	let labelEditable = tag.label === 'อื่นๆ';
	const id = nanoid();

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: `popupAutocomplete-${id}`,
		placement: 'bottom'
	};

	let autocompleteOptions: AutocompleteOption[] = [{ label: 'Loading...', value: '' }];

	onMount(async () => {
		const result = await fetch('/api/stats', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const resultJson = await result.json();
		autocompleteOptions = resultJson.stats
			.filter((tag: { name: string }) => !predefinedTags.includes(tag.name))
			.map((tag: { name: string }) => ({
				label: tag.name,
				value: tag.name,
				keywords: tag.name
				// meta: { healthy: false }
			}));
	});

	function onPopupSelect(event: CustomEvent<AutocompleteOption>) {
		popupEl.style.display = '';

		tag.label = event.detail.value as string;

		labelEditable = false;
	}

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

		tick().then(() => {
			popupEl.style.display = 'block';
			tag.label = '';
		});
	}

	function editLabelOnBlur() {
		// tag.label = tag.label.trim();
		// if (tag.label === '') {
		// 	tag.label = 'อื่นๆ';
		// }
	}

	function ensurePopupOnTop() {
		popupEl.style.zIndex = '10';
	}
</script>

{#key id}
	<div
		class={labelEditable
			? 'card rounded-sm variant-soft-primary relative'
			: 'card card-hover rounded-sm variant-soft-primary relative'}
		in:fly={{ y: 20 }}
	>
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
						class="input autocomplete w-auto h-8 px-1 mr-2 text-center rounded variant-ghost-secondary border-primary-300"
						type="search"
						bind:value={tag.label}
						on:blur={editLabelOnBlur}
						on:focus={ensurePopupOnTop}
						use:popup={popupSettings}
						placeholder="โปรดระบุ"
						maxlength={25}
					/>
					<div
						data-popup={`popupAutocomplete-${id}`}
						class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
						tabindex="-1"
						bind:this={popupEl}
					>
						<Autocomplete
							bind:input={tag.label}
							options={[
								...autocompleteOptions,
								...(tag.label && !predefinedTags.includes(tag.label)
									? [{ label: `${tag.label} (เพิ่ม)`, value: tag.label, keywords: tag.label }]
									: [])
							]}
							denylist={predefinedTags}
							on:selection={onPopupSelect}
							emptyState="โปรดระบุ"
						/>
					</div>
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
{/key}
