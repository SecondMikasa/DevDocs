import { Liveblocks } from "@liveblocks/node"

import { ConvexHttpClient } from "convex/browser"
import { useQuery } from "convex/react"

import { api } from "../../../convex/_generated/api"

import { auth, currentUser } from "@clerk/nextjs/server"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!
})

export async function POST(req: Request) {
    const { sessionClaims } = await auth()

    if (!sessionClaims) {
       return new Response("Unauthorized Access", { status: 401 }) 
    }

    const user = await currentUser()

    if (!user) {
        return new Response("Unauthorized Access", { status: 401 })
    }

    const { room } = await req.json()

    const document = await convex.query(api.documents.getById, {
        id: room
    })

    if (!document) {
        return new Response("Document not found", { status: 401 })
    }

    const isOwner = document.ownerId === user.id
    const isOrganizationMember = document.organizationId === sessionClaims.org_id

    if (!isOwner && !isOrganizationMember) {
        return new Response("You don't seem to have proper permission to manage this document", { status: 401 })
        
        // FIXME: Allow for READ_ACCESS
        // const session = liveblocks.prepareSession(user?.id, {
        //     userInfo: {
        //         name: "Anonymous",
        //         avatar: null
        //     }
        // })
    }

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name: user.fullName ?? "Anonymous",
            avatar: user.imageUrl
        }
    })

    session.allow(room, session.FULL_ACCESS)

    const { body, status } = await session.authorize()

    return new Response(body, { status })
}