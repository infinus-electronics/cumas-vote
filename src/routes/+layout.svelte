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
	import { pb, currentUser } from '$lib//pocketbase';
	import { beforeNavigate, goto } from '$app/navigation';
	import {isSideBarOpenW} from "$lib//navBarStore"

	let sudo = false;

	currentUser.subscribe((currentUser)=>{
		if (currentUser !== null){
			sudo = (currentUser.role === "moderator")
		}
		else {
			sudo = false
		}
	})

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

	$: isSideBarOpenW.set(isSideNavOpen)


	function logout(){
		pb.authStore.clear();
		goto("/")
	}


</script>

<svelte:window bind:innerWidth />

<Header company = {sudo ? "sudo" : ""} expandedByDefault={true} bind:isSideNavOpen={isSideNavOpen}>
	<span slot="platform" class="platform-name">
		CUMaS Voting System &nbsp;<code class="code-01">v{PUBLIC_VERSION || ''}</code>
	</span>
	<HeaderUtilities>
		{#if $currentUser === null}
			<HeaderActionLink icon={Login} href="/login" />
		{:else}
			<HeaderAction icon={Logout} on:click={logout}/>
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
