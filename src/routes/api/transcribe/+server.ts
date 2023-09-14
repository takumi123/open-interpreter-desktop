import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import busboy from 'busboy';

// Set the runtime to edge for best performance
export const config = {
	runtime: 'edge'
};

export async function POST({ request }) {
	try {
		let text = '';
		const body = await request.formData();
		const file = await body.get('audio');
		const openai = new OpenAI({
			apiKey: OPENAI_API_KEY
		});
		const transcription = await openai.audio.transcriptions.create({
			file: file,
			model: 'whisper-1'
		});
		console.log(transcription.text);

		text = transcription.text;

		return new Response(
			JSON.stringify({
				message: 'Success',
				data: { text }
			}),
			{
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		console.error(error);
		return new Response(
			String({
				message: 'An error occurred while transcribing the audio',
				error: error.message
			})
		);
	}
}
