import { pb } from '$lib//pocketbase';

/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {
	const records = await pb.collection('positions').getFullList();
	console.log(params.id);
	return { positions: records, currentSelected: params.id };
}
