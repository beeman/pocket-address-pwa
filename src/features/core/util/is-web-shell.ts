/** The Solana Mobile web shell appends this to its WebView user agent. */
export const WEB_SHELL_USER_AGENT = 'Solana Mobile Web Shell'

/** True when the app runs inside an APK built with `npx solana-mobile@latest webshell`. */
export function isWebShell(userAgent: string = navigator.userAgent): boolean {
  return userAgent.includes(WEB_SHELL_USER_AGENT)
}
