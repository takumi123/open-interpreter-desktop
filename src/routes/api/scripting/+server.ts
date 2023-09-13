// Set the runtime to edge for best performance
export const config = {
	runtime: 'edge'
};

export async function POST({ request }) {
	try {
		const { script } = await request.json();

		let result = '';
		// Evaluate the script
		result = eval(script);

		return new Response(
			JSON.stringify({
				message: 'Success',
				data: { result }
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
