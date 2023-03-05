<script lang="ts">
	import { Grid, Row, Column, Tile } from 'carbon-components-svelte';

	export let data: Map<String, Number> | undefined;
	export let names: Map<String, String>;

	let num = data?.size;
	// let numRows = parseInt(num / 4);
	// console.log(data);
</script>

<Grid condensed>
	{#each [...data] as [candidate, votes]}
		<Row>
			<Column>
				<div class="voteResultTile">{candidate === 'RON' ? 'RON' : names.get(candidate)}</div>
			</Column>

			<Column sm={1} md={1} lg={1}>
				<div class="voteResultTile"><h5>{votes}</h5></div>
			</Column>
		</Row>
	{/each}
</Grid>

<style>
	div.voteResultTile {
		display: block;
		/* min-width: 8rem; */
		min-height: 4rem;
		padding: 1rem;
		background-color: #393939;
		outline: 2px solid rgba(0, 0, 0, 0);
		outline-offset: -2px;
	}
</style>
