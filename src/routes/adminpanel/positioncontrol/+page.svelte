<script lang="ts">
    import {Content, Grid, Row, Column, StructuredList, StructuredListRow, StructuredListHead, StructuredListCell, StructuredListBody, Toggle} from "carbon-components-svelte";
    import {pb} from "$lib//pocketbase";
	import { onDestroy, onMount } from "svelte";
	import type { Record } from "pocketbase";

	let positions: Record[]
	let disabled = false;
	let positionToggles = new Object();
	let positionTogglesOld = new Object();

    onMount(async ()=>{
		positions = await pb.collection("positions").getFullList();
		positions.forEach((e)=> {
			positionToggles[e.id]=e.open_to_vote;
		})
		positionTogglesOld = structuredClone(positionToggles);
		// console.log(positionToggles)
		// console.log(positions)
	})

    const update = (async() => {
		disabled = true;
		// console.log(update")
		Object.keys(positionToggles).forEach(async (element) => {
			// console.log(positionTogglesOld[element])
			// console.log(positionToggles[element])
			if(positionToggles[element] !== positionTogglesOld[element]){
				console.log(element)
				const original = await pb.collection('positions').getOne(element);
				await pb.collection('positions').update(element, {
					"title" : original.title,
					"sequence" : original.sequence,
					"open_to_vote" : positionToggles[element],
                    
				})
			}
			
		});
		positionTogglesOld = structuredClone(positionToggles)
			disabled = false

	})

</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<h1>Positions</h1>
			</Column>			
		</Row>
		{#if positions !== undefined}
			<Row>
				<Column>
					<StructuredList>
						<StructuredListHead>
							<StructuredListRow head>
							  <StructuredListCell head>Title</StructuredListCell>
							  <StructuredListCell head>Voteable</StructuredListCell>
							</StructuredListRow>
						  </StructuredListHead>
					<StructuredListBody>
						{#each positions as position}
							<StructuredListRow>
								<StructuredListCell>{position.title}</StructuredListCell>
								<StructuredListCell>
									<Toggle hideLabel bind:disabled={disabled} bind:toggled={positionToggles[position.id]} on:toggle={e => {update()}}></Toggle>
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