<script lang="ts">
	import {
		Column,
		Content,
		Grid,
		Row,
		Tabs,
		Tab,
		TabContent,
		Button
	} from 'carbon-components-svelte';
	// import { pb } from '$lib//pocketbase';
	import { onMount } from 'svelte';
	import type { Record } from 'pocketbase';
	import PollGraph from '../../../components/pollGraph.svelte';
	import { Renew } from 'carbon-icons-svelte';
	import type { PageData } from "./$types";
	import { invalidateAll } from '$app/navigation';
	import type { K } from 'vitest/dist/types-71ccd11d';

	export let data: PageData;


	// import {Record[]} from "pocketbase";

	let positions: Record[];
	let conamends: Record[];
	let positionVotes: Map<String, Map<String, Number>>;
	let conamendVotes: Map<String, Map<String, Number>>;
	// let polls: Record[];
	let selectedIndex: number = 0;
	let selectedID: string;
	let pollData = new Object();

	onMount(() => {
		positions = data.positions;
		conamends = data.conamends;
		positionVotes = data.voteResults.get("positions") || new Map()
		conamendVotes = data.voteResults.get("conamends") || new Map()

	})
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<h1>Polls</h1>
			</Column>
			<Column sm={1} md={1} lg={1}>
				<Button iconDescription="Refresh" icon={Renew} kind="tertiary" on:click={()=>{invalidateAll()}}/></Column
			>
		</Row>

		<Row>
			<Column>
				<!-- {#if positions !== undefined} -->
				<Tabs bind:selected={selectedIndex}>
					{#if positions !== undefined}
						{#each positions as position}
							<Tab label={position.title} />
						{/each}
					{/if}
					{#if conamends !== undefined}
						{#each conamends as conamend}
							<Tab label={conamend.title} />
						{/each}
					{/if}

					<svelte:fragment slot="content">
						{#if positions !== undefined}
							{#each positions as position}
								<TabContent>
									{positionVotes.get(position.title)}
								</TabContent>
							{/each}
						{/if}
						{#if conamends !== undefined}
							{#each conamends as conamend}
								<TabContent />
							{/each}
						{/if}
					</svelte:fragment>
				</Tabs>
				<!-- {/if} -->
			</Column>
		</Row>
	</Grid>
</Content>
