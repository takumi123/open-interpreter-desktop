//svelte store called model:
import { writable } from 'svelte/store';

export const model = writable('gpt-4');
export const allModels = [
	{ value: 'gpt-4', name: 'GPT-4' },
	{ value: 'gpt-3.5-turbo', name: 'GPT-3.5-turbo' },
	{ value: 'Codellama', name: 'CodeLlama' },
	{ value: 'huggingface', name: 'Hugging Face Model' }
];
