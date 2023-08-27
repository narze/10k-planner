<script lang="ts">
	import { addTag, tags } from '$lib/stores/tags';

	export let label: string;

	$: selected = $tags.find((tag) => tag.label === label);

	$: buttonClasses = ['btn', 'btn-sm', 'variant-ghost-surface', selected && 'variant-soft']
		.filter(Boolean)
		.join(' ');
</script>

<button disabled={!!selected} on:click={() => addTag(label)} class={buttonClasses}>{label}</button>
