"use client"
import Link from "next/link";
import Image from "next/image";

import {
    UserButton,
    OrganizationSwitcher
} from "@clerk/nextjs";

import { SearchInput } from "./search-input";

export const Navbar = () => {
    return (
        <nav className="w-full">
            {/* Mobile Layout: Two rows */}
            <div className="sm:hidden">
                {/* First row: Logo and User Controls */}
                <div className="flex items-center justify-between h-14 px-2 xs:px-3">
                    <div className="flex items-center shrink-0">
                        <OrganizationSwitcher
                            afterCreateOrganizationUrl="/"
                            afterLeaveOrganizationUrl="/"
                            afterSelectOrganizationUrl="/"
                            afterSelectPersonalUrl="/"
                            appearance={{
                                elements: {
                                    organizationSwitcherTrigger: "min-h-[40px] min-w-[40px] touch-manipulation"
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center shrink-0">
                        <UserButton 
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-7 h-7",
                                    userButtonTrigger: "min-h-[40px] min-w-[40px] touch-manipulation"
                                }
                            }}
                        />
                    </div>
                </div>
                
                {/* Second row: Search Bar */}
                <div className="px-2 xs:px-3 pb-3">
                    <SearchInput />
                </div>
            </div>

            {/* Desktop Layout: Single row */}
            <div className="hidden sm:flex items-center justify-between h-16 w-full gap-4 px-4">
                <div className="flex gap-2 items-center shrink-0 min-w-0">
                    <Link href="/" className="touch-manipulation">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={70}
                            height={70}
                            className="w-[70px] h-[70px]"
                        />
                    </Link>
                    <h3 className="text-xl font-semibold">
                        DevDocs
                    </h3>
                </div>
                <div className="flex-1 max-w-md mx-4">
                    <SearchInput />
                </div>
                <div className="flex gap-3 items-center shrink-0">
                    <OrganizationSwitcher
                        afterCreateOrganizationUrl="/"
                        afterLeaveOrganizationUrl="/"
                        afterSelectOrganizationUrl="/"
                        afterSelectPersonalUrl="/"
                    />
                    <UserButton 
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-9 h-9",
                                userButtonTrigger: "min-h-[36px] min-w-[36px]"
                            }
                        }}
                    />
                </div>
            </div>
        </nav>
    )
}