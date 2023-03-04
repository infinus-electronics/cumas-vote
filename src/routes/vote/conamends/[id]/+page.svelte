<script lang="ts">
	import { key, type contextStore } from '$lib//pocketbase';
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

	import { onMount, onDestroy, getContext } from 'svelte';
	import type { PageData } from './$types';
	import type { Record, RecordSubscription } from 'pocketbase';
	import { get } from 'svelte/store';

	export let data: PageData;

	export let currentRecord: Record;

    const { currentUser, pb } = getContext(key) satisfies contextStore;

	// export let candidates: Record[];

	let openToVote = true;

	function setOpenToVote(e: boolean) {
		openToVote = e;
		// console.log(e);
	}

	$: pb.collection('conamends')
		.getOne(data.currentSelected)
		.then((record) => {
			// console.log(record);
			currentRecord = record;

			pb.collection('conamends').unsubscribe();
			pb.collection('conamends').subscribe(record.id, function (e) {
				// console.log(e.record);
				setOpenToVote(e.record.open_to_vote);
			});
			setOpenToVote(record.open_to_vote);
			
		});

	let choices: string[] = ["Yes", "No"];

	let selected: string | undefined;

    let voted = false;
	let voting = false;
	let errorActive = false;

	function resetState() {
		// console.log("here")
		selected = undefined;
        voted = false;
		voting = false;
		errorActive = false;
	}

	$: data.currentSelected, resetState();

	async function castVote() {
		// console.log(selected);

        const user = get(currentUser)

		await pb.collection('polls')
			.getFirstListItem(`user="${user!.id}"`)
			.then(async (res) => {
				// console.log(res.vote);
				let vote = structuredClone(res.vote);
                if (vote.conamends === undefined){
                    vote.conamends = {};
                }
				// console.log(JSON.parse(res.vote))
				vote.conamends[currentRecord.title] = selected;
				// console.log(vote);
				let data = {
					user: `${user!.id}`,
					vote: JSON.stringify(vote)
				};
				// console.log(data)
				await pb.collection('polls').update(res.id, data);
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
            <Row class="prose">
				<Column>
					<p>{currentRecord.content}</p>                    
				</Column>
			</Row>
			<Row>
				<Column>
					
						<TileGroup bind:selected={selected}>
							{#each choices as choice}
								
									<RadioTile
										value={choice}
										
									>
										{choice}
									</RadioTile>
								
							{/each}
							
						</TileGroup>
					
				</Column>
			</Row>
		
			<Row>
				<Column>
					<Button
						disabled={!openToVote ||
							selected === undefined}
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
