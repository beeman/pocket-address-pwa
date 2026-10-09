import { useConnectedWallet, useIsWalletReady } from '@solana/kit-plugin-wallet/react'

import { useAppClient } from '@/features/core/data-access/use-app-client'

import { AddressFeatureConnect } from './address-feature-connect'
import { AddressFeatureShow } from './address-feature-show'

/**
 * One screen, two states: connect, or show the connected account's address as a QR code. A small
 * privacy policy link sits at the bottom of both.
 */
export function AddressFeature() {
  const client = useAppClient()
  const connected = useConnectedWallet(client)
  const isReady = useIsWalletReady(client)

  return (
    <div className="flex min-h-svh flex-col items-center px-8 py-6">
      <main className="flex w-full max-w-sm flex-1 flex-col items-center justify-center">
        {connected ? (
          <AddressFeatureShow address={connected.account.address} />
        ) : (
          // Held blank until the silent reconnect settles, so a remembered wallet never flashes the connect screen.
          isReady && <AddressFeatureConnect />
        )}
      </main>
      <a className="text-muted-foreground py-3 text-sm" href="privacy-policy/">
        Privacy policy
      </a>
    </div>
  )
}
