import type { AllChats } from '$types/chat';
import { storage } from 'svelte-legos';
import { writable } from 'svelte/store';

export const allChats = storage(writable<AllChats>([]), 'allOIChats');
