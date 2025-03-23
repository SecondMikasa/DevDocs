import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./documentInput"
import { NavbarMenu } from "./navbarMenu"

import {
    UserButton,
    OrganizationSwitcher
} from "@clerk/nextjs";

export const Navbar = () => {
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
                    <DocumentInput />
                    <NavbarMenu />
                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">
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