<script lang="ts">
	import { shortcut } from './../../lib/shortcut.ts';
	import { v4 } from 'uuid';
	import { model } from '$stores/model';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
	import {
		Dropdown,
		DropdownItem,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { openModal } from 'svelte-modals';
	import HelpModal from '$components/ui/HelpModal.svelte';
	import SettingsModal from '$components/ui/SettingsModal.svelte';
	import type { ChatType } from '$types/chat';
	import { activeChat } from '$stores/activeChat';
	import { allChats } from '$stores/allChats';

	let editingChatId = null;

	const renameChat = (id) => {
		editingChatId = id;
	};

	const saveChatTitle = (id, newTitle) => {
		allChats.update((chats) => {
			const chat = chats.find((chat) => chat.id === id);
			if (chat) {
				chat.title = newTitle;
			}
			return chats;
		});
		editingChatId = null; // reset editing state
	};
	const deleteChat = async (id) => {
		console.log('deleting:', id);
		const chat = $allChats.find((chat) => chat.id === id);
		if (!chat) return;
		const index = $allChats.indexOf(chat);
		allChats.update((chats) => {
			chats.splice(index, 1);
			return chats;
		});
		//navigate to last chat:
		let lastChat = $allChats[$allChats.length - 1];
		window.location.href = `/chat/${lastChat.id}`;
	};

	const handleNewChat = () => {
		const newChat: ChatType = {
			id: v4(),
			title: 'New Chat',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			messages: [],
			options: {
				isAzure: false,
				model: $model,
				debugMode: false,
				maxTokens: null,
				contextWindow: null
			}
		};
		allChats.update((chats) => [...chats, newChat]);
		activeChat.set(newChat);
		window.location.href = `/chat/${newChat.id}`;
	};
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substr(-2)} ${
			date.getHours() % 12 || 12
		}:${date.getMinutes().toString().padStart(2, '0')}${date.getHours() >= 12 ? 'PM' : 'AM'}`;
	};
</script>

<Sidebar
	{activeUrl}
	class="block h-screen min-h-screen px-5 shadow-xl w-52 dark:bg-gray-800 dark:shadow-gray-400/60"
>
	<SidebarWrapper
		divClass={`overflow-y-auto rounded  flex flex-col justify-between h-full w-full pb-4 `}
	>
		<div>
			<div class="w-full h-8" />
			<a href="/" class="flex items-center gap-1 mb-4 transition cursor-pointer hover:scale-[102%]">
				<p class="text-4xl text-black dark:text-white">●</p>
				<h1 class="text-lg font-bold text-gray-500 dark:text-gray-100 bubble-font">
					Open Interpreter
				</h1>
			</a>
			<SidebarGroup>
				<SidebarItem
					nonActiveClass="flex items-center p-2 text-base font-normal group text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 bg-gray-100/50 
					dark:bg-gray-700/30 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition hover:!text-gray-700 dark:hover:!text-gray-200 !text-gray-500"
					label="New Chat"
					on:click={handleNewChat}
				>
					<svelte:fragment slot="icon">
						<Icon
							icon="tabler:plus"
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-900 dark:group-hover:text-gray-200"
						/>
					</svelte:fragment>
				</SidebarItem>
				{#if $allChats && $allChats.length > 0}
					{#each $allChats as chat}
						<a
							data-sveltekit-reload
							class={`flex items-center justify-between w-full px-1 py-2 transition rounded-md group ${
								activeUrl === `/chat/${chat.id}`
									? 'bg-gray-300/40  dark:bg-gray-600/50'
									: 'hover:bg-gray-100 dark:hover:bg-gray-700 '
							}`}
							href={editingChatId === chat.id ? undefined : `/chat/${chat.id}`}
						>
							<div class="flex items-center gap-2">
								<Icon
									icon="ci:chat-conversation"
									class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
								/>
								<div class="flex flex-col items-start">
									{#if editingChatId === chat.id}
										<div class="flex items-center gap-1">
											<input
												use:shortcut={{ code: 'Escape', callback: () => (editingChatId = null) }}
												use:shortcut={{
													code: 'Enter',
													callback: () => saveChatTitle(chat.id, chat.title)
												}}
												bind:value={chat.title}
												on:blur={() => saveChatTitle(chat.id, chat.title)}
												class="border border-gray-300 rounded-md w-36 focus:ring-1 dark:bg-gray-700 focus:ring-black focus:border-black dark:focus:border-white dark:border-gray-700"
												autofocus
											/>
											<button
												on:click={() => saveChatTitle(chat.id, chat.title)}
												class="p-1 transition rounded-md hover:bg-white dark:hover:bg-gray-700"
											>
												<Icon icon="tabler:check" class="text-green-500" />
											</button>
										</div>
									{:else}
										<p class="text-sm font-semibold truncate">
											{chat.title}
										</p>
										<p class="text-xs font-light">{formatDate(chat.updatedAt)}</p>
									{/if}
								</div>
							</div>
							<button
								class={`dots-menu-sidebar-${
									chat.id
								} z-10 py-1 transition rounded-md opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-black ${
									editingChatId ? '!hidden' : ''
								}}`}
								on:click|stopPropagation|preventDefault={() => {
									// console.log('click');
								}}
							>
								<Icon
									icon="fe:elipsis-v"
									class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
								/>
								<Dropdown
									triggeredBy={`.dots-menu-sidebar-${chat.id}`}
									position="left-end"
									{activeUrl}
									class="z-10 text-gray-700 bg-white border-gray-100 divide-y divide-gray-100 rounded shadow-md outline-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700 dark:divide-gray-600"
								>
									<DropdownItem on:click={() => renameChat(chat.id)}>
										<div class="flex items-center w-full gap-3">
											<Icon
												icon="tabler:edit"
												class="w-4 h-4 text-gray-700 transition duration-75 dark:text-white "
											/>
											<span class="text-gray-700 dark:text-white">Rename</span>
										</div>
									</DropdownItem>
									<DropdownItem
										on:click={async () => {
											await deleteChat(chat.id);
										}}
									>
										<div class="flex items-center w-full gap-3">
											<Icon
												icon="tabler:trash"
												class="w-4 h-4 transition duration-75 text-rose-500 "
											/>
											<span class="text-rose-500 dark:text-rose-700">Delete</span>
										</div></DropdownItem
									>
								</Dropdown>
							</button>
						</a>
					{/each}
				{:else}
					<p class="text-sm opacity-60">No chats yet</p>
				{/if}
			</SidebarGroup>
		</div>
		<div>
			<SidebarGroup border>
				<SidebarItem
					label="Help"
					on:click={() => {
						openModal(HelpModal);
					}}
				>
					<svelte:fragment slot="icon">
						<Icon
							icon="tabler:help"
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem
					label="Settings"
					on:click={() => {
						openModal(SettingsModal);
					}}
				>
					<svelte:fragment slot="icon">
						<Icon
							icon="tabler:settings"
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
			<div class="flex items-center justify-between px-10 mt-5">
				<a
					href="https://github.com/KillianLucas/open-interpreter/"
					target="_blank"
					class="transition hover:scale-110"
				>
					<Icon
						icon="fa:github"
						class="w-6 h-6 text-black transition duration-75 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"
					/>
				</a>
				<a href="https://openinterpreter.com/" target="_blank" class="transition hover:scale-110">
					<Icon
						icon="mdi:web"
						class="w-6 h-6 text-black transition duration-75 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"
					/>
				</a>
				<a href="https://discord.gg/6p3fD6rBVm" target="_blank" class="transition hover:scale-110">
					<Icon
						icon="ic:baseline-discord"
						class="text-black transition duration-75 w-7 h-7 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"
					/>
				</a>
			</div>
		</div>
	</SidebarWrapper>
</Sidebar>
