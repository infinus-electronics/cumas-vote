<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import {
		Header,
		HeaderAction,
		HeaderActionLink,
		HeaderUtilities,
		SideNav,
		SideNavItems,
		SideNavMenuItem
	} from 'carbon-components-svelte';
	import { currentUser, pb } from '$lib//pocketbase';
	import { PUBLIC_VERSION } from '$env/static/public';
	import { Login, Logout } from 'carbon-icons-svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;

	// let isOpen = false;
	let isSideNavOpen = true;
	let innerWidth = 2048;
	$: isMobile = innerWidth < 1056;

	beforeNavigate(() => {
		if (isMobile) isSideNavOpen = false;
		return true;
	});

	function logout() {
		pb.authStore.clear();
		goto('/');
	}

	// console.log("layout rerender")
</script>

<svelte:window bind:innerWidth />

<Header expandedByDefault={true} bind:isSideNavOpen>
	<span slot="platform" class="platform-name">
		CUMaS Voting System &nbsp;<code class="code-01">v{PUBLIC_VERSION || ''}</code>
	</span>
	<HeaderUtilities>
		{#if $currentUser === null}
			<HeaderActionLink icon={Login} href="/login" />
		{:else}
			<HeaderAction icon={Logout} on:click={logout} />
		{/if}
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavMenuItem href="/adminpanel/votingcontrol">Voting Control</SideNavMenuItem>
	</SideNavItems>
</SideNav>

<slot />
