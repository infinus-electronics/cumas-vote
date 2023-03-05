<script lang="ts">
	import { key, type contextStore, currentUser, pb } from '$lib//pocketbase';
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';

	// const { currentUser, pb } = getContext(key) satisfies contextStore
	onMount(() => {
		currentUser.set(null);
		document.cookie = '';
		pb.authStore.clear();
	});
</script>
