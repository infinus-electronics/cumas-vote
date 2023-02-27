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
	import { goto } from '$app/navigation';
	
	// const currentStore = pb.authStore.loadFromCookie

	function logout(){
		pb.authStore.clear();
		goto("/")
	}

	// $: console.log(currentUser)
	// import { get } from 'svelte/store';
	// import { onMount } from 'svelte';
	// import type { Record, Admin } from 'pocketbase';


</script>

<Header>
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
