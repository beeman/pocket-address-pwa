import { useDisconnect } from '@solana/kit-plugin-wallet/react'

import { Button } from '@/components/ui/button'
import { useAppClient } from '@/features/core/data-access/use-app-client'
import { formatAddress } from '@/features/wallet/util/format-address'

import { AddressUiQrCode } from './ui/address-ui-qr-code'
import { AddressUiScanFrame } from './ui/address-ui-scan-frame'
import { useAddressUiToast } from './ui/address-ui-toast'

const canShare = 'share' in navigator

export function AddressFeatureShow({ address }: { address: string }) {
  const disconnect = useDisconnect(useAppClient())
  const copied = useAddressUiToast('Copied')

  async function copy() {
    await navigator.clipboard.writeText(address)
    navigator.vibrate?.(10)
    copied.show()
  }

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <div className="relative w-full max-w-[396px]">
        <AddressUiScanFrame />
        <div aria-label={`QR code for ${address}`} className="absolute inset-7 rounded-[20px] bg-white p-5" role="img">
          <AddressUiQrCode value={address} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Your address</span>
        <span aria-label={address} className="font-mono text-2xl font-semibold tracking-wide">
          {formatAddress(address)}
        </span>
      </div>
      <div className="flex w-full gap-3">
        <Button className="h-13 flex-1 rounded-2xl text-base font-semibold" onClick={() => void copy()}>
          Copy
        </Button>
        {canShare && (
          <Button
            className="h-13 flex-1 rounded-2xl border text-base font-semibold"
            onClick={() => void navigator.share({ text: address })}
            variant="secondary"
          >
            Share
          </Button>
        )}
      </div>
      <Button
        className="text-muted-foreground h-11"
        disabled={disconnect.isRunning}
        onClick={() => disconnect.dispatch()}
        variant="link"
      >
        Disconnect
      </Button>
      {copied.toast}
    </div>
  )
}
