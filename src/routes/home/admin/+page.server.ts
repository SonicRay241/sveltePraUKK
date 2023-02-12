import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.validateUser()
	if (!session) {
		throw redirect(302, "/")
	}
    if (!(isNaN(Number(user.nik)))) {
        throw redirect(302,"/home")
    }
    return { 
        user, 
        pengaduan: prisma.pengaduan.findMany()
    }
}