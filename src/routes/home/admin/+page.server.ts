import type { PageServerLoad } from "./$types";
import { redirect, fail, type Actions, error } from "@sveltejs/kit";
import type { Status } from "@prisma/client";
import { LuciaError } from "lucia-auth";
import { auth } from "$lib/server/lucia";


export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.validateUser()
	if (!session) {
		throw redirect(302, "/")
	}
    if (user.level === "MASYARAKAT") {
        throw redirect(302,"/home")
    }
    if (user.nik !== user.userId) {
        try {
            await prisma.user.update({
                where: {id: user.userId},
                data: {
                    nik: user.userId
                }
            })
        } catch (err){
            console.log(err);
            return fail(500, {message: "There was an error while verifying"})
        }
    }
    return { 
        user, 
        pengaduan: prisma.pengaduan.findMany(),
        tanggapan: prisma.tanggapan.findMany()
    }
}

export const actions: Actions = {
    beriTanggapan: async ({ request, locals }) => {
        const { user, session } = await locals.validateUser()
        if (!( user && session) ) {
            throw redirect(302, "/")
        }

        let { isiTanggapan, selectedStatus, pengaduanId } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
            
        const tglTanggapan = new Date()

        if (!(isiTanggapan == "" || selectedStatus == "NULL")) {
            try {
                await prisma.tanggapan.create({
                    data: {
                        idPengaduan: Number(pengaduanId),
                        tglTanggapan: tglTanggapan,
                        tanggapan: isiTanggapan,
                        petugasId: user.userId
                    } 
                })
                await prisma.pengaduan.update({
                    where: { id: Number(pengaduanId) },
                    data: {
                        status: selectedStatus as Status
                    }
                })

            } catch (error) {
                console.log(error);
                return fail(500, {message: "There was an error while uploading your data"})
            }
        }
    },

    updateTanggapan: async ({ request, locals }) => {
        const { user, session } = await locals.validateUser()
        if (!( user && session) ) {
            throw redirect(302, "/")
        }

        let { isiTanggapan, selectedStatus, pengaduanId } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
            
        const tglTanggapan = new Date()

        if (!(isiTanggapan == "" || selectedStatus == "NULL")) {
            try {
                await prisma.tanggapan.update({
                    where: {
                        idPengaduan: Number(pengaduanId)
                    },
                    
                    data: {
                        tanggapan: isiTanggapan,
                        tglTanggapan,
                        petugasId: user.userId
                    }
                })

                await prisma.pengaduan.update({
                    where: { id: Number(pengaduanId) },
                    data: {
                        status: selectedStatus as Status
                    }
                })

            } catch (error) {
                console.log(error);
                return fail(500, {message: "There was an error while uploading your data"})
            }
        }
    },

    register:async ({ request, locals }) => {
        const { user, session } = await locals.validateUser()
        if (!( user && session) ) {
            throw redirect(302, "/")
        }

        let { name, username, password, telepon, nik, role } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        if (nik === undefined || nik === "") { nik = username }

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
                    nik: nik,
                    level: role
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
    }
}