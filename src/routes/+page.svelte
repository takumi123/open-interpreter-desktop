<script lang="ts">
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
	</div>
</div>
