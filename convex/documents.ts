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

        // FIXME: Not destructuring it is some how throwing an error of args.search being undefined

        if (args.search) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) =>
                    q
                        .search("title", args.search!)
                        .eq("ownerId", user.subject))
                .paginate(args.paginationOpts)
        }

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

        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Document",
            ownerId: user.subject,
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

        const document = await ctx.db.get(args.id)

        if (!document) {
            throw new ConvexError("Unauthorized Access")
        }

        const isOwner = document.ownerId === user.subject

        if (!isOwner) {
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

        const document = await ctx.db.get(args.id)

        if (!document) {
            throw new ConvexError("Unauthorized Access")
        }

        const isOwner = document.ownerId === user.subject

        if (!isOwner) {
            throw new ConvexError("You don't seem to have proper permission to manage this document")
        }

        return await ctx.db.patch(args.id, {
            title: args.title
        })
    }
})