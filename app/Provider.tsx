"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;