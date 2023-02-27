<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib//pocketbase';
	import { Content } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		const user = get(currentUser);
		console.log(user);
		if (user === null) {
			goto('/login');
		}
	});
</script>

<Content>
	{#if $currentUser}
		<p>Signed in as {$currentUser.username}</p>
	{/if}
</Content>
