<script lang="ts">
	import { shortcut } from '$lib/shortcut';
	import { fade } from 'svelte/transition';
	import { closeModal } from 'svelte-modals';
	import Icon from '@iconify/svelte';

	export let isOpen = true;
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
			class="min-w-[240px] w-[60vw] h-[95vh] overflow-auto rounded-[6px] py-6 px-12 bg-white flex flex-col justify-between pointer-events-auto relative dark:bg-gray-700"
		>
			<button
				class="absolute p-2 transition rounded-full cursor-pointer top-2 right-2 hover:bg-gray-100 dark:hover:bg-gray-700"
				on:click|preventDefault={() => closeModal()}
			>
				<Icon icon="fa-solid:times" class="w-6 h-6 text-gray-500 transition hover:text-gray-700" />
			</button>

			<h1 class="mb-4 text-4xl font-bold">Help</h1>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Installation</h2>
				<p>Use pip to install Open Interpreter:</p>
				<code class="p-2 mt-2 bg-gray-200 rounded dark:bg-gray-900"
					>pip install open-interpreter</code
				>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Getting Started</h2>
				<p>
					After installing, simply run <code class="p-2 mt-2 bg-gray-200 rounded dark:bg-gray-900"
						>interpreter</code
					> from your terminal.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Features</h2>
				<ul class="list-disc list-inside">
					<li>Run code in Python, JavaScript, Shell, and more.</li>
					<li>Chat via a natural-language interface.</li>
					<li>Edit multimedia files, control browsers, analyze data, etc.</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Safety</h2>
				<p>
					⚠️ Code will ask for user confirmation before running. Use caution and consider running in
					isolated environments.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Advanced Configurations</h2>
				<p>
					You can modify advanced configurations by setting flags and environment variables.
					Detailed documentation is available on the <a
						href="https://github.com/your-repo-link"
						target="_blank">GitHub repository</a
					>.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Debug Mode</h2>
				<p>To enable verbose logging, activate the debug mode:</p>
				<code class="p-2 mt-2 bg-gray-200 rounded dark:bg-gray-900">interpreter --debug</code>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">Azure Support</h2>
				<p>If you're running on Azure, use the following flag:</p>
				<code class="p-2 mt-4 bg-gray-200 rounded dark:bg-gray-900">interpreter --use-azure</code>
			</section>

			<section class="mb-8">
				<h2 class="mb-2 text-xl font-semibold">How it Works</h2>
				<p>
					Open Interpreter employs a function-calling language model equipped with an exec()
					function. Messages, code, and system outputs are streamed to the terminal in Markdown
					format.
				</p>
			</section>
		</div>
	</div>
{/if}
