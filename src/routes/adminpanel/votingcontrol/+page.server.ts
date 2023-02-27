import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    // console.log('here')
    // console.log(locals.user)
    if(!(locals.user.role !== "moderator" || locals.user.role !== "admin")){
        throw redirect(302, "/vote")
    }
}