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

import { User } from "@/lib/types";
import { getUsers } from "@/app/documents/[documentId]/action";

import { toast } from "sonner";
import { Navbar } from "@/components/navbar";

export function Room({ children }: { children: ReactNode }) {
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

  const params = useParams()
  const Id = params.documentId

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      throttle={16}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider
        id={Id as string}
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