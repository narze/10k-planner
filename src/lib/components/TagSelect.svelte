<script lang="ts">
	import { addTag, tags } from '$lib/stores/tags';

	export let label: string;
	export let small = false;

	$: selected = $tags.find((tag) => tag.label === label);

	$: buttonClasses = [
		'btn',
		small && 'btn-sm',
		small && 'min-w-[4rem]',
		'variant-ghost-surface',
		selected && 'variant-soft'
	]
		.filter(Boolean)
		.join(' ');
</script>

<button disabled={!!selected} on:click={() => addTag(label)} class={buttonClasses}>{label}</button>
