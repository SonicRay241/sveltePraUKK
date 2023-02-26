import { auth } from "$lib/server/lucia";
import { fail, redirect, error } from "@sveltejs/kit";
import { LuciaError } from "lucia-auth";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.validateUser()
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
                    nik,
                    level: "MASYARAKAT"
                }
            })
        } catch (err) {
            if (err instanceof LuciaError) {
                if (err.message === "AUTH_DUPLICATE_KEY_ID" || err.message === "AUTH_DUPLICATE_SESSION_ID") {
                    throw error(400, { message: "Username or NIK is already taken" })
                }
            } else {
                console.log(err);
                return fail(400, {message: "There was an error while registering user"})
            }
        }

        throw redirect(302, "/login")
    }
}