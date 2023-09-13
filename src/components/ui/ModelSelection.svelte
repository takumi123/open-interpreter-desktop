<script>
	export let selected;
	export let selectedName;
	import { Dropdown, Search, Select } from 'flowbite-svelte';
	import { activeChat } from '$stores/activeChat';
	import { allModels, model } from '$stores/model';
	import Icon from '@iconify/svelte';

	let hfModels = [];
	const fetchModels = async (searchValue) => {
		//remove spaces and things from searchValue:
		searchValue = searchValue.replace(/\s/g, '');
		//fetch models from huggingface:
		const response = await fetch(
			`https://huggingface.co/api/models?search=${searchValue}&limit=10`
		);
		const data = await response.json();
		hfModels = data;
	};
	let dropdownOpen = false;

	const handleModelSelection = () => {
		console.log('selected model:', selected);
		// selectedName = allModels.find((m) => m.value === selected).name;
		selectedName = selected;
		activeChat.update((chat) => {
			chat.options.model = selected;
			return chat;
		});
	};
</script>

<button
	class="px-3 flex gap-1 items-center py-0.5 text-white bg-gray-600 shadow-md rounded-md cursor-pointer model-selector"
>
	{selectedName}
	<Icon icon="fa-solid:chevron-down" class="w-4 h-4 ml-2" />
</button>
<Dropdown
	bind:open={dropdownOpen}
	triggeredBy=".model-selector"
	class="px-3 py-3 overflow-y-auto text-sm h-fit"
>
	<div class="flex flex-col gap-1">
		{#each allModels as model}
			<button
				class={`w-full px-3 py-1 text-left rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
					selected === model.value ? 'bg-gray-200 dark:bg-gray-700' : ''
				}`}
				on:click={() => {
					selected = model.value;
					handleModelSelection();
					if (model.value !== 'huggingface') {
						dropdownOpen = false;
					}
				}}>{model.name}</button
			>
		{/each}
	</div>
	{#if selected === 'huggingface'}
		<div class="p-3">
			<p class="mb-1 text-sm">Search for Hugging Face Model</p>
			<Search
				size="sm"
				on:input={(e) => {
					//@ts-ignore
					fetchModels(e.target.value);
				}}
			/>
			<div class="flex flex-col items-start gap-1">
				{#if hfModels && hfModels.length > 0}
					{#each hfModels as model (model.modelId)}
						<button
							on:click={() => {
								selected = model.modelId;
								handleModelSelection();
								dropdownOpen = false;
							}}
							class="px-1 py-1 text-sm hover:bg-gray-200 dark:bg-gray-600transition"
						>
							{model.modelId}
						</button>
					{/each}
					<a
						href="https://huggingface.co/models"
						target="_blank"
						class="text-sm text-blue-500 hover:underline">Explore all models</a
					>
				{/if}
			</div>
		</div>
	{/if}
</Dropdown>
