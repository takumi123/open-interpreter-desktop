import { get } from 'svelte/store';
import { error, redirect } from '@sveltejs/kit';
import { allChats } from '$stores/allChats.js';

export const load = ({ params }) => {
	const { slug } = params;

	const chats = get(allChats);
	// Find the chat with the matching slug
	const thisChat = chats.find((chat) => chat.id === slug);

	if (!thisChat) {
		throw error(404);
	}

	return {
		props: {
			data: thisChat
		}
	};
};
