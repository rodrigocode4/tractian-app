interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
