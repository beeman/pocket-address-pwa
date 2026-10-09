# Pocket Address

Your Solana address, ready to share. Connect the Seeker wallet with Seeker Connect and the app shows your public key as a large QR code, with Copy, Share and Disconnect. It makes no RPC calls and never asks the wallet to sign anything.

Built with React, Vite, Tailwind, shadcn/ui, Solana Kit and Seeker Connect from the `react-kit-shadcn` template of the Solana Mobile CLI. It is a PWA, and it ships inside an Android web shell for the Solana dApp Store.

## Development

```bash
bun install
bun run dev        # http://localhost:5173/
bun run ci         # lint, format check, tests and build
```

Seeker Connect only completes on a Seeker. On any other device the connect attempt fails with `association-failed` and the SDK shows its own error dialog.

## Website

GitHub Pages at https://beeman.github.io/pocket-address-pwa/ serves the app, the [privacy policy](https://beeman.github.io/pocket-address-pwa/privacy-policy/) and the [terms of service](https://beeman.github.io/pocket-address-pwa/terms-of-service/). The workflow in `.github/workflows/pages.yml` builds and deploys every push to `main`, so Pages has to be set to the "GitHub Actions" source once. The Vite `base` is relative, so the same build serves from the dev server root and from the Pages sub-path.

## Web shell

The Android app is a WebView shell generated next to this repo with the Solana Mobile CLI. The web app skips Mobile Wallet Adapter registration when the user agent contains `Solana Mobile Web Shell`, so only Seeker Connect is offered inside it.

```bash
export SOLANA_MOBILE_KEYSTORE_PASSWORD=… SOLANA_MOBILE_KEY_PASSWORD=…
npx solana-mobile@latest webshell init pocket-address-pwa-shell \
  --url http://localhost:5173/ --manifest pocket-address-pwa/public/manifest.webmanifest \
  --app-name "Pocket Address" --application-id io.github.beeman.pocketaddresspwa \
  --version-code 1 --version-name 1.0.0 --keystore-alias pocket-address-pwa --keystore-path release.keystore
npx solana-mobile@latest webshell build pocket-address-pwa-shell
adb reverse tcp:5173 tcp:5173
adb install -r pocket-address-pwa-shell/app/build/outputs/apk/release/app-release.apk
```

For a store release, point `SOLANA_MOBILE_URL` in the shell's `gradle.properties` at the Pages URL and raise `SOLANA_MOBILE_VERSION_CODE`. Every update must be signed with the same keystore.

## Branding

The SVG sources and their PNG exports live in `assets/branding/`. Re-export them with `assets/branding/export.sh` (needs `rsvg-convert`, `brew install librsvg`). `public/icon-512.png` is the store icon and `public/favicon.svg` the app icon.
