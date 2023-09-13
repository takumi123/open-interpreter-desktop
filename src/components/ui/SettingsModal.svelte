<script lang="ts">
	import { shortcut } from '$lib/shortcut';
	import { fade } from 'svelte/transition';
	import { closeModal } from 'svelte-modals';
	import Icon from '@iconify/svelte';
	import darkMode from '$stores/darkMode';
	import { allModels, model } from '$stores/model';
	import { Label, Select, Input, Checkbox } from 'flowbite-svelte';
	import ModelSelection from './ModelSelection.svelte';

	export let isOpen = true;

	let darkOptions = [
		{ value: 'system', name: 'System' },
		{ value: 'dark', name: 'Dark' },
		{ value: 'light', name: 'Light' }
	];
	let selectedDark = $darkMode ? $darkMode : darkOptions[0].value;

	function handleSwitchDarkMode(input: any) {
		const value = input.target.value;
		darkMode.set(value);
	}
	let selected = $model ? $model : allModels[0].value;
	let selectedName = allModels.find((m) => m.value === selected).name;
</script>

{#if isOpen}
	<div
		role="dialog"
		class="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none transition-fade"
		style="pointer-events: none;"
		transition:fade|global
		use:shortcut={{
			code: 'Escape',
			callback: () => closeModal()
		}}
	>
		<div
			class="min-w-[240px] h-fit max-h-[95vh] w-[40rem] overflow-auto rounded-[6px] py-6 px-12 bg-white dark:bg-gray-700 flex flex-col justify-between pointer-events-auto relative"
		>
			<button
				class="absolute p-2 transition rounded-full cursor-pointer top-2 right-2 hover:bg-gray-100 dark:hover:bg-gray-700"
				on:click|preventDefault={() => closeModal()}
			>
				<Icon icon="fa-solid:times" class="w-6 h-6 text-gray-500 transition hover:text-gray-700" />
			</button>
			<div class="container px-4 mx-auto">
				<h1 class="mb-8 text-4xl font-bold">Settings</h1>

				<section class="mb-8">
					<h2 class="mb-2 text-xl font-semibold">General</h2>

					<div class="flex flex-col">
						<div class="flex flex-col w-1/3 mb-5">
							<label for="dark" class="text-gray-700 dark:text-gray-200">Appearance</label>
							<Select
								name="Dark selector"
								id="dark"
								items={darkOptions}
								bind:value={selectedDark}
								on:change={(value) => {
									handleSwitchDarkMode(value);
								}}
							/>
						</div>
						<Label class="mb-5">
							Default Model:
							<ModelSelection {selected} {selectedName} />
						</Label>

						<Checkbox class="mb-2">Auto-Run Commands</Checkbox>
						<Checkbox>Enable Debug Mode</Checkbox>
					</div>
				</section>

				<section class="mb-8">
					<h2 class="mb-2 text-xl font-semibold">Advanced</h2>
					<div class="flex flex-col">
						<Label for="tokens" class="block mb-2">Max Tokens</Label>
						<Input id="tokens" size="lg" placeholder="500" type="number" />
					</div>
				</section>

				<section class="mb-8">
					<h2 class="mb-2 text-xl font-semibold">Environment</h2>
					<div class="flex flex-col gap-4">
						<Checkbox>Use Azure Deployment</Checkbox>
					</div>
				</section>

				<section class="mb-8">
					<h2 class="mb-2 text-xl font-semibold">Safety</h2>
					<div class="flex flex-col">
						<Checkbox checked>Require Confirmation for Code Execution</Checkbox>
					</div>
				</section>
			</div>
		</div>
	</div>
{/if}
