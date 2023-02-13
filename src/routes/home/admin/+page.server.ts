import type { PageServerLoad } from "./$types";
import { redirect, fail, type Actions } from "@sveltejs/kit";


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
        pengaduan: prisma.pengaduan.findMany(),
        tanggapan: prisma.tanggapan.findMany()
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { user, session } = await locals.validateUser()
        if (!( user && session) ) {
            throw redirect(302, "/")
        }

        let { isiTanggapan, selectedStatus } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        const tglPengaduan = new Date()

        // if (!(isiTanggapan == "" || selectedStatus == "NULL")) {
        //     try {
        //         await prisma.tanggapan.create({
        //             data: {
                        
        //             }
        //         })
        //     } catch (error) {
        //         console.log(error);
        //         return fail(500, {message: "There was an error while uploading your data"})
        //     }
        // }
    }
}