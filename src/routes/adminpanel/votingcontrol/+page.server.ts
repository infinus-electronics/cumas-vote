import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (({locals}) => {
    // console.log('here')
    // console.log(locals.user)
    try{
        if(locals.user === null){
            throw redirect(302, "/login")
        } else if (!(locals.user.role === "moderator" || locals.user.role === "admin")){
            // console.log("here")
            throw redirect(302, "/vote")
        }
    }
    catch (err) {
        throw(err)
    }
    
}) satisfies PageServerLoad