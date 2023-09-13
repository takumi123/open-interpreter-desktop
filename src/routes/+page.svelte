<script lang="ts">
	import { fade } from 'svelte/transition';
	import Scribble from '$components/ui/Scribble.svelte';
	import { onMount } from 'svelte';

	console.log('main');
	let showSvg = false;
	onMount(() => {
		console.log('mounted');
		showSvg = true;
	});
</script>

<div class="relative w-screen h-screen overflow-hidden">
	<div class="flex flex-col px-10 pt-5 overflow-auto">
		<div
			class="absolute left-[24rem] scale-150 rotate-[100deg] -top-10 -z-10 dark:invert blur-sm opacity-50"
		>
			<Scribble {showSvg} />
		</div>
		<div in:fade={{ duration: 4500, delay: 800 }} class="mx-auto mt-40">
			<h1 class="text-3xl font-bold text-center">Welcome to Open Interpreter</h1>
			<p class="mt-4 text-xl text-center">Let language models run code on your computer.</p>
			<p class="mt-2 text-lg">
				An open-source, locally running implementation of OpenAI's Code Interpreter.
			</p>
		</div>
		<video
			src="https://user-images.githubusercontent.com/63927363/264166941-37152071-680d-4423-9af3-64836a6f7b60.mp4"
			controls
			autoplay
			volume="0.6"
			class="w-1/2 mx-auto mt-10 rounded-md shadow-md"
		/>
	</div>
</div>
