<script>
	import Icon from '@iconify/svelte';
	let search = '';
	let selectedTag = '';
	export let selectedMode;

	const modes = [
		{
			title: 'Default',
			tags: ['2+'],
			description: 'Classic Tangent. No bells and whistles'
		},
		{
			title: 'Meeting',
			tags: ['Work', '2+'],
			description:
				'Vastly improve your next meeting by staying on topic and getting the most value out of any meeting'
		},
		{
			title: 'Brainstorm',
			tags: ['Creative', 'Work', '2+'],
			description:
				'Foster creativity with a two-phase brainstorming session: ideation and structured discussion'
		},
		{
			title: 'CampFire',
			tags: ['Personal', '2+'],
			description: 'Conversations around the proverbial campfire'
		},
		{
			title: 'Date Night',
			tags: ['Personal', '2+'],
			description: 'A series of deep questions to strengthen a relationship'
		},
		{
			title: 'Self Exploration',
			tags: ['Personal', '1'],
			description: 'Really get to know yourself through deep, insightful self reflection'
		},
		{
			title: 'Job Interview Prep',
			tags: ['Work', '1'],
			description: 'Helps you prep for that big interview you have'
		},
		{
			title: 'Socratic Seminar',
			tags: ['Educational', '2+'],
			description: 'Really dig deep into the meaning of life, or any philosophical topic'
		},
		{
			title: 'Art Journey',
			tags: ['Creative', 'Fun', '2+'],
			description:
				'Generate AI images through voice and explore a canvas of infinite artistic opportunity'
		},
		{
			title: 'Music Journey',
			tags: ['Creative', 'Fun', '2+'],
			description: 'Generate AI music collaboratively on a canvas'
		},
		{
			title: 'Mood-Booster',
			tags: ['Personal', '1'],
			description:
				'Enhance your mood with positive affirmations, jokes, and uplifting conversation prompts'
		},

		{
			title: 'Performance Review',
			tags: ['Work', '2+'],
			description: 'Prepare for, or collaboratively perform a performance review'
		},
		{
			title: 'Tech Talk',
			tags: ['Educational', '2+'],
			description: 'Discuss and share insights about the latest tech trends'
		},
		{
			title: 'Futurist',
			tags: ['Hobby', 'Educational', '2+'],
			description:
				'Peer into the near and not so near future, and make wild predictions about the future of humanity'
		},
		{
			title: 'Poetry Slam',
			tags: ['Creative', 'Fun', '2+'],
			description: 'Take turns creating lines for a collaborative poem'
		},
		{
			title: 'Trivia Night',
			tags: ['Fun', '2+'],
			description: 'A fun and competitive trivia game on various topics. Perfect for a game night'
		},
		{
			title: 'Current Events',
			tags: ['Educational', '2+'],
			description: 'Stay up-to-date by discussing breaking news and emerging trends'
		},

		{
			title: 'Historical Scenarios',
			tags: ['Educational', '2+'],
			description: 'Travel back in time and debate decisions in significant historical events.'
		},
		{
			title: 'Financial Planning',
			tags: ['Hobby', '2+'],
			description:
				'Discuss budgeting, investments, and future financial goals in a structured conversation'
		},
		{
			title: 'Roleplay Adventures',
			tags: ['Fun', '2+'],
			description: 'Choose your character and embark on a thrilling narrative journey'
		},

		{
			title: 'Life Coaching',
			tags: ['Personal', '1'],
			description: 'Reflect on your goals, values, and achievements through guided questions'
		},

		{
			title: 'First Date',
			tags: ['Personal', '2+'],
			description: 'Get to know someone new through fun get to know you questions'
		},
		{
			title: 'Debate',
			tags: ['Educational', '2+'],
			description:
				'Share your opinions on topics in a highly structured way. AI chooses the winner!'
		},
		{
			title: 'Team Building',
			tags: ['Work', '2+'],
			description: 'Get to know your team better through fun icebreakers'
		},

		{
			title: 'Collaborative Design',
			tags: ['Creative', 'Work', '2+'],
			description: 'Chat collaboratively about a design to push it forward'
		},
		{
			title: 'Wine Tasting',
			tags: ['Hobby', 'Fun', '2+'],
			description: 'All sorts of floral notes in this fun wine night activity'
		},
		{
			title: 'Heart to heart',
			tags: ['Personal', '2+'],
			description: "Go on, pour your heart out. You'll feel better!"
		},
		{
			title: 'Writers workshop',
			tags: ['Creative', 'Educational', '2+'],
			description: 'A safe place to critique, improve, and edit written word works'
		},
		{
			title: 'Book Club',
			tags: ['Educational', '2+'],
			description:
				'Discuss a book chapter by chapter, including themes, characters, and literary elements.'
		},
		{
			title: 'Memory Lane',
			tags: ['Personal', '2+'],
			description: 'Reminisce about the past through topics that prompt nostalgic conversations.'
		},
		{
			title: 'Murder Mystery',
			tags: ['Fun', '2+'],
			description: 'Participate in a virtual whodunnit, gather clues, and solve the mystery.'
		},
		{
			title: 'Choose Your Adventure',
			tags: ['Fun', '2+'],
			description: 'Navigate through an interactive story with multiple choices and endings.'
		},
		{
			title: 'Time Capsule',
			tags: ['Personal', '1'],
			description:
				'Reflect on your current life and set goals or write messages to your future self.'
		},
		{
			title: 'Story Building',
			tags: ['Creative', 'Fun', '2+'],
			description: 'Generate a story line collaboratively with friends'
		}
	];

	// const tags = Array.from(new Set(modes.flatMap((mode) => mode.tags)));
	const tags = Array.from(new Set(modes.flatMap((mode) => mode.tags))).sort();

	$: filteredModes = modes.filter(
		(mode) =>
			mode.title.toLowerCase().includes(search.toLowerCase()) &&
			(selectedTag ? mode.tags.includes(selectedTag) : true)
	);
</script>

<div class="flex flex-col w-[42rem] !overflow-y">
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
						class={`flex items-center px-1 py-0 m-1 text-xs transition rounded bg-secondary-200/50 text-secondary-700 dark:text-secondary-100 dark:bg-secondary-700 hover:bg-secondary-300 ${
							selectedTag === tag
								? 'bg-secondary-300/80  ring-2 ring-secondary-600/80'
								: 'bg-secondary-200/50'
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
						class={`px-1 py-0.1 m-1 text-xs bg-primary-200/50 rounded transition hover:bg-primary-300 ${
							selectedTag === tag
								? 'bg-primary-300/80  ring-2 ring-primary-600/80'
								: 'bg-primary-200/50'
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
			class="w-40 h-8 px-2 py-1 mx-4 mb-1 text-sm border border-gray-300 rounded"
		/>
	</div>
	<div
		class="overflow-y-scroll border border-gray-200 rounded-lg shadow-md h-72 dark:border-gray-700 bg-primary-200/40"
	>
		<div class="flex flex-wrap">
			{#each filteredModes as mode (mode.title)}
				<button
					on:click|preventDefault={() =>
						(selectedMode = mode.title === selectedMode ? '' : mode.title)}
					class={`relative flex flex-col justify-between w-48 p-2 m-2 transition bg-white rounded shadow cursor-pointer hover:scale-105 active:scale-90 ${
						selectedMode === mode.title
							? 'ring-2 ring-green-500 dark:ring-green-500 !bg-secondary-200/20 dark:!bg-secondary-700/20'
							: ''
					}`}
				>
					<div>
						<div class="flex">
							<h2 class="mb-1 text-sm font-bold text-left text-primary-600">{mode.title}</h2>
							<div class="w-10 h-5" />
						</div>
						<p class="mb-2 text-xs text-left">{mode.description}</p>
					</div>
					<div class="flex flex-wrap">
						{#each mode.tags as tag}
							{#if tag.slice(0, 1) === '1' || tag.slice(0, 1) === '2'}
								<span
									class="absolute flex items-center px-1 py-0 m-1 text-xs rounded bg-secondary-200/50 text-secondary-700 dark:text-secondary-100 dark:bg-secondary-700 top-1 right-1"
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
									class="px-1 py-0 m-1 text-xs rounded bg-primary-200/50 text-primary-700 dark:text-primary-100 dark:bg-primary-700"
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
