import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      id: string
      password: string
    }

    // console.log(data)


    
        const authData = await locals.pb
        .collection('users')
        .authWithPassword(data.id, data.password)
        if(authData.record === null){
            throw redirect(302, "/login");
        }
        else if(authData.record.username !== "superuser"){
            throw redirect(302, "/vote");
        }
        else{
            throw redirect(302, "/adminpanel");
        }
         
   

    // throw redirect(302, '/')
  },
}