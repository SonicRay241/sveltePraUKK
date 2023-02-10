import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session} = await locals.validateUser()
    if ( session ) {
        throw redirect(302, "/home")
    }
    return { 
        creds: prisma.user.findMany()
     }
}

export const actions: Actions = {
    default:async ({ request }) => {
        const { name, username, password, telepon, nik } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        try {
            await auth.createUser({
                key: {
                    providerId: "username",
                    providerUserId: username,
                    password
                },
                attributes: {
                    name,
                    username,
                    telepon,
                    nik
                }
            })
        } catch (err) {
            console.log(err);
            return fail(400, {message: "There was an error while registering user"})
        }

        throw redirect(302, "/login")
    }
}