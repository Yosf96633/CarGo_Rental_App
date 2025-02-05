import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface SessionProviderProp {
  children: ReactNode;
}

const SessionWrapper = ({ children }: SessionProviderProp) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
