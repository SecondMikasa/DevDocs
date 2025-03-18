"use client";
import { ReactNode } from "react";

//FIXME: If any unknown error occurs pnpm i @clerk/clerk-react and replace @clerk/nextjs with @clerk/clerk-react

//NOTE: Okay using @clerk/nextjs instead of @clerk/clerk-react indeed causes some unknown errors

//NOTE: Setting routing to be hash fixes the error without needing to rely on @clerk/clerk-react 

import {
  ClerkProvider,
  useAuth,
  SignIn
} from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading
} from "convex/react";

import {Loader} from "@/components/modules/loader"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}>

        <Authenticated>
          {children}
        </Authenticated>

        <Unauthenticated>
          <div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center rounded shadow-lg"
          >
            <SignIn
              routing="hash"
            />
          </div>
        </Unauthenticated>

        <AuthLoading>
          <Loader
            label="Trying to get you back in..."
          />
        </AuthLoading>

      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}