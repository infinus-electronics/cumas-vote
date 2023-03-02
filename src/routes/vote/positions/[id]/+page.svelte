<script lang="ts">
	import { currentUser, pb } from '$lib//pocketbase';
	import {
		Button,
		Column,
		Content,
		Grid,
		RadioTile,
		Row,
		Tile,
		TileGroup,
		ToastNotification
	} from 'carbon-components-svelte';

	import { onMount, onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import type { Record, RecordSubscription } from 'pocketbase';
	import { error } from '@sveltejs/kit';
	import { get } from 'svelte/store';

	export let data: PageData;

	export let currentRecord: Record;

	export let candidates: Record[];

	let openToVote = true;

	function setOpenToVote(e: boolean) {
		openToVote = e;
		// console.log(e);
	}

	$: pb.collection('positions')
		.getOne(data.currentSelected)
		.then((record) => {
			// console.log(record);
			currentRecord = record;

			pb.collection('positions').unsubscribe();
			pb.collection('positions').subscribe(record.id, function (e) {
				// console.log(e.record);
				setOpenToVote(e.record.open_to_vote);
			});
			setOpenToVote(record.open_to_vote);
			pb.collection('candidates')
				.getFullList({ filter: `(contesting~"${record.id}")` })
				.then((res) => {
					// console.log(res);
					candidates = res;
				});
		});

	let selectedA: string | undefined;

	// let selectedB: string | undefined;

	let voted = false;
	let voting = false;
	let errorActive = false;

	function resetState() {
		// console.log("here")

		selectedA = undefined;
		// selectedB = undefined;
		voted = false;
		voting = false;
		errorActive = false;
	}

	$: data.currentSelected, resetState();

	async function castVote() {
		// console.log(selectedA);
		// console.log(selectedB);
		const user = get(currentUser)

		await pb
			.collection('polls')
			.getFirstListItem(`user="${user!.id}"`)
			.then(async (res) => {
				// console.log(res.vote);
				let vote = structuredClone(res.vote);

				if (vote.positions === undefined) {
					vote.positions = {};
				}
				// console.log(JSON.parse(res.vote))
				vote.positions[currentRecord.title] = selectedA;
				// console.log(vote);
				let data = {
					user: `${user!.id}`,
					vote: JSON.stringify(vote)
				};
				// console.log(data)
				await pb.collection('polls').update(res.id, data);
				// console.log("done")
			});
	}

	async function sendVote() {
		voting = true;
		try {
			await castVote();

			voting = false;
			voted = true;
		} catch (err) {
			voting = false;
			voted = false;
			errorActive = true;
			throw err;
		}
	}

	onDestroy(() => {
		pb.collection('positions').unsubscribe();
	});
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
						<TileGroup bind:selected={selectedA}>
							{#each candidates as candidate}
								{#if candidate.voteable}
									<RadioTile
										value={candidate.id}
										on:click={() => {
											
										}}
									>
										{candidate.first_name}, {candidate.last_name}
									</RadioTile>
								{/if}
							{/each}
							<RadioTile
								value="RON"
								on:click={() => {
									
								}}
							>
								RON
							</RadioTile>
						</TileGroup>
					{/if}
				</Column>
			</Row>
			<!-- <Row>
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
			</Row> -->
			<Row>
				<Column>
					<Button
						disabled={!openToVote ||
							selectedA === undefined							
							}
						on:click={sendVote}
					>
						Cast Vote
					</Button>
				</Column>
			</Row>
			<Row>
				<Column>
					{#if errorActive === true}
						<ToastNotification
							kind="error"
							title="Error submitting vote"
							subtitle={currentRecord.title}
							caption={new Date().toLocaleString()}
							fullWidth={true}
							lowContrast={true}
							timeout={5000}
							on:close={() => {
								// console.log(close)
								errorActive = false;
							}}
						/>
					{/if}
					{#if voting === true}
						<ToastNotification
							kind="info"
							title="Submitting vote"
							subtitle={currentRecord.title}
							caption={new Date().toLocaleString()}
							fullWidth={true}
							lowContrast={true}
							timeout={5000}
							on:close={() => {
								// console.log(close)
								voting = false;
							}}
						/>
					{/if}
					{#if voted === true}
						<ToastNotification
							kind="success"
							title="Vote has been cast"
							subtitle={currentRecord.title}
							caption={new Date().toLocaleString()}
							fullWidth={true}
							lowContrast={true}
							timeout={5000}
							on:close={() => {
								// console.log(close)
								voted = false;
							}}
						/>
					{/if}
				</Column>
			</Row>
		</Grid>
	{/if}
</Content>
