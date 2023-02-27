<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib//pocketbase';
	import { AspectRatio, Button, Column, Content, Grid, Row } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import CumasLogo from '../components/CumasLogo.svelte';

	// onMount(() => {
	// 	const user = get(currentUser);
	// 	console.log(user);
	// 	if (user === null) {
	// 		goto('/login');
	// 	}
	// });
</script>

<Content>
    <Grid padding>
        <Row>
            <Column></Column>
            <Column aspectRatio="1x1">
                
                    <CumasLogo></CumasLogo>
                
            </Column>
            <Column></Column>
        </Row>
        
    </Grid>
	
</Content>
