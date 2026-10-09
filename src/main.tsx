import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app'
import { registerMobileWalletAdapter } from '@/features/core/data-access/register-mwa'
import { registerSeekerConnectWallet } from '@/features/core/data-access/register-seeker-connect'

import './global.css'

// Wallets have to join the wallet-standard registry before anything reads from it.
// Inside the web shell only Seeker Connect is offered; MWA stays for plain browsers.
if (!navigator.userAgent.includes('Solana Mobile Web Shell')) {
  registerMobileWalletAdapter()
}
registerSeekerConnectWallet()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
