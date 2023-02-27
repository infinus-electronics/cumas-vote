<script>
	import { pb } from '$lib//pocketbase';
	import {
		Button,
		Column,
		Content,
		Grid,
		RadioTile,
		Row,
		Tile,
		TileGroup
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @type {import('pocketbase').Record}
	 */
	export let currentRecord;

	/**
	 * @type {import('pocketbase').Record[]}
	 */
	export let candidates;

	let openToVote = true;

	$: pb.collection('positions')
		.getOne(data.currentSelected)
		.then((record) => {
			// console.log(record);
			currentRecord = record;
			pb.collection('positions').unsubscribe();
			pb.collection('positions').subscribe(record.id, function (e) {
				console.log(e.record);
				openToVote = e.record.open_to_vote;
			});
			pb.collection('candidates')
				.getFullList({ filter: `(contesting~"${record.id}")` })
				.then((res) => {
					// console.log(res);
					candidates = res;
				});
		});

	/**
	 * @type {string | undefined}
	 */
	let selectedA;
	/**
	 * @type {string |undefined}
	 */
	let selectedB;

	function resetState() {
		// console.log("here")

		selectedA = undefined;
		selectedB = undefined;
	}

	$: data.currentSelected, resetState();

	function castVote() {
		console.log(selectedA);
		console.log(selectedB);
		pb.collection('polls')
			.getFirstListItem(`user="${pb.authStore.model.id}"`)
			.then((res) => {
				console.log(res.vote);
				let vote = res.vote;
				// console.log(JSON.parse(res.vote))
				vote[currentRecord.title] = {
					firstChoice: selectedA,
					secondChoice: selectedB
				};
				console.log(vote);
				let data = {
					user: `${pb.authStore.model.id}`,
					vote: JSON.stringify(vote)
				};
				// console.log(data)
				pb.collection('polls').update(res.id, data);
			});
	}
	// onMount(async()=>{
	//     const record = await pb.collection('positions').getOne(data.currentSelected)
	//     console.log(record)
	// })
</script>

<Content>
	{#if currentRecord !== undefined}
		<Grid padding>
			<Row>
				<Column>
					<h1>{currentRecord.title}</h1>
				</Column>
			</Row>
			<Row>
				<Column>
					{#if candidates !== undefined}
						<TileGroup legend="First Choice" bind:selected={selectedA}>
							{#each candidates as candidate}
								{#if candidate.voteable}
									<RadioTile
										value={candidate.id}
										on:click={() => {
											selectedB = undefined;
										}}
									>
										{candidate.first_name}, {candidate.last_name}
									</RadioTile>
								{/if}
							{/each}
							<RadioTile
								value="RON"
								on:click={() => {
									selectedB = undefined;
								}}
							>
								RON
							</RadioTile>
						</TileGroup>
					{/if}
				</Column>
			</Row>
			<Row>
				<Column>
					{#if candidates !== undefined}
						<TileGroup legend="Second Choice" bind:selected={selectedB}>
							{#each candidates as candidate}
								{#if candidate.voteable}
									<RadioTile
										value={candidate.id}
										disabled={candidate.id === selectedA ||
											selectedA === undefined ||
											selectedA === 'RON'}
									>
										{candidate.first_name}, {candidate.last_name}
									</RadioTile>
								{/if}
							{/each}
							<RadioTile value="RON" disabled={selectedA === 'RON' || selectedA === undefined}>
								RON
							</RadioTile>
						</TileGroup>
					{/if}
				</Column>
			</Row>
			<Row>
				<Column>
					<Button
						disabled={!openToVote ||
							!currentRecord.open_to_vote ||
							selectedA === undefined ||
							(selectedA !== 'RON' && selectedB === undefined)}
						on:click={castVote}
					>
						Cast Vote
					</Button>
				</Column>
			</Row>
		</Grid>
	{/if}
</Content>
