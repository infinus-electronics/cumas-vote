export const ssr = false;
export const csr = true;
// import { satisfies } from "semver";
import type { PageLoad } from "./$types";
// /** @type {import('./$types').PageLoad} */
export const load = (({ params }) => {
	// const records = await pb.collection('positions').getOne(params.id);
	// console.log(params.id);
	return { currentSelected: params.id };
}) satisfies PageLoad
