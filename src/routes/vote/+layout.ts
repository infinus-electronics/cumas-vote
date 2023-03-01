import { pb } from '$lib//pocketbase';
import type { satisfies } from 'semver';
import type { LayoutLoad } from './$types';

// /** @type {import('./$types').LayoutLoad} */
export const load = (async ({ params }) => {
	const records = await pb.collection('positions').getFullList();
	// console.log(params.id);
return { positions: records, currentSelected: params.id };
}) satisfies LayoutLoad
