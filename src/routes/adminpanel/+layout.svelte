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
	import { key, type contextStore, pb, currentUser } from '$lib//pocketbase';
	import { PUBLIC_VERSION } from '$env/static/public';
	import { Login, Logout } from 'carbon-icons-svelte';
	import { isSideBarOpenW } from '$lib//navBarStore';
	import { getContext } from 'svelte';

	// const { currentUser, pb, isSideBarOpenW } = getContext(key) satisfies contextStore;
</script>

<SideNav isOpen={$isSideBarOpenW}>
	<SideNavItems>
		<div class="username">
			<p>Welcome</p>

			<h3>{$currentUser?.username}</h3>
		</div>

		<SideNavDivider />
		<SideNavMenuItem href="/adminpanel/votingcontrol">Polls</SideNavMenuItem>
		<SideNavMenuItem href="/adminpanel/candidatecontrol">Candidates</SideNavMenuItem>
		<SideNavMenuItem href="/adminpanel/positioncontrol">Positions</SideNavMenuItem>
		<SideNavMenuItem href="/adminpanel/adminutils">Utilities</SideNavMenuItem>
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
