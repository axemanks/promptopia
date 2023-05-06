"use client";

import { SessionProvider } from 'next-auth/react';

// auth provider
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider