import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (({locals}) => {
    // console.log('here')
    // // console.log(locals.pb.authStore.model)
    // try{
        if(locals.pb.authStore.model === null){
            throw redirect(302, "/login")
        } else if (!(locals.pb.authStore.model.role === "moderator" || locals.pb.authStore.model.role === "admin")){
            // console.log("here")
            throw redirect(302, "/vote")
        }
        // else {
        //     throw redirect(302, "/")
        // }
    // }
    // catch (err) {
    //     throw(err)
    // }

    
    
}) satisfies PageServerLoad