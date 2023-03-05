import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { satisfies } from 'semver';
import type { PageServerLoad } from './$types';

export const load = (({locals}) => {
    // console.log('here')
    // console.log(locals.user)
    if(locals.pb.authStore.model!.id === null){
        throw redirect(302, "/login")
    }
    // catch (err) {
    //     console.log(err)
        // throw redirect(302, "/")
    // }
}) satisfies PageServerLoad