import { ClerkProvider } from "@clerk/clerk-react";
import type { PropsWithChildren } from "react";

import { appEnv } from "@/lib/env";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  if (!appEnv.enableAuth) {
    return children;
  }

  if (!appEnv.clerkPublishableKey) {
    throw new Error(
      "Missing VITE_CLERK_PUBLISHABLE_KEY while auth is enabled.",
    );
  }

  return (
    <ClerkProvider
      publishableKey={appEnv.clerkPublishableKey}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
};
