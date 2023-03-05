import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load= (async ({ locals }) => {
    console.log("logout")
    locals.pb.authStore.clear()
    locals.user = null
    throw redirect(302, '/')
  }
) satisfies PageServerLoad