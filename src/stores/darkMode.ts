import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { derived } from 'svelte/store';

const darkMode = writable('system'); // could be 'dark', 'light', or 'system'
let current_theme = 'system';

// Initialize from localStorage or system preference
if (browser) {
	let stored_theme = localStorage.getItem('theme') || 'system';
	darkMode.set(stored_theme);

	// If 'system', set according to matchMedia
	if (stored_theme === 'system') {
		document.documentElement.classList.toggle(
			'dark',
			window.matchMedia('(prefers-color-scheme: dark)').matches
		);
	}

	// Listen for system preference changes
	const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
	mediaQueryList.addEventListener('change', (e) => {
		if (current_theme === 'system') {
			document.documentElement.classList.toggle('dark', e.matches);
		}
	});
	darkMode.subscribe((value) => {
		current_theme = value;
		localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else if (value === 'light') {
			document.documentElement.classList.remove('dark');
		} else if (value === 'system') {
			document.documentElement.classList.toggle(
				'dark',
				window.matchMedia('(prefers-color-scheme: dark)').matches
			);
		}
	});
}

const isDarkMode = derived(darkMode, ($darkMode) => {
	if ($darkMode === 'system') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	} else {
		return $darkMode === 'dark';
	}
});

export { isDarkMode };

export default darkMode;
