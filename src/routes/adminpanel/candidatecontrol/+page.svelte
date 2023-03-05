<script lang="ts">
    import {Content, Grid, Row, Column, StructuredList, StructuredListRow, StructuredListHead, StructuredListCell, StructuredListBody, Toggle} from "carbon-components-svelte";
    import {pb} from "$lib//pocketbase";
	import { onDestroy, onMount } from "svelte";
	import type { Record } from "pocketbase";

	let candidates: Record[]
	let disabled = false;
	let candidateToggles = new Object();
	let candidateTogglesOld = new Object();

    onMount(async ()=>{
		candidates = await pb.collection("candidates").getFullList();
		candidates.forEach((e)=> {
			candidateToggles[e.id]=e.voteable;
		})
		candidateTogglesOld = structuredClone(candidateToggles);
		// console.log(candidateToggles)
		// console.log(candidates)
	})

	// $: console.log(candidateToggles)
	

	const update = (async() => {
		disabled = true;
		// console.log(update")
		Object.keys(candidateToggles).forEach(async (element) => {
			console.log(candidateTogglesOld[element])
			console.log(candidateToggles[element])
			if(candidateToggles[element] !== candidateTogglesOld[element]){
				console.log(element)
				const original = await pb.collection('candidates').getOne(element);
				await pb.collection('candidates').update(element, {
					"first_name" : original.first_name,
					"last_name" : original.last_name,
					"contesting_name" : original.contesting,
					"voteable" : candidateToggles[element],
				})
			}
			
		});
		candidateTogglesOld = structuredClone(candidateToggles)
			disabled = false

	})
    onDestroy(()=>{})
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<h1>Candidates</h1>
			</Column>			
		</Row>
		{#if candidates !== undefined}
			<Row>
				<Column>
					<StructuredList>
						<StructuredListHead>
							<StructuredListRow head>
							  <StructuredListCell head>First Name</StructuredListCell>
							  <StructuredListCell head>Last Name</StructuredListCell>
							  <StructuredListCell head>Voteable</StructuredListCell>
							</StructuredListRow>
						  </StructuredListHead>
					<StructuredListBody>
						{#each candidates as candidate}
							<StructuredListRow>
								<StructuredListCell>{candidate.first_name}</StructuredListCell>
								<StructuredListCell>{candidate.last_name}</StructuredListCell>
								<StructuredListCell>
									<Toggle hideLabel bind:disabled={disabled} bind:toggled={candidateToggles[candidate.id]} on:toggle={e => {update()}}></Toggle>
								</StructuredListCell>
							</StructuredListRow>
						{/each}
					</StructuredListBody>
					
				</StructuredList>
				</Column>
			</Row>
		{/if}
    </Grid>
</Content>