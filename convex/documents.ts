import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server"
import { mutation, query } from "./_generated/server"

export const get = query({
    args: {
        paginationOpts: paginationOptsValidator,
        search: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new Error("Unauthorized Access")
        }

        // console.log({user})

        const organizationId = (user.organization_id ?? undefined) as string | undefined

        // Search within the organization
        if (args.search && organizationId) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) =>
                    q
                        .search("title", args.search!)
                        .eq("organizationId", organizationId)
                )
                .paginate(args.paginationOpts)

        }

        // Search through personal documents
        else if (args.search) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) =>
                    q
                        .search("title", args.search!)
                        .eq("ownerId", user.subject))
                .paginate(args.paginationOpts)
        }

        // Fetch all docs of an organization
        else if (organizationId) {
            return await ctx.db
                .query("documents")
                .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
                .paginate(args.paginationOpts)
        }

        // Fetch all the personal docs (default behaviour)
        return await ctx.db
            .query("documents")
            // Allows listing of docs owned by you
            .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
            .paginate(args.paginationOpts)
            // Paginate refers to Loading a page of n results and obtain a Cursor for loading more.
    }
})

export const getById = query({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    }
})

export const getByIds = query({
    args: {
        ids: v.array(v.id("documents")),
    },
    handler: async (ctx, { ids }) => {
        const documents = []

        for (const id of ids) {
            const document = await ctx.db.get(id)

            if (document) {
                documents.push({
                    id: document._id,
                    name: document.title
                })
            } else {
                documents.push({
                    id: id,
                    name: "[Removed]"
                })
            }

        }
        return documents
    }
})

export const create = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError("Unauthorized Access")
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined

        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Document",
            ownerId: user.subject,
            organizationId,
            initialContent: args.initialContent
        })
    }
})

export const removeById = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError("Unauthorized Access")
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined

        const document = await ctx.db.get(args.id)

        if (!document) {
            throw new ConvexError("Unauthorized Access")
        }

        const isOwner = document.ownerId === user.subject
        const isOrganizationMember = document.organizationId && document.organizationId === organizationId

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("You don't seem to have proper permission to manage this document")
        }

        return await ctx.db.delete(args.id)
    }
})

export const updateById = mutation({
    args: {
        id: v.id("documents"),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError("Unauthorized Access")
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined

        const document = await ctx.db.get(args.id)

        if (!document) {
            throw new ConvexError("Unauthorized Access")
        }

        const isOwner = document.ownerId === user.subject
        const isOrganizationMember = document.organizationId && document.organizationId === organizationId

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("You don't seem to have proper permission to manage this document")
        }

        return await ctx.db.patch(args.id, {
            title: args.title
        })
    }
})