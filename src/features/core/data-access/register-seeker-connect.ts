import { registerSeekerConnect } from '@solana-mobile/seeker-connect-wallet-standard'

import { APP_IDENTITY } from './app-identity'

/**
 * Registers Seeker Connect as a wallet-standard wallet. It reaches the Seeker's built-in wallet
 * directly over Mobile Wallet Adapter; anywhere but a browser on the Seeker a connection attempt
 * fails with `association-failed`, and the SDK shows its own error dialog.
 *
 * Sessions are per-interaction: "connected" means a cached authorization, and Disconnect only
 * forgets it locally.
 *
 * Call this once, before React renders.
 */
export function registerSeekerConnectWallet(): void {
  registerSeekerConnect({
    chain: 'solana:mainnet',
    identity: APP_IDENTITY,
    relayDomain: 'relay.solanamobile.com',
  })
}
