"use client";

import {
  ReactNode,
  useEffect,
  useMemo,
  useState
} from "react";

import { useParams } from "next/navigation";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { DocLoader } from "@/components/modules/docLoader";
import { Navbar } from "@/components/navbar";

import { User } from "@/lib/types";

import {
  getUsers,
  getDocuments
} from "@/app/documents/[documentId]/action";

import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

export function Room({ children }: { children: ReactNode }) {

  const params = useParams()
  const Id = params.documentId

  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const usersList = await getUsers()
        setUsers(usersList)
      } catch (error) {
        toast.error("Failed to fetch users")
      }
    }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const resolveUsers = ({ userIds }: { userIds: string[] }) => {
    return userIds.map((userId) => {
      const user = users.find((user) => user.id === userId)

      if (user) {
        return {
          name: user.name,
          avatar: user.avatar
        }
      }

      return undefined
    })
  }

  const resolveMentionSuggestions = ({ text }: { text: string }) => {
    let filteredUsers = users

    if (text) {
      filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      )
    }

    return filteredUsers.map((user) => user.id)
  }

  const resolveRoomsInfo = async ({ roomIds }: { roomIds: string[] }) => {
    const documents = await getDocuments(roomIds as Id<"documents">[])

    return documents.map((document) => (
      {
        id: document.id,
        name: document.name
      }
    ))
  }

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth"
        const room = params.documentId as string

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room })
        })

        return await response.json()
      }}
      throttle={16}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
      resolveRoomsInfo={resolveRoomsInfo}
    >
      <RoomProvider
        id={Id as string}
        initialStorage={{
          leftMargin: 56,
          rightMargin: 56
        }}
      >
        <ClientSideSuspense
          fallback={
            <DocLoader
              label="Fetching your document..."
            />
          }
        >
          <Navbar />
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}