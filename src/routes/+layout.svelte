<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import {
		Content,
		Header,
		HeaderAction,
		HeaderActionLink,
		HeaderUtilities,
		Theme
	} from 'carbon-components-svelte';
	import { PUBLIC_VERSION } from '$env/static/public';
	import { Login, UserAvatar, Logout } from 'carbon-icons-svelte';
	import { pb, currentUser, key } from '$lib//pocketbase';
	import { beforeNavigate, goto } from '$app/navigation';
	import { isSideBarOpenW } from '$lib//navBarStore';
	import { onDestroy, setContext } from 'svelte';
	import { onMount } from 'svelte';
	import type {LayoutData} from "./$types"
	import { get, writable } from 'svelte/store';


	export let data: LayoutData;
	let sudo = false;
	let loggedIn = false;

	// const currentUser = writable(pb.authStore.model);


	// setContext(key, {
	// 	currentUser: currentUser,
	// 	pb: pb,
	// 	isSideBarOpenW: isSideBarOpenW,
	// });

	

	
	// log();
	// setContext('module', pb);
	onMount(() => {

		pb.authStore.loadFromCookie(document.cookie);
		currentUser.set(pb.authStore.model);
	// 	console.log(get(currentUser))		
		
		console.log("mount")
		if (pb.authStore.model !== null) {
			loggedIn = true;
			sudo = pb.authStore.model.role === 'moderator';
		} else {
			loggedIn = false;
			sudo = false;
		}

		// pb.authStore.onChange(() => {
		// currentUser.set(pb.authStore.model);
		// document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
		// console.log('authChanged');
	// });

		
	
	});
	
	

	// console.log(uuid1)

	// $: if (data.localUser !== null) {
	// 	loggedIn = true;
	// 	sudo = data.localUser.role === "moderator"
	// } else {
	// 		loggedIn = false;
	// 		sudo = false;
	// 	}
	const unsubscribe = currentUser.subscribe((currentUser) => {
		if (currentUser !== null) {
			loggedIn = true;
			sudo = currentUser.role === 'moderator';
		} else {
			loggedIn = false;
			sudo = false;
		}
	});

	// onDestroy(()=> {
	// 	unsubscribe();
	// 	// console.log(unsubPB);
	// })

	let isSideNavOpen = true;
	let innerWidth = 2048;
	let isMobile: Boolean = false;

	$: isMobile = innerWidth < 1056;

	$: {
		if (isMobile) {
			// console.log(isMobile)
			isSideBarOpenW.set(false);
		} else {
			isSideBarOpenW.set(true);
		}
		// console.log(isSideNavOpen);
	}

	$: isSideBarOpenW.set(isSideNavOpen);

	function logout() {
		pb.authStore.clear();
		goto('/');
	}
</script>

<svelte:window bind:innerWidth />

<Header company={sudo ? 'sudo' : ''} expandedByDefault={true} bind:isSideNavOpen href="/">
	<span slot="platform" class="platform-name">
		CUMaS Voting System &nbsp;<code class="code-01">v{PUBLIC_VERSION || ''}</code>
	</span>
	<HeaderUtilities>
		{#if loggedIn === false}
			<HeaderActionLink icon={Login} href="/login" />
		{:else}
			<HeaderActionLink icon={Logout} href="/logout"  />
		{/if}
	</HeaderUtilities>
</Header>

<slot />

<style lang="scss">
	.platform-name {
		display: flex;
		align-items: baseline;
	}
	@media (max-width: 580px) {
		.platform-name code {
			display: none;
		}
	}
</style>
