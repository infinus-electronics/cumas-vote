<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import {
		Header,
		HeaderAction,
		HeaderActionLink,
		HeaderUtilities,
		SideNav,
		SideNavDivider,
		SideNavItems,
		SideNavLink,
		SideNavMenuItem,
		Tile
	} from 'carbon-components-svelte';
	// import { currentUser, pb } from '$lib//pocketbase';
	import { key, currentUser, pb } from '$lib//pocketbase';
	import { PUBLIC_VERSION } from '$env/static/public';
	import { Login, Logout } from 'carbon-icons-svelte';
	import { isSideBarOpenW } from '$lib//navBarStore';
	import type { LayoutData } from './$types';
	import { getContext, onMount } from 'svelte';
	import type {contextStore} from "$lib/pocketbase";
	import {NewTab} from "carbon-icons-svelte";
	import { get } from 'svelte/store';


	export let data: LayoutData;

	$: console.log($isSideBarOpenW)

	// const { currentUser, pb, isSideBarOpenW } = getContext(key) satisfies contextStore;

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

<SideNav bind:isOpen={$isSideBarOpenW}>
	<SideNavItems>
		<div class="username">
			<p>Welcome</p>

			<h3>{$currentUser?.username}</h3>
		</div>

		<SideNavDivider />
		{#each data.positions as position}
			<SideNavMenuItem
				id={position.id}
				isSelected={data.currentSelected === position.id}
				href="/vote/positions/{position.id}"
				data-sveltekit-preload-data="tap">{position.title}</SideNavMenuItem
			>
		{/each}
		{#each data.conamends as conamend}
			<SideNavMenuItem
				id={conamend.id}
				isSelected={data.currentSelected === conamend.id}
				href="/vote/conamends/{conamend.id}"
				data-sveltekit-preload-data="tap">{conamend.title}</SideNavMenuItem
			>
		{/each}
		<SideNavDivider />
			<SideNavItems>
				{#each data.candidates as candidate}
					<SideNavMenuItem
						id={candidate.id}
						isSelected = {data.currentSelected === candidate.id}
						href="/vote/manifesto/{candidate.id}"
						data-sveltekit-preload-data="tap">Manifesto: {candidate.first_name}, {candidate.last_name}</SideNavMenuItem>
				{/each}
			</SideNavItems>
		<SideNavDivider />
		<SideNavLink text="Anonymous Q&A" href="https://app.sli.do/event/bqjuQXb1XxSYu7T7KFfxBV" target="_blank" icon={NewTab}></SideNavLink>
	</SideNavItems>
</SideNav>

<slot />

<style>
	div.username {
		outline: 2px solid rgba(0, 0, 0, 0);
		outline-offset: -2px;
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.28572;
		letter-spacing: 0.16px;
		position: relative;
		display: flex;
		flex-flow: column;
		min-height: 2rem;
		align-items: start;
		padding: 0 1rem;
		text-decoration: none;
		overflow: hidden;
	}
</style>
