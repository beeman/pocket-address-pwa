/**
 * What the wallet shows on its consent screen. The icon path is relative to `uri`, and the app may
 * be served under a sub-path (GitHub Pages), so it is resolved from the page URL rather than written
 * as `/icon-512.png`.
 */
export const APP_IDENTITY = {
  icon: new URL('icon-512.png', window.location.href).pathname.slice(1),
  name: 'Pocket Address',
  uri: window.location.origin,
}
