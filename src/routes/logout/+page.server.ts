// import type { satisfies } from "semver";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (({locals}) => {
    locals.pb.authStore.clear()
    throw redirect(300, "/")
}) satisfies PageServerLoad