<script lang="ts">
	import { goto } from '$app/navigation';
	// import { currentUser, pb } from '$lib//pocketbase';
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
	import { getContext, onMount } from 'svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import { get } from 'svelte/store';
	import CumasLogo from '../components/CumasLogo.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let sudo = false;
	let loggedIn = false;

	// $: if (data.localUser !== null) {
	// 	loggedIn = true;
	// 	sudo = data.localUser.role === "moderator"
	// } else {
	// 		loggedIn = false;
	// 		sudo = false;
	// 	}
	// const { currentUser, pb } = getContext(key) satisfies contextStore

	// currentUser.subscribe((currentUser) => {
	// 	if (currentUser !== null) {
	// 		console.log(currentUser)
	// 		loggedIn = true;
	// 		sudo = currentUser.role === 'moderator';
	// 	} else {
	// 		loggedIn = false;
	// 		sudo = false;
	// 	}
	// });
	onMount(() => {
		pb.authStore.loadFromCookie(document.cookie);
		currentUser.set(pb.authStore.model);
		// 	console.log(get(currentUser))

		console.log('mount');
		if (pb.authStore.model !== null) {
			loggedIn = true;
			sudo = pb.authStore.model.role === 'moderator';
		} else {
			loggedIn = false;
			sudo = false;
		}

		// pb.authStore.onChange(() => {
		// 	currentUser.set(pb.authStore.model);
		// 	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
		// 	console.log('authChanged');
		// });
	});

	function logout() {
		pb.authStore.clear();
		goto('/');
	}
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
			<Button kind="danger-ghost" href="/adminpanel">Admin Panel</Button>
		{/if}
		{#if loggedIn}
			<Button kind="secondary" href="/logout">Log Out</Button>
		{/if}
	</ButtonSet>

	<!-- </Column>
		

			<Column />
		</Row>
	</Grid> -->
</Content>
