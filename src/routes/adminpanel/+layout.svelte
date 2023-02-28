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

	
</script>


<SideNav isOpen={$isSideBarOpenW}>
	<SideNavItems>
		<SideNavMenuItem href="/adminpanel/votingcontrol">Voting Control</SideNavMenuItem>
	</SideNavItems>
</SideNav>

<slot />
