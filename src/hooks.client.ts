import { currentUser, pb } from '$lib/pocketbase'


pb.authStore.loadFromCookie(document.cookie)
currentUser.set(pb.authStore.model)
pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model)
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
  console.log('authChanged')
})