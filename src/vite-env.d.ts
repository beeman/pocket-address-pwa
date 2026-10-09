/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MWA_REMOTE_HOST_AUTHORITY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
