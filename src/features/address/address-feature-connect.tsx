import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'
import { useConnect, useWallets } from '@solana/kit-plugin-wallet/react'

import { Button } from '@/components/ui/button'
import { useAppClient } from '@/features/core/data-access/use-app-client'
import { isWalletCancel } from '@/features/core/util/is-wallet-cancel'
import { isWebShell } from '@/features/core/util/is-web-shell'

import { SCAN_FRAME_PATH } from './ui/address-ui-scan-frame'

export function AddressFeatureConnect() {
  const client = useAppClient()
  const connect = useConnect(client)
  const mwa = useWallets(client).find((wallet) => wallet.name === SolanaMobileWalletAdapterWalletName)

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <svg aria-hidden className="size-24" viewBox="0 0 100 100">
        <path d={SCAN_FRAME_PATH} fill="none" stroke="var(--accent)" strokeLinecap="round" strokeWidth={8} />
        <rect fill="var(--accent)" height={28} rx={6} width={28} x={36} y={36} />
      </svg>
      <div className="flex flex-col items-center gap-2.5">
        <h1 className="text-3xl font-bold tracking-tight">Pocket Address</h1>
        <p className="text-muted-foreground text-center text-lg">Your Solana address, ready to share</p>
      </div>
      <Button
        className="mt-6 h-13 w-full rounded-2xl text-base font-semibold"
        disabled={!mwa || connect.isRunning}
        onClick={() => mwa && connect.dispatch(mwa)}
      >
        Connect wallet
      </Button>
      {/* The space is reserved so the layout does not jump when the line appears. */}
      <p className="text-muted-foreground text-sm">
        {connect.error && !isWalletCancel(connect.error) ? 'Could not connect. Please try again.' : ' '}
      </p>
      {isWebShell() ? (
        <p className="text-accent rounded-full border border-current px-3 py-1 text-xs font-medium">
          Running inside a Solana Mobile web shell
        </p>
      ) : null}
    </div>
  )
}
