import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    // console.log('here')
    // console.log(locals.user)
    try{
        if(locals.user === null){
            throw redirect(302, "/login")
        } else if (!(locals.user.role !== "moderator" || locals.user.role !== "admin")){
            throw redirect(302, "/vote")
        }
    }
    catch (err) {
        throw(err)
    }
    
}