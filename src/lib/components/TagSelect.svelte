<script lang="ts">
	import { addTag, tags } from '$lib/stores/tags';

	export let label: string;
	export let small = false;

	$: selected = $tags.find((tag) => tag.label === label);
	$: disabled = !!selected || $tags.length >= 10;

	$: buttonClasses = [
		'btn',
		small && 'btn-sm',
		small && 'min-w-[4rem]',
		label !== 'อื่นๆ' && 'variant-ghost-surface',
		selected && 'variant-soft',
		label === 'อื่นๆ' && 'variant-ghost-primary'
	]
		.filter(Boolean)
		.join(' ');
</script>

<button {disabled} on:click={() => addTag(label)} class={buttonClasses}>{label}</button>
