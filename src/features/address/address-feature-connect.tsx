import { defineSeekerConnectElements, type SeekerConnectButtonVariant } from '@solana-mobile/seeker-connect-ui'
import { SeekerConnectWalletName } from '@solana-mobile/seeker-connect-wallet-standard'
import { useConnect, useWallets } from '@solana/kit-plugin-wallet/react'

import { useAppClient } from '@/features/core/data-access/use-app-client'

import { SCAN_FRAME_PATH } from './ui/address-ui-scan-frame'

// The element ships presentational-only, so it has to be registered before it can render.
defineSeekerConnectElements()

declare module 'react' {
  // Reopening the JSX namespace is the only way to type a custom element as an intrinsic tag.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'seeker-connect-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        disabled?: boolean
        variant?: SeekerConnectButtonVariant
      }
    }
  }
}

export function AddressFeatureConnect() {
  const client = useAppClient()
  const connect = useConnect(client)
  const seeker = useWallets(client).find((wallet) => wallet.name === SeekerConnectWalletName)

  return (
    <div className="flex flex-col items-center gap-6">
      <svg aria-hidden className="size-24" viewBox="0 0 100 100">
        <path d={SCAN_FRAME_PATH} fill="none" stroke="var(--accent)" strokeLinecap="round" strokeWidth={8} />
        <rect fill="var(--accent)" height={28} rx={6} width={28} x={36} y={36} />
      </svg>
      <div className="flex flex-col items-center gap-2.5">
        <h1 className="text-3xl font-bold tracking-tight">Pocket Address</h1>
        <p className="text-muted-foreground text-center text-lg">Your Solana address, ready to share</p>
      </div>
      <seeker-connect-button
        className="mt-6"
        disabled={!seeker || connect.isRunning}
        onClick={() => seeker && connect.dispatch(seeker)}
        variant="connect"
      />
      {/* The space is reserved so the layout does not jump when the line appears. */}
      <p className="text-muted-foreground text-sm">{connect.error ? 'Could not connect. Please try again.' : ' '}</p>
    </div>
  )
}
