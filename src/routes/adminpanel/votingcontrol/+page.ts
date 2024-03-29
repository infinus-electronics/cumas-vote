import { pb } from '$lib//pocketbase';
import type { PageLoad } from './$types';
import type { Record } from 'pocketbase';

export const prerender = false
export const ssr = false;
export const csr = true;

// type voteMapElementType = Map<String, Number>

export const load = (async () => {
	let positions: Record[];
	let conamends: Record[];
	let polls: Record[];
	let runners: Record[];
    let names = new Map();

	// console.log("load")

	try {
		positions = await pb.collection('positions').getFullList({ sort: '+sequence' });
		conamends = await pb.collection('conamends').getFullList({ sort: '+sequence,title' });
		runners = await pb.collection('candidates').getFullList();
		// console.log(runners)
		polls = await pb.collection('polls').getFullList();
	} catch (err) {
		throw err;
	}

	//begin processing data here
	let voteResults = new Map([
		['positions', new Map<String, Map<String, number>>()],
		['conamends', new Map<String, Map<String, number>>()]
	]);



	try {
        runners.forEach((e)=>{
            names.set(e.id, e.first_name.concat(", ").concat(e.last_name))
        })
        // console.log(names)
		positions.forEach(async (pos, i) => {
			// console.log("positions")
			let positionMap = voteResults.get('positions');
			let currentPositionMap = new Map();
			runners.forEach((candidate) => {
				if (candidate.contesting?.includes(pos.id)) {
					currentPositionMap.set(candidate.id, 0);
				}
			});
			currentPositionMap.set('RON', 0);
			positionMap?.set(pos.title, currentPositionMap);
		});
		conamends.forEach((ca, i) => {
			// console.log(conamends)
			let caMap = voteResults.get('conamends');
			let currentCAMap = new Map([
				['Yes', 0],
				['No', 0]
			]);
			caMap?.set(ca.title, currentCAMap);
		});
		polls.forEach((poll) => {
			let thisVote = poll.vote;
			// console.log(thisVote);
			if (thisVote.positions !== null) {
				const votePos: Object = thisVote.positions || null;
				let positionMap = voteResults.get('positions');
				if(votePos !== null){
					for (const [role, choice] of Object.entries(votePos)) {
						let currentRole = positionMap?.get(role);
						let currentVal = currentRole?.get(choice);
						currentRole?.set(choice, currentVal! + 1);
					}
				}
				
			}
			if (thisVote.conamends !== null) {
				const voteCA: Object = thisVote.conamends || null;
                let caMap = voteResults.get("conamends");
				if (voteCA !== null){
					for (const [ca, choice] of Object.entries(voteCA)) {
						let currentCA = caMap?.get(ca);
						let currentVal = currentCA?.get(choice);
						currentCA?.set(choice, currentVal! + 1);
					}
				}
                

			}
		});
	} catch (err) {
		throw err;
	}

	// console.log(voteResults);

	return {
		positions: positions,
		conamends: conamends,
		polls: polls,
        voteResults: voteResults,
        names: names,
	};
}) satisfies PageLoad;
