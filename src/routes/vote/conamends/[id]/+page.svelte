<script lang="ts">
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

	import { onMount, onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import type { Record, RecordSubscription } from 'pocketbase';

	export let data: PageData;

	export let currentRecord: Record;

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

	function resetState() {
		// console.log("here")
		selected = undefined;
	}

	$: data.currentSelected, resetState();

	async function castVote() {
		// console.log(selected);

		pb.collection('polls')
			.getFirstListItem(`user="${pb.authStore.model!.id}"`)
			.then((res) => {
				// console.log(res.vote);
				let vote = structuredClone(res.vote);
                if (vote.conamends === undefined){
                    vote.conamends = {};
                }
				// console.log(JSON.parse(res.vote))
				vote.conamends[currentRecord.title] = {
					choice: selected
				};
				// console.log(vote);
				let data = {
					user: `${pb.authStore.model!.id}`,
					vote: JSON.stringify(vote)
				};
				// console.log(data)
				pb.collection('polls').update(res.id, data);
			});
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
						on:click={castVote}
					>
						Cast Vote
					</Button>
				</Column>
			</Row>
		</Grid>
	{/if}
</Content>
