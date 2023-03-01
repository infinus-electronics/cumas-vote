import { pb } from "$lib//pocketbase";
import type { PageLoad } from "./$types";
import type { Record } from "pocketbase";

export const load = (async () => {

    let positions: Record[];
    let conamends: Record[];

    // console.log("load")

    try {
        const positions = await pb.collection('positions').getFullList({sort: '+sequence',});
        const conamends = await pb.collection('conamends').getFullList({sort: '+sequence,title',});
        const polls = await pb.collection('polls').getFullList();

        return{
            positions: positions,
            conamends: conamends,
            polls: polls,
        }


    } catch (err) {
        throw err
    }
}) satisfies PageLoad