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
		SideNavMenuItem
	} from 'carbon-components-svelte';
	import { key } from '$lib//pocketbase';
	import { PUBLIC_VERSION } from '$env/static/public';
	import { Login, Logout } from 'carbon-icons-svelte';
	// import { isSideBarOpenW } from '$lib//navBarStore';
	import { getContext } from 'svelte';

	const { currentUser, pb, isSideBarOpenW } = getContext(key)
</script>

<SideNav isOpen={$isSideBarOpenW}>
	<SideNavItems>
		<div class="username">
			<p>Welcome</p>

			<h3>{$currentUser?.username}</h3>
		</div>

		<SideNavDivider />
		<SideNavMenuItem href="/adminpanel/votingcontrol">Polls</SideNavMenuItem>
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
