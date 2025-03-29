"use client"
import Image from "next/image"
import Link from "next/link"

import {
    UserButton,
    OrganizationSwitcher
} from "@clerk/nextjs";

import { DocumentInput } from "./documentInput"
import { NavbarMenu } from "./navbarMenu"
import { Avatars } from "./avatar";
import { Inbox } from "./inbox";

import { NavigationProps } from "@/lib/types";

const Navbar = ({
    data
}: NavigationProps) => {
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