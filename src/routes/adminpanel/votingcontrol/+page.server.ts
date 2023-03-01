import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { PageServerLoad } from './$types';
// import type { PageServerLoad } from './$types';

// /** @type {import('./$types').PageServerLoad} */
export const load = (({locals}) => {
    // console.log('here')
    // console.log(locals.user)
    try{
        if(locals.user?.role === null){
            throw redirect(302, "/login")
        } else if (!(locals.user!.role === "moderator" || locals.user!.role === "admin")){
            throw redirect(302, "/vote")
        }
    }
    catch (err) {
        throw(err)
    }
    
}) satisfies PageServerLoad