import type { LayoutServerLoad } from './$types';
import uuid from 'uuid';
import { setContext } from 'svelte';
import { writable } from 'svelte/store';
// import { pb, currentUser } from '$lib//pocketbase';

export const load = (({locals}) => {
	// const currentUser = writable(pb.authStore.model);
	return{
		// localUser: locals.pb.authStore.model
	}    
	
}) satisfies LayoutServerLoad;
