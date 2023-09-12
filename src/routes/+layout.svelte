<script lang="ts">
	import '../styles/app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { browser } from '$app/environment';
	import { Modals, closeModal } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Sidebar from '$components/navigation/Sidebar.svelte';
	let desktop: string;
	if (window.electron && browser) {
		window.electron.receive('from-main', (data: any) => {
			desktop = `Received Message "${data}" from Electron`;
			console.log(desktop);
		});
	}
</script>

<svelte:head>
	<script>
		//this prevents a flash of light mode when the page loads (FOUC)
		(() => {
			const theme = localStorage.getItem('theme') || 'system';
			let darkBoolean = false;

			if (theme === 'dark') {
				darkBoolean = true;
			} else if (theme === 'system') {
				darkBoolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}

			darkBoolean
				? document.documentElement.classList.add('dark')
				: document.documentElement.classList.remove('dark');
		})();
	</script>
</svelte:head>

<div class="dragbar" />
<div class="w-full h-full">
	<main class="flex w-full h-full">
		<Sidebar />
		<slot />
	</main>
</div>
<SvelteToast />
<Modals>
	<div
		slot="backdrop"
		class="backdrop"
		on:click={closeModal}
		transition:fade
		on:keydown|preventDefault={(event) => {
			if (event.key === 'Escape') {
				closeModal();
			}
		}}
	/>
</Modals>

<style>
	.dragbar {
		-webkit-app-region: drag;
		position: absolute;
		z-index: 10000;
		height: 28px;
		width: 100%;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 400;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
