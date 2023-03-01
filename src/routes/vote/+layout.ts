import { pb } from '$lib//pocketbase';
import type { satisfies } from 'semver';
import type { LayoutLoad } from './$types';

// /** @type {import('./$types').LayoutLoad} */
export const load = (async ({ params }) => {
	const positions = await pb.collection('positions').getFullList({
		sort: '+sequence',
	});
	const conamends = await pb.collection('conamends').getFullList({
		sort: '+sequence,title',
	});
	console.log(conamends)
	return { positions: positions, conamends: conamends, currentSelected: params.id };
}) satisfies LayoutLoad
