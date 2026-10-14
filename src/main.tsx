import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app'
import { registerMobileWalletAdapter } from '@/features/core/data-access/register-mwa'

import './global.css'

// Wallets have to join the wallet-standard registry before anything reads from it.
registerMobileWalletAdapter()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
