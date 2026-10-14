import {
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
  registerMwa,
} from '@solana-mobile/wallet-standard-mobile'

import { APP_IDENTITY } from './app-identity'

/**
 * Registers Mobile Wallet Adapter as a wallet-standard wallet, for Chrome on Android, Trusted Web
 * Activities and the Solana Mobile web shell (the library recognizes the shell by its user agent).
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
