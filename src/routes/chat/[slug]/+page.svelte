<script lang="ts">
	import ChatBar from '$components/chat/ChatBar.svelte';
	import ChatWindow from '$components/chat/ChatWindow.svelte';
	import { activeChat } from '$stores/activeChat';
	import { onMount } from 'svelte';
	export let data;
	onMount(() => {
		//set activeChat to the chat passed in by +page.ts:
		activeChat.set(data.props.data);
	});
</script>

<div class="relative flex w-full h-screen fade-effect-quick">
	<!-- <ChatBar /> -->
	<ChatWindow />
</div>
