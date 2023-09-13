<script lang="ts">
	import { chatInput } from './../../stores/chatInput.ts';
	import { scrollToBottomAction } from 'svelte-legos';
	import Icon from '@iconify/svelte';
	import { useChat } from 'ai/svelte';
	import type { Message } from 'ai/svelte';
	import { fade } from 'svelte/transition';
	import { allModels, model } from '$stores/model';
	import ModelSelection from '$components/ui/ModelSelection.svelte';
	import { activeChat } from '$stores/activeChat';
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import Recipes from '$components/ui/Recipes.svelte';
	import { allChats } from '$stores/allChats';
	import RecordButton from './RecordButton.svelte';
	import { tick } from 'svelte';
	import '../../styles/highlight/atom-one-dark.min.css';

	console.log($allChats);
	console.log($activeChat);

	let initialMessages: Message[] = [
		{
			id: '1',
			role: 'system',
			content: `You are code interpreter. Take the instructions that user gives you and generate code to run on their computer`
		}
	];
	if ($activeChat.messages.length > 0) {
		initialMessages = $activeChat.messages;
	}

	// else {
	// 	allChats.set((chats) => {
	// 		const chatIndex = chats.findIndex((chat) => chat.id === $activeChat.id);
	// 		if (chatIndex !== -1) {
	// 			chats[chatIndex].messages = initialMessages;
	// 		}
	// 		return chats;
	// 	});
	// }
	const { input, handleSubmit, messages, isLoading } = useChat({
		api: '/api/chat',
		initialMessages,
		// onResponse: () => {
		// 	hljs.highlightAll();
		// },
		onFinish: (response) => {
			console.log('response:', response);
			// allChats.update((chats) => {
			// 	const chatIndex = chats.findIndex((chat) => chat.id === $activeChat.id);
			// 	if (chatIndex !== -1) {
			// 		console.log(response);
			// 		chats[chatIndex].messages.push(response);
			// 	}
			// 	return chats;
			// });
		}
	});

	$:{
		if($chatInput && $chatInput.length > 0){
			console.log($chatInput);
			input.set($chatInput);
			chatInput.set('');
		}
	}
	$: {
		if ($messages && $messages.length > 0) {
			tick().then(() => {
				const anyNonHighligtedBlocks = document.querySelectorAll('pre code:not(.is-highlighted)');
				if (anyNonHighligtedBlocks.length > 0) {
					anyNonHighligtedBlocks.forEach((block) => {
						if(!block.classList.contains('is-highlighted')){
							hljs.highlightBlock(block);
							console.log('Highlighting:', block);
							block.classList.add('is-highlighted');
						}
				});
				}
				// const lastMessageElement = document.querySelector('pre code:not(.is-highlighted)');
				// if (lastMessageElement) {
				// 	hljs.highlightBlock(lastMessageElement);
				// 	lastMessageElement.classList.add('is-highlighted');
				// }
				
			});
		}
	}
	// $: {
	// 	if (
	// 		$messages &&
	// 		$messages.length > 0 &&
	// 		$messages !== initialMessages &&
	// 		$messages !== $activeChat.messages
	// 	) {
	// 		console.log($messages);

	// 		// allChats.update((chats) => {
	// 		// 	const chatIndex = chats.findIndex((chat) => chat.id === $activeChat.id);
	// 		// 	if (chatIndex !== -1) {
	// 		// 		chats[chatIndex].messages = $messages;
	// 		// 	}
	// 		// 	return chats;
	// 		// });
	// 		activeChat.update((chat) => {
	// 			chat.messages = $messages;
	// 			return chat;
	// 		});
	// 		console.log('messages updated');
	// 		console.log($allChats);
	// 	}
	// }
	let selected = $model ? $model : allModels[0].value;
	let selectedName = allModels.find((m) => m.value === selected).name;

// marked.setOptions({
//   highlight: function(code) {
//     return hljs.highlightAuto(code).value;
//   }
// });
</script>

<div in:fade out:fade class="flex flex-col justify-between h-full w-full min-h-[calc(100vh-5rem)]">
	<div use:scrollToBottomAction class="w-full px-2 pt-10 pb-20 overflow-auto">
		{#if $messages.length <= 1}
			<div class="flex flex-col items-center w-full gap-20 mt-2">
				<ModelSelection {selected} {selectedName} />
				<div>
					<h3 class="mb-4 text-xl font-bold">Recipes</h3>
					<Recipes />
				</div>
			</div>
		{/if}
		<div class="flex flex-col w-full gap-5 px-40">
			{#each $messages as message}
				{#if message.role !== 'system'}
					<div
						class={`mb-4 p-2 !max-w-full rounded-2xl break-normal whitespace-pre-line shadow-md fade-effect-fast prose ${
							message.role === 'user'
								? ' rounded-br-none px-5 py-5   ml-16 bg-gradient-to-b from-gray-600 to-gray-900  !text-white dark:text-gray-50 dark:from-gray-500 dark:to-gray-700 user-message'
								: 'px-5 py-5  mr-10 bg-gradient-to-b from-gray-100 to-gray-300  text-gray-800 dark:text-gray-50 dark:from-gray-600 dark:to-gray-800 rounded-bl-none'
						}`}
					>{@html marked(message.content.trim())}</div>
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex justify-center w-full pb-2">
		<div
			class="w-4/5 px-4 py-2 rounded-lg shadow-lg bg-gradient-to-b to-gray-400 from-gray-200 dark:from-gray-600 dark:to-black dark:shadow-gray-600 dark:shadow-md"
		>
			<form on:submit={handleSubmit}>
				<div class="flex items-center w-full h-12 gap-3">
					<RecordButton />
					<input
						bind:value={$input}
						class="flex-grow p-2 border-2 border-gray-300 rounded-lg shadow-inner dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 focus:border-gray-800 focus:ring-0 focus:ring-gray-800"
						type="text"
						placeholder="Type a message..."
					/>
					<button
						type="submit"
						on:click={() => {
							// allChats.update((chats) => {
							// 	const chatIndex = chats.findIndex((chat) => chat.id === $activeChat.id);
							// 	if (chatIndex !== -1) {
							// 		chats[chatIndex].messages.push({
							// 			id: v4(),
							// 			role: 'user',
							// 			content: input
							// 		});
							// 	}
							// 	return chats;
							// });
						}}
						class="flex justify-center w-20 h-10 p-2 text-white transition rounded-lg bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-400 dark:text-black hover:bg-gray-600 dark:hover:bg-gray"
					>
						<Icon icon="tabler:send" class="w-6 h-6" />
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
</style>
