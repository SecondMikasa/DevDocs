import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Toaster } from "@/components/ui/sonner"

import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "DevDocs",
  description: "A collabrative web based document editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
