import { createClient } from '@solana/kit'
import { walletSigner } from '@solana/kit-plugin-wallet'

/**
 * The app only reads the connected account's address, so the client carries the wallet plugin and
 * nothing else: no RPC, no subscriptions, no transaction planning.
 */
export function createSolanaClient() {
  return createClient().use(walletSigner({ chain: 'solana:mainnet' }))
}

export type AppClient = ReturnType<typeof createSolanaClient>
