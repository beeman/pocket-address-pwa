import { AppProviders } from '@/features/core/data-access/app-providers'
import { AddressFeature } from '@/features/address/address-feature'

export function App() {
  return (
    <AppProviders>
      <AddressFeature />
    </AppProviders>
  )
}
