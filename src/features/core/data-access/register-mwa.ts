import {
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
  registerMwa,
} from '@solana-mobile/wallet-standard-mobile'

import { APP_IDENTITY } from './app-identity'

/**
 * Registers Mobile Wallet Adapter as a wallet-standard wallet, for Chrome on Android. Inside the
 * Solana Mobile web shell only Seeker Connect is registered, so this is skipped there.
 *
 * Call this once, before React renders.
 */
export function registerMobileWalletAdapter(): void {
  const remoteHostAuthority = import.meta.env.VITE_MWA_REMOTE_HOST_AUTHORITY

  registerMwa({
    appIdentity: APP_IDENTITY,
    authorizationCache: createDefaultAuthorizationCache(),
    chainSelector: createDefaultChainSelector(),
    chains: ['solana:mainnet'],
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
    ...(remoteHostAuthority ? { remoteHostAuthority } : {}),
  })
}
