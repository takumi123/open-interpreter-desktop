<script>
	import { dangerToast } from '$lib/toasts';
	import { chatInput } from '$stores/chatInput';
	import Icon from '@iconify/svelte';

	let recording = false;
	let mediaRecorder;
	let audioChunks = [];
	let loading = false;

	if (typeof MediaRecorder === 'undefined') {
		dangerToast("Your browser doesn't support audio recording. Some features may not work.");
	}
	const startRecording = async () => {
		console.log('recording!');
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = (event) => {
			audioChunks.push(event.data);
			console.log(event.data);
		};

		mediaRecorder.onstop = async () => {
			const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
			audioChunks = [];
			await sendToApi(audioBlob);
		};

		mediaRecorder.start();
	};

	const stopRecording = () => {
		mediaRecorder.stop();
		console.log('stopped recording');
	};

	const sendToApi = async (audioBlob) => {
		try {
			loading = true;
			const formData = new FormData();
			formData.append('audio', audioBlob, 'audio.webm');
			const response = await fetch('/api/transcribe', {
				method: 'POST',
				body: formData
			});
			const data = await response.json();
			console.log('sent to api');
			chatInput.set(data.data.text);
			loading = false;
		} catch (err) {
			console.log(err);
		}
	};

	const record = () => {
		if (typeof MediaRecorder === 'undefined') {
			dangerToast("Your browser doesn't support audio recording");
			return;
		}
		recording = !recording;
		if (recording) {
			startRecording();
		} else {
			stopRecording();
		}
	};
</script>

<button
	on:click={() => {
		record();
	}}
	type="button"
	class={`flex justify-center h-10 p-2 transition rounded-full bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-400 dark:text-black hover:bg-gray-600 dark:hover:bg-gray ${
		recording ? '!text-red-500' : '!text-white'
	}}`}
>
	<Icon
		icon={recording ? 'tabler:square' : loading ? 'mingcute:loading-fill' : 'tabler:microphone'}
		class={`${recording ? 'text-red-500' : 'text-white dark:text-black'} w-6 h-6 ${
			loading ? 'animate-spin' : ''
		}`}
	/>
</button>
