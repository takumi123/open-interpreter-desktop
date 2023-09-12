<script lang="ts">
	import { activeChat } from '$stores/activeChat';
</script>

<div class="flex items-center justify-between w-full h-8 px-5 shadow-md dark:bg-gray-700">
	<div />
	{$activeChat.title}
	<div class="flex items-center gap-2">a</div>
</div>
