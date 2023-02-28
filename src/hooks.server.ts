// import PocketBase from 'pocketbase';
// // import type { Handle } from '@sveltejs/kit';

// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//     event.locals.pb = new PocketBase('https://vote.cumas.org');

//     // load the store data from the request cookie string
//     event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

//     try {
//         // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
//         event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
//         console.log(event.locals.pb.authStore)
//     } catch (_) {
//         // clear the auth store on failed refresh
//         event.locals.pb.authStore.clear();
//     }

//     const response = await resolve(event);

//     // send back the default 'pb_auth' cookie to the client with the latest store state
//     response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

//     return response;
// }

import { pb } from '$lib/pocketbase'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // before
  pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
  console.log("handle")
  if (pb.authStore.isValid) {
    try {
      await pb.collection('users').authRefresh()
    } catch (_) {
      pb.authStore.clear()
    }
  }

  event.locals.pb = pb
  event.locals.user = structuredClone(pb.authStore.model)

  const response = await resolve(event)

  // after
  response.headers.set(
    'set-cookie',
    pb.authStore.exportToCookie({ httpOnly: false })
  )

  return response
}