<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib//pocketbase';
	import {
		AspectRatio,
		Button,
		ButtonSet,
		Column,
		Content,
		Grid,
		Row
	} from 'carbon-components-svelte';
	import { ButtonFlushLeft } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import CumasLogo from '../components/CumasLogo.svelte';

	let sudo = false;
	let loggedIn = false;

	currentUser.subscribe((currentUser) => {
		if (currentUser !== null) {
			loggedIn = true;
			sudo = currentUser.role === 'moderator';
		} else {
			loggedIn = false;
			sudo = false;
		}
	});

	function logout() {
		pb.authStore.clear();
		goto('/');
	}
	// onMount(() => {
	// 	const user = get(currentUser);
	// 	console.log(user);
	// 	if (user === null) {
	// 		goto('/login');
	// 	}
	// });
</script>

<Content>
	<!-- <Grid padding>
		<Row>
			<Column />
			<Column aspectRatio="1x1">
				<CumasLogo />
			</Column>
			<Column />
		</Row>
		<Row>
			<Column />
			
			<Column> -->
	<ButtonSet stacked>
		{#if !loggedIn}
			<Button href="/login">Log In</Button>
		{:else}
			<Button href="/vote">Vote</Button>
		{/if}

		{#if sudo}
			<Button kind="danger-ghost" href = "/adminpanel">Admin Panel</Button>
		{/if}
		{#if loggedIn}
			<Button kind="secondary" on:click={logout}>Log Out</Button>
		{/if}
	</ButtonSet>

	<!-- </Column>
		

			<Column />
		</Row>
	</Grid> -->
</Content>
