/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: 'rgb(var(--primary-50) / <alpha-value>)',
					100: 'rgb(var(--primary-100) / <alpha-value>)',
					200: 'rgb(var(--primary-200) / <alpha-value>)',
					300: 'rgb(var(--primary-300) / <alpha-value>)',
					400: 'rgb(var(--primary-400) / <alpha-value>)',
					500: 'rgb(var(--primary-500) / <alpha-value>)',
					600: 'rgb(var(--primary-600) / <alpha-value>)',
					700: 'rgb(var(--primary-700) / <alpha-value>)',
					800: 'rgb(var(--primary-800) / <alpha-value>)',
					900: 'rgb(var(--primary-900) / <alpha-value>)'
				},
				secondary: {
					50: 'rgb(var(--secondary-50) / <alpha-value>)',
					100: 'rgb(var(--secondary-100) / <alpha-value>)',
					200: 'rgb(var(--secondary-200) / <alpha-value>)',
					300: 'rgb(var(--secondary-300) / <alpha-value>)',
					400: 'rgb(var(--secondary-400) / <alpha-value>)',
					500: 'rgb(var(--secondary-500) / <alpha-value>)',
					600: 'rgb(var(--secondary-600) / <alpha-value>)',
					700: 'rgb(var(--secondary-700) / <alpha-value>)',
					800: 'rgb(var(--secondary-800) / <alpha-value>)',
					900: 'rgb(var(--secondary-900) / <alpha-value>)'
				},
				accent: {
					50: 'rgb(var(--accent-50) / <alpha-value>)',
					100: 'rgb(var(--accent-100) / <alpha-value>)',
					200: 'rgb(var(--accent-200) / <alpha-value>)',
					300: 'rgb(var(--accent-300) / <alpha-value>)',
					400: 'rgb(var(--accent-400) / <alpha-value>)',
					500: 'rgb(var(--accent-500) / <alpha-value>)',
					600: 'rgb(var(--accent-600) / <alpha-value>)',
					700: 'rgb(var(--accent-700) / <alpha-value>)',
					800: 'rgb(var(--accent-800) / <alpha-value>)',
					900: 'rgb(var(--accent-900) / <alpha-value>)'
				}
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
