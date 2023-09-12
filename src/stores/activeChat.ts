import type { ChatType } from '$types/chat';
import { storage } from 'svelte-legos';
import { writable } from 'svelte/store';

export const activeChat = storage(writable<ChatType>(null), 'activeOIChat');
