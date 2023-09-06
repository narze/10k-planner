<script lang="ts">
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement;

	onMount(() => {
		audio = new Audio('/sound/10k.mp3');
		audio.volume = 0.5;
		audio.preload = 'auto';
	});

	function playSound() {
		if (audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2) {
			audio.currentTime = 0;
		} else {
			audio.play();
		}
	}
</script>

<button class="btn py-0.5 px-1 rounded variant-soft-surface font-medium" on:click={playSound}
	>10,000 ฿</button
>
