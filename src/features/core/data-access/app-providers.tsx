import { ClientProvider } from '@solana/react'
import type { ReactNode } from 'react'

import { createSolanaClient } from './create-solana-client'

// Built once at module scope: the config never changes, and `ClientProvider` wants a stable reference.
const client = createSolanaClient()

export function AppProviders({ children }: { children: ReactNode }) {
  return <ClientProvider client={client}>{children}</ClientProvider>
}
