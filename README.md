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

`shell/` is the Android WebView app for the Solana dApp Store, generated with `npx solana-mobile@latest webshell init` and committed as is. It opens the Pages URL. The web app skips Mobile Wallet Adapter registration when the user agent contains `Solana Mobile Web Shell`, so only Seeker Connect is offered inside it.

```bash
source ~/dev/solana-mobile/agents/keys/webshell.env   # exports SOLANA_MOBILE_KEYSTORE_PASSWORD and SOLANA_MOBILE_KEY_PASSWORD
npx solana-mobile@latest webshell build shell
adb install -r shell/app/build/outputs/apk/release/app-release.apk
```

To test against the dev server instead, build with the URL overridden and reverse the port:

```bash
(cd shell && ./gradlew assembleRelease -PSOLANA_MOBILE_URL=http://localhost:5173/ -PSOLANA_MOBILE_KEYSTORE_PATH="$PWD/release.keystore" -PSOLANA_MOBILE_KEYSTORE_ALIAS=pocket-address-pwa)
adb reverse tcp:5173 tcp:5173
```

Without the keystore properties Gradle silently writes `app-release-unsigned.apk` instead. `shell/release.keystore` is gitignored. Every update must be signed with the same key, so keep a backup outside the repo. Raise `SOLANA_MOBILE_VERSION_CODE` in `shell/gradle.properties` for every store release.

## Branding

The SVG sources and their PNG exports live in `assets/branding/`. Re-export them with `assets/branding/export.sh` (needs `rsvg-convert`, `brew install librsvg`). `public/icon-512.png` is the store icon and `public/favicon.svg` the app icon.
