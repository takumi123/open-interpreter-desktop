// Set the runtime to edge for best performance
import { PythonShell } from 'python-shell';
export const config = {
	runtime: 'edge'
};

export async function POST({ request }) {
	try {
		const { script } = await request.json();

		// Evaluate the script
		let results = [];
		results = eval(script);
		return new Response(
			JSON.stringify({
				message: 'Success',
				data: { results }
			}),
			{
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		console.error(error);
		return new Response(
			String({
				message: 'An error occurred while evaluating the script',
				error: error.message
			})
		);
	}
}
