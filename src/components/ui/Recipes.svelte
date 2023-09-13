<script>
	import { chatInput } from '$stores/chatInput';
	import Icon from '@iconify/svelte';
	let search = '';
	let selectedTag = '';
	let selectedRecipe;

	const recipes = [
		{
			title: 'Organize your desktop folders',
			tags: ['Productivity'],
			description:
				'Let Open Interpreter declutter and organize your desktop by categorizing files into folders.',
			prompt:
				'Please organize my desktop folders in a way that makes logical sense. Try to group items together that are related, with the primary objective being a clean organized desktop.'
		},
		{
			title: 'Automate Data Cleaning in Python',
			tags: ['Data Science'],
			description:
				'Use Open Interpreter to automate the process of cleaning and preparing your dataset for analysis.',
			prompt:
				'Clean my dataset by removing null values and outliers, and normalize the numerical fields.'
		},
		{
			title: 'Web Scraping for Research',
			tags: ['Web Scraping', 'Research'],
			description:
				'Control a Chrome browser via Open Interpreter to scrape valuable data from the web for research purposes.',
			prompt:
				'Scrape articles related to climate change from specified websites and save them as PDFs.'
		},
		{
			title: 'Batch Resize Images',
			tags: ['Media Editing'],
			description: 'Automatically resize multiple images to your desired dimensions.',
			prompt:
				'For every image path I provide, please resize these images to 50% of their original size, and output the resulting images in a new folder called "Resized Images" on my Desktop.'
		},
		{
			title: 'Automate Social Media Posting',
			tags: ['Social Media', 'Marketing'],
			description: 'Schedule and post content to multiple social media platforms.',
			prompt:
				'Post the provided content to my Twitter, LinkedIn, and Instagram accounts at 3 PM EST.'
		},
		{
			title: 'Create PDF Reports',
			tags: ['Reporting'],
			description: 'Compile data and generate PDF reports automatically.',
			prompt:
				'Generate a monthly sales report in PDF format, including charts and summary statistics.'
		},
		{
			title: 'Transcribe Audio Files',
			tags: ['Transcription'],
			description: 'Automatically transcribe audio files to text.',
			prompt:
				'Transcribe the audio files in the "Interviews" folder and save the transcriptions as text files.'
		},
		{
			title: 'Automate Email Responses',
			tags: ['Email Automation'],
			description: 'Send out automated email responses based on certain triggers or events.',
			prompt:
				'Send an automated thank-you email to anyone who fills out the contact form on my website.'
		},
		{
			title: 'Plot Financial Data',
			tags: ['Data Visualization', 'Finance'],
			description: 'Visualize stock market trends with automatically generated plots.',
			prompt:
				'Plot the historical stock prices of AAPL and MSFT over the last 6 months, and compare their performance.'
		},
		{
			title: 'Database Backup',
			tags: ['Database', 'Backup'],
			description: 'Automatically back up your database at scheduled intervals.',
			prompt:
				'Back up my MySQL database every Sunday night at 11 PM and store the backups in a secure location.'
		},
		{
			title: 'Automate Code Testing',
			tags: ['Testing', 'Software Development'],
			description: 'Run a series of automated tests on your codebase.',
			prompt: 'Run all unit tests for my application and provide a detailed report of the results.'
		},
		{
			title: 'Extract Text from Images',
			tags: ['OCR'],
			description: 'Use Optical Character Recognition to extract text from images or PDFs.',
			prompt:
				'Extract text from all image files in the "Scanned Documents" folder and save them as individual text files.'
		},
		{
			title: 'Setup Virtual Environments',
			tags: ['Software Development'],
			description:
				'Automatically setup and manage Python virtual environments for different projects.',
			prompt:
				'Create a new Python virtual environment for my Django project and install the required packages.'
		},
		{
			title: 'Automate System Updates',
			tags: ['System Maintenance'],
			description: 'Automatically update software packages or system settings.',
			prompt:
				'Update all installed software packages on my computer and restart the system afterwards.'
		},
		{
			title: 'Monitor Website Uptime',
			tags: ['Website Monitoring'],
			description:
				'Regularly check the availability of websites and send alerts in case of downtime.',
			prompt: 'Monitor the uptime of my e-commerce website and notify me via email if it goes down.'
		}
	];

	// const tags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)));
	const tags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))).sort();

	$: filteredRecipes = recipes.filter(
		(recipe) =>
			recipe.title.toLowerCase().includes(search.toLowerCase()) &&
			(selectedTag ? recipe.tags.includes(selectedTag) : true)
	);
</script>

<div class="flex flex-col w-[66rem] !overflow-y">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-wrap mb-1">
			<button
				class={`px-1 py-0.5 m-1 text-xs mr-2 transition hover:bg-gray-300 bg-gray-200 rounded ${
					selectedTag === '' ? 'bg-gray-300/80  ring-2 ring-gray-600/80' : 'bg-gray-200/50'
				}`}
				on:click|preventDefault={() => (selectedTag = '')}
				class:selected={selectedTag === ''}
			>
				All
			</button>
			{#each tags as tag}
				{#if !isNaN(Number(tag.slice(0, 1)))}
					<button
						class={`flex items-center px-1 py-0 m-1 text-xs transition rounded bg-gray-200/50 text-gray-700 dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-300 ${
							selectedTag === tag ? 'bg-gray-300/80  ring-2 ring-gray-600/80' : 'bg-gray-200/50'
						}`}
						on:click|preventDefault={() => (selectedTag = tag)}
						class:selected={selectedTag === tag}
					>
						<Icon
							icon={`${tag.slice(0, 1) === '1' ? 'fluent:person-16-filled' : 'fa6-solid:users'}`}
							class="w-3 h-3 mr-0.5"
						/>
						{tag}
					</button>
				{/if}
			{/each}
			{#each tags as tag}
				{#if isNaN(Number(tag.slice(0, 1)))}
					<button
						class={`px-1 py-0.1 m-1 text-xs bg-gray-200/50 rounded transition hover:bg-gray-300 ${
							selectedTag === tag ? 'bg-gray-300/80  ring-2 ring-gray-600/80' : 'bg-gray-200/50'
						}`}
						on:click|preventDefault={() => (selectedTag = tag)}
						class:selected={selectedTag === tag}
					>
						{tag}
					</button>
				{/if}
			{/each}
		</div>
		<input
			type="text"
			bind:value={search}
			placeholder="Search..."
			class="w-40 h-8 px-2 py-1 mx-4 mb-1 text-sm border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
		/>
	</div>
	<div
		class="overflow-y-scroll border border-gray-200 rounded-lg shadow-md h-[21rem] dark:border-gray-700 bg-gray-200/40 dark:bg-gray-700/60"
	>
		<div class="flex flex-wrap">
			{#each filteredRecipes as recipe (recipe.title)}
				<button
					on:click|preventDefault={() => {
						selectedRecipe = recipe.title === selectedRecipe ? '' : recipe.title;

						chatInput.set(recipe.title === selectedRecipe ? recipe.prompt : '');
					}}
					class={`relative flex flex-col justify-between w-48 p-2 m-2 transition bg-white dark:bg-gray-600 rounded shadow cursor-pointer hover:scale-105 active:scale-90 ${
						selectedRecipe === recipe.title
							? 'ring-2 ring-black dark:ring-white  !bg-gray-200/20 dark:!bg-gray-700/20'
							: ''
					}`}
				>
					<div>
						<div class="flex">
							<h2 class="mb-1 text-sm font-bold text-left text-gray-600 dark:text-white">
								{recipe.title}
							</h2>
							<div class="w-10 h-5" />
						</div>
						<p class="mb-2 text-xs text-left opacity-75">{recipe.description}</p>
					</div>
					<div class="flex flex-wrap">
						{#each recipe.tags as tag}
							{#if tag.slice(0, 1) === '1' || tag.slice(0, 1) === '2'}
								<span
									class="absolute flex items-center px-1 py-0 m-1 text-xs text-gray-700 rounded bg-gray-200/50 dark:bg-white dark:text-gray-900 top-1 right-1"
								>
									<Icon
										icon={`${
											tag.slice(0, 1) === '1' ? 'fluent:person-16-filled' : 'fa6-solid:users'
										}`}
										class="w-3 h-3 mr-0.5"
									/>
									{tag}
								</span>
							{:else}
								<span
									class="px-1 py-0 m-1 text-xs text-gray-700 rounded bg-gray-200/50 dark:text-gray-900 dark:bg-gray-50"
									>{tag}</span
								>
							{/if}
						{/each}
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
