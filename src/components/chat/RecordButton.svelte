<script>
	import { dangerToast } from '$lib/toasts';
	import { chatInput } from '$stores/chatInput';
	import Icon from '@iconify/svelte';

	let recording = false;
	let mediaRecorder;
	let audioChunks = [];

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

	// const sendToApi = async (audioBlob) => {
	// 	const formData = new FormData();
	// 	formData.append('audio', audioBlob);

	// 	await fetch('/api/transcribe', {
	// 		method: 'POST',
	// 		body: formData
	// 	})
	// 		.then((data) => {
	// 			console.log('sent to api');
	// 			console.log(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	const sendToApi = async (audioBlob) => {
		try {
			const formData = new FormData();
			formData.append('audio', audioBlob, 'audio.webm');
			const response = await fetch('/api/transcribe', {
				method: 'POST',
				body: formData
			});
			const data = await response.json();
			console.log('sent to api');
			console.log(data.data.text);
			chatInput.set(data.data.text);
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
	class={`flex justify-center h-10 p-2 transition rounded-lg bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-400 dark:text-black hover:bg-gray-600 dark:hover:bg-gray ${
		recording ? '!text-red-500' : '!text-white'
	}}`}
>
	<Icon
		icon={recording ? 'tabler:square' : 'tabler:microphone'}
		class={`${recording ? 'text-red-500' : 'text-white'} w-6 h-6`}
	/>
</button>
