<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { key, type contextStore, currentUser, pb } from '$lib//pocketbase';
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';

	// const { currentUser, pb } = getContext(key) satisfies contextStore
	// invalidateAll();
</script>
