<script>
	import { scriptingData } from '$stores/scripting';
	let scriptText = '';

	async function executeScript() {
		// You can either send this to the backend via API or through IPC to electron
		const result = await fetch('/api/scripting', {
			method: 'POST',
			body: JSON.stringify({ script: scriptText })
		}).then((res) => res.json());

		if (result.error) {
			scriptingData.set({ error: result.error });
			return;
		}
		console.log(result);
		console.log(result.data);
		scriptingData.set({ result: result.result });
	}
	async function executeScriptIPC() {
		const result = await window.electron.executeScript(scriptText);

		if (result.error) {
			scriptingData.set({ error: result.error });
			return;
		}

		scriptingData.set({ result: result.result });
	}

	async function executePythonScript() {
		console.log('executing python script');

		const result = await window.electron.executePythonScript('print("hello world")');

		if (result.error) {
			console.error('Error:', result.error);
			return;
		}

		console.log('Python Output:', result.result);
	}

	async function runCommand() {
		try {
			console.log('running command frontend');
			const result = await window.electron.run_command(scriptText);
			console.log(result);
			scriptingData.set({ result });
		} catch (error) {
			console.error(error);
			scriptingData.set({ error: error.message });
		}
	}
</script>

<textarea bind:value={scriptText} />
<button class="btn-primary" on:click={runCommand}>Execute</button>
<p>{$scriptingData.result}</p>
