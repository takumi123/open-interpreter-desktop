<script lang="ts">
	import { scrollToBottomAction } from 'svelte-legos';
	import Icon from '@iconify/svelte';
	import { useChat } from 'ai/svelte';
	import type { Message } from 'ai/svelte';
	import { fade } from 'svelte/transition';

	let initialMessages: Message[] = [
		{
			id: '1',
			role: 'system',
			content: `You are a conversation assistant. You will be asked questions that the user has about the current chat transcript. Answer to the best of your ability, in a modern, hip gen-z kind of tone.`
		},
		{
			id: '1',
			role: 'assistant',
			content: 'What would you like to build today?'
		}
	];
	const { input, handleSubmit, messages, isLoading } = useChat({
		api: '/api/chat',
		initialMessages
	});
</script>

<div in:fade out:fade class="flex flex-col justify-between h-full w-full min-h-[calc(100vh-9rem)]">
	<div use:scrollToBottomAction class="px-2 overflow-auto">
		<h3 class="mb-10 heading-md">Chat With Conversation</h3>
		{#each $messages as message}
			{#if message.role !== 'system'}
				<div
					class={`mb-4 p-2 rounded-2xl break-normal whitespace-pre-wrap ${
						message.role === 'user'
							? ' rounded-br-none  ml-5 bg-sky-500 dark:bg-sky-600  text-white'
							: 'rounded-bl-none mr-5 dark:bg-gray-600 dark:text-white bg-gray-200 text-black'
					}`}
				>
					{message.content}
				</div>
			{/if}
		{/each}
	</div>
	<div class="w-full px-2 py-1 bg-gray-200 rounded-md dark:bg-gray-600">
		<form on:submit={handleSubmit}>
			<div class="flex items-center w-full h-12 gap-1">
				<input
					bind:value={$input}
					class="flex-grow p-2 border-2 border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
					type="text"
					placeholder="Type a message..."
				/>
				<button type="submit" class="h-10 p-2 text-white rounded-lg bg-primary-500">
					<Icon icon="tabler:send" />
				</button>
			</div>
		</form>
	</div>
</div>
