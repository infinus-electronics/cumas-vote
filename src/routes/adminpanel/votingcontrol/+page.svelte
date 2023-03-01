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
	import { pb } from '$lib//pocketbase';
	import { onMount } from 'svelte';
	import type { Record } from 'pocketbase';
	import PollGraph from '../../../components/pollGraph.svelte';
	import { Renew } from 'carbon-icons-svelte';
	// import {Record[]} from "pocketbase";

	let positions: Record[];
	let conamends: Record[];
	let selectedIndex: number = 0;
	let selectedID: string;
	let pollData = new Object();

	onMount(() => {
		pb.collection('positions')
			.getFullList({
		sort: '+sequence',
	})
			.then((res) => {
				// console.log(res)
				positions = res;
			});
		pb.collection('conamends')
			.getFullList({
		sort: '+sequence,title',
	})
			.then((res) => {
				// console.log(res)
				conamends = res;
			});
		pb.collection('polls')
			.getFullList()
			.then((res) => {
				console.log(res);
				// res.forEach((e,i)=>{
				//     for (const [k, v] of Object.entries(e.vote)){
				//         if(pollData[k]===undefined){
				//             pollData[k] = new Object;
				//         }
				//         if(pollData[k][v['firstChoice']]===undefined){
				//             pollData[k][v['firstChoice']]=1;
				//         } else {
				//             pollData[k][v['firstChoice']]++;
				//         }
				//         if(pollData[k][v['secondChoice']]===undefined){
				//             pollData[k][v['secondChoice']]=1;
				//         } else {
				//             pollData[k][v['secondChoice']]++;
				//         }
				//     }

				// })
			});
		pb.collection('polls').subscribe('*', function (e) {
			console.log(e.record);
		});
	});
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<h1>Polls</h1>
			</Column>
			<Column sm={1} md={1} lg={1}>
				<Button iconDescription="Refresh" icon={Renew} kind="tertiary" /></Column
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
								<TabContent />
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
