<script lang="ts">
	import { pb } from '$lib//pocketbase';
	import {
		Button,
		Column,
		Content,
		Grid,
		Modal,
		Row,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow
	} from 'carbon-components-svelte';
	import type { Record } from 'pocketbase';
	import { onMount } from 'svelte';
	import { get_custom_elements_slots } from 'svelte/internal';

	let users: Record[];
	let polls: Record[];
	let usersWithoutPolls: Record[];
	let missingPollCard: number;
	let disabled = false;
	let resetModalOpen = false;

	const fetchData = async () => {
		users = await pb.collection('users').getFullList();
		polls = await pb.collection('polls').getFullList();
		usersWithoutPolls = [];
		missingPollCard = 0;
		for await (const user of users) {
			let pollID = await pb.collection('users').getOne(user.id, {
				expand: 'polls(user)'
			});

			if (pollID.expand['polls(user)'] === undefined) {
				missingPollCard++;
				usersWithoutPolls.push(user);
				// console.log(usersWithoutPolls);
				// console.log(missingPollCard)
			}
		}
		// console.log(usersWithoutPolls);

		// console.log(missingPollCard)
		return true;
	};
	let fetchedData = fetchData();
	const createPolls = async () => {
		disabled = true;
		await fetchData();
		// console.log(usersWithoutPolls["0"])
		for await (const user of usersWithoutPolls) {
			// console.log(user)
			await pb.collection('polls').create({
				user: user.id,
				vote: '{ }'
			});
		}
		disabled = false;
	};
	const resetPolls = async () => {
		resetModalOpen = false;
		disabled = true;
		await fetchData();
		// console.log(usersWithoutPolls["0"])
		for await (const poll of polls) {
			// console.log(user)
			let currUser = await pb.collection('users').getOne(poll.user);
			// console.log(currUser);
			await pb.collection('polls').update(poll.id, {
				user: currUser.id,
				vote: '{ }'
			});
		}
		disabled = false;
	};
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<h1>Utilities</h1>
			</Column>
		</Row>
		<Row>
			<Column>
				<h2>Stats</h2>
				<Row>
					{#await fetchedData}
						Fetching data...
					{:then data}
						<StructuredList>
							<StructuredListHead>
								<StructuredListRow head>
									<StructuredListCell head>Stat</StructuredListCell>
									<StructuredListCell head>Value</StructuredListCell>
								</StructuredListRow>
							</StructuredListHead>
							<StructuredListRow>
								<StructuredListCell>Number of users</StructuredListCell>
								<StructuredListCell>
									{users.length}
								</StructuredListCell>
							</StructuredListRow>
							<StructuredListRow>
								<StructuredListCell>Number of poll cards</StructuredListCell>
								<StructuredListCell>
									{polls.length}
								</StructuredListCell>
							</StructuredListRow>
							<StructuredListRow>
								<StructuredListCell>Number of users with no poll card</StructuredListCell>
								<StructuredListCell>
									{missingPollCard}
								</StructuredListCell>
							</StructuredListRow>
							<StructuredListBody />
						</StructuredList>
					{/await}
				</Row>
			</Column>
		</Row>
		<Row>
			<Column>
				<h2>Actions</h2>
			</Column>
		</Row>
		<Row>
			<Column>
				<Button on:click={createPolls} bind:disabled>Create poll cards for all users</Button>
			</Column>
		</Row>
		<Row>
			<Column>
				<Button
					kind="danger"
					on:click={() => {
						resetModalOpen = true;
					}}
					bind:disabled
				>
					Reset all poll cards
				</Button>
			</Column>
		</Row>
	</Grid>
	<Modal
		danger
		bind:open={resetModalOpen}
		modalHeading="Reset all polls"
		primaryButtonText="Proceed"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (resetModalOpen = false)}
		on:click:button--primary={resetPolls}
	>
		<p>This is a permanent action and cannot be undone.</p>
	</Modal>
</Content>
