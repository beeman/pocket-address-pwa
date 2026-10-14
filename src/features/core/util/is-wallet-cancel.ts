/** True when the user closed the wallet before approving. wallet-standard-mobile nests the MWA error in `cause`. */
export function isWalletCancel(error: unknown): boolean {
  for (let e = error; e instanceof Error; e = e.cause) {
    if ((e as Error & { code?: unknown }).code === 'ERROR_SESSION_CLOSED') {
      return true
    }
  }
  return false
}
