"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
    UserButton,
    OrganizationSwitcher
} from "@clerk/nextjs"

import { DocumentInput } from "./documentInput"
import { NavbarMenu } from "./navbarMenu"
import { Avatars } from "./avatar"
import { Inbox } from "./inbox"

import { NavbarProps } from "@/lib/types"

import { api } from "../../../../../convex/_generated/api"

import { useMutation } from "convex/react"

import { toast } from "sonner"

const Navbar = ({
    data
}: NavbarProps) => {

    const router = useRouter()
    const mutation = useMutation(api.documents.create)

    const onNewDocument = () => {
        mutation({
            title: "Untitled Document",
            initialContent: ""
        })
            .catch(() => toast.error("Some unknown error crept in while creating your document"))
            .then((id) => {
                toast.success("Document created successfully")
                router.push(`/documents/${id}`)
            })
    }

    return (
        <nav
            className="flex items-center justify-between"
        >
            <div
                className="flex gap-2 items-center"
            >
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={70}
                        height={70}
                    />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput
                        title={data.title}
                        id={data._id}
                    />
                    <NavbarMenu
                        data={data}
                        handleNewDocument={onNewDocument}
                    />
                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">
                <Avatars />
                <Inbox />
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    )
}

export default Navbar