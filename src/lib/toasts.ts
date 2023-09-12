import { toast } from '@zerodevx/svelte-toast';

export const dangerToast = (message: string) => {
	const dark = document.documentElement.classList.contains('dark');
	toast.push(
		`<div class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="-2 -3 24 24"><path fill="currentColor" d="m12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.213 3.213 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096zm-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.12 1.12 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"/></svg>${message}</div>`,
		{
			theme: {
				'--toastBackground': dark ? '#731e1e7a' : '#fab5b57a',
				'--toastColor': dark ? '#ffdcdc' : '#5a1515',
				'--toastProgressBackground': '#fe0000',
				'--toastBorderRadius': '0.8rem',
				'--toastMsgPadding': '0.4rem 1.0rem'
			}
		}
	);
};
export const successToast = (message: string) => {
	const dark = document.documentElement.classList.contains('dark');
	toast.push(
		`<div class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1024 1024"><path fill="#00e275" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"/></svg>${message}</div>`,
		{
			theme: {
				'--toastBackground': dark ? '#1e73337a' : '#e6fce9ae',
				'--toastColor': dark ? '#dbfcdd' : '#155a1f',
				'--toastProgressBackground': '#00e275',
				'--toastBorderRadius': '0.8rem',
				'--toastMsgPadding': '0.4rem 1.0rem'
			}
		}
	);
};
