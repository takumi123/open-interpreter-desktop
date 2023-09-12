<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="page-container">
	<h1 class="text-3xl">An error occurred!</h1>
	<h1 class="texl-lg">{$page.status} {$page.error?.message}</h1>
	<p class="my-4">
		Something went wrong... Please reach out on the <a
			href="mailto:tyfierodev@gmail.com  "
			class="font-bold text-purple-500 underline">Discord</a
		> for help.
	</p>
	<a href="/" class="btn btn-primary">Go Back Home</a>
</div>
