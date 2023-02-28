import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { satisfies } from 'semver';
import type { LayoutServerLoad } from './$types';

// /** @type {import('./$types').LayoutLoad} */
export const load = (async ({locals}) => {
    // console.log('here')
    // console.log(locals.user)
    try{
        if(locals.user !== null){
            if(locals.user.role === "moderator"){
                return {
                    sudo: true
                }
            }
            else{
                return {
                    sudo: false
                }
            }
        }
        else{
            return {
                sudo: false
            }
        }
    }
    catch (err) {
        throw(err)
    }
    
}) satisfies LayoutServerLoad