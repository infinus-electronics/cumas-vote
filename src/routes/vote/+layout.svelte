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
	import { isSideBarOpenW } from '$lib//navBarStore';

	/** @type {import('./$types').LayoutData} */
	export let data;



	function logout() {
		pb.authStore.clear();
		goto('/');
	}

	// console.log("layout rerender")
</script>

<!-- <svelte:window bind:innerWidth /> -->

<!-- <Header expandedByDefault={true}   bind:isSideNavOpen>
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
</Header> -->

<SideNav isOpen={$isSideBarOpenW}>
	<SideNavItems>
		{#each data.positions as position}
			<SideNavMenuItem
				id={position.id}
				isSelected={data.currentSelected === position.id}
				href="/vote/positions/{position.id}"
				data-sveltekit-preload-data="tap">{position.title}</SideNavMenuItem
			>
		{/each}
	</SideNavItems>
</SideNav>

<slot />
