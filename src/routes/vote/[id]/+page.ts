export const ssr = false;
export const csr = true;
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	// const records = await pb.collection('positions').getOne(params.id);
	// console.log(params.id);
	return { currentSelected: params.id };
}
