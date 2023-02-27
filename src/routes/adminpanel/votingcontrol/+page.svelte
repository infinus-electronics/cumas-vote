<script lang="ts">
	import { Column, Content, Grid, Row, Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import { pb } from '$lib//pocketbase';
	import { onMount } from 'svelte';
	import type { Record } from 'pocketbase';
	// import {Record[]} from "pocketbase";

	let positions: Record[];
	let selectedIndex: number = 0;
	let selectedID: string;

	onMount(() => {
		pb.collection('positions')
			.getFullList()
			.then((res) => {
				// console.log(res)
				positions = res;
			});
		pb.collection('polls').subscribe('*', function (e) {
			console.log(e.record);
		});
	});
</script>

<Content>
	{#if positions !== undefined}
		<Grid>
			<Row padding>
				<Column>
					<Tabs bind:selected={selectedIndex}>
						{#each positions as position}
							<Tab label={position.title} />
						{/each}

						<svelte:fragment slot="content">
							{#each positions as position}
								<TabContent>
									{position.id}
								</TabContent>
							{/each}
						</svelte:fragment>
					</Tabs>
				</Column>
			</Row>
		</Grid>
	{/if}
</Content>
