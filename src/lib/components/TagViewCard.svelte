<script lang="ts">
	import { THB } from '$lib';
	import type { ChosenTag } from '$lib/stores/tags';

	export let tag: ChosenTag;
</script>

<div class="card card-hover rounded-sm variant-soft-primary relative">
	<section class="p-4">
		<span class="flex justify-between items-center gap-x-2 font-bold">
			<span class="text-xl mr-2">{tag.label}</span>
			<span class="chip variant-soft-primary text-lg">{tag.value.toLocaleString()} {THB}</span
			></span
		>
	</section>
</div>
