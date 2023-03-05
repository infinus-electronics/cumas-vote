<script lang="ts">
	import { key, type contextStore } from "$lib//pocketbase";
	import { getContext } from "svelte";


    const { currentUser, pb } = getContext(key) satisfies contextStore

    currentUser.set(null);
    document.cookie = ""
    pb.authStore.clear()
    
</script>