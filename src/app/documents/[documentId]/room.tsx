"use client";

import { ReactNode } from "react";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { useParams } from "next/navigation";

import { DocLoader } from "@/components/modules/docLoader";

export function Room({ children }: { children: ReactNode }) {

  const liveblocksApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY

  const params = useParams()
  const Id = params.documentId

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider id={Id as string}>
        <ClientSideSuspense fallback={<DocLoader label="Fetching your document..."/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}