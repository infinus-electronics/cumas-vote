import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('./$types').PageLoad} */
export async function load({locals}) {
    // console.log('here')
    // console.log(locals.user)
    try{if(locals.user.id === null){
        throw redirect(302, "/login")
    }}
    catch (err) {
        console.log(err)
        throw redirect(302, "/")
    }
}