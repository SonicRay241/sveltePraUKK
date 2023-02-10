import type { PageServerLoad } from "./$types";
import { redirect, fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.validateUser()
	if (!session) {
		throw redirect(302, "/")
	}
    if (isNaN(Number(user.nik))) {
        throw redirect(302,"/home/admin")
    }
    return { 
        user, 
        pengaduan: prisma.pengaduan.findMany({
            where: {
                user_id: user.userId
            }
        })
    }
}

export const actions: Actions = {
    default:async ({ request, locals }) => {
        const { user, session } = await locals.validateUser()
        if (!( user && session) ) {
            throw redirect(302, "/")
        }

        let { titlePengaduan, isiLaporan, foto } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        const tglPengaduan = new Date()

        if (!(titlePengaduan == "" || isiLaporan == "")) {
            try {
                await prisma.pengaduan.create({
                    data: {
                        titlePengaduan,
                        tglPengaduan,
                        isiLaporan,
                        foto,
                        nik: user.nik,
                        user_id: user.userId
                    }
                })
            } catch (error) {
                console.log(error);
                return fail(500, {message: "There was an error while uploading your data"})
            }
        }
    },
}
