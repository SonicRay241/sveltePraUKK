import { auth } from "$lib/server/lucia"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session} = await locals.validateUser()
	if (session) {
		throw redirect(302, "/home")
	}
    return { user }
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { username, password } = Object.fromEntries(
			await request.formData(),
		) as Record<string, string>

		try {
			const key = await auth.validateKeyPassword("username", username, password)
			const session = await auth.createSession(key.userId)
			locals.setSession(session)
		} catch (err) {
			console.error(err)
			return fail(400, { message: "Could not login user." })
		}
		throw redirect(302, "/home")
	},
}