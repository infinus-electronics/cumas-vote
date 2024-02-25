export const prerender = false
export const ssr = false;
export const csr = true;

import { pb } from '$lib//pocketbase';
import type { LayoutLoad } from './$types';
// import { getContext } from 'svelte';

// /** @type {import('./$types').LayoutLoad} */
export const load = (async ({ params }) => {
	// const {pb} = getContext(key)
	const positions = await pb.collection('positions').getFullList({
		sort: '+sequence',
	});
	const conamends = await pb.collection('conamends').getFullList({
		sort: '+sequence,title',
	});
	const candidates = await pb.collection('candidates').getFullList({
		sort: "+contesting"
	})
	// console.log(conamends)
	return { positions: positions, conamends: conamends, candidates: candidates,currentSelected: params.id };
}) satisfies LayoutLoad
