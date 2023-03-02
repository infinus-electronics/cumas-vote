// import PocketBase from 'pocketbase';
// import { writable } from 'svelte/store';

// 	export const pb = new PocketBase('https://vote.cumas.org');

//     export const currentUser = writable(pb.authStore.model);

//     pb.authStore.onChange((auth) => {
//         console.log('authStore changed', auth);
//         currentUser.set(pb.authStore.model);
//     });

    import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'


export const pb = new PocketBase('https://vote.cumas.org')

export const currentUser = writable(pb.authStore.model)

export const key = Symbol()


// export const uuid1 = uuid.v4()

