import type { PageServerLoad } from "./$types";
import { redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session} = await locals.validateUser()
	if (!session) {
		throw redirect(302, "/")
	}
    return { user }
}

// export const actions: Actions = {
//     default:async ({ request }) => {
//         const {  }
//     }
// }
