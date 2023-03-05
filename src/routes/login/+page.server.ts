import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      id: string
      password: string
    }

    // console.log(data)


    try {
        const authData = await locals.pb
        .collection('users')
        .authWithPassword(data.id, data.password)
        if(authData.record === null){
            throw redirect(303, "/login");
        }
        else if(authData.record.username !== "superuser"){
            throw redirect(303, "/vote");
        }
        else{
            throw redirect(303, "/adminpanel");
        }
         
    } catch (e) {
      console.error(e)
    //   throw redirect(303, "/login")
    }

    throw redirect(303, '/')
  },
}