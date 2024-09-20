import type { Hono } from 'hono'
import type { OutputAsset, OutputChunk } from 'rollup'
import type { UserConfig } from 'vite'

type RollupOutputList = [OutputChunk, ...(OutputChunk | OutputAsset)[]]

export type BuildArgs = { step?: string; only?: string; analyze?: boolean }

export type AfterBuildProps = {
  options: VXRNOptions
  clientOutput: RollupOutputList
  serverOutput: RollupOutputList
  serverResolve: Object
  webBuildConfig: UserConfig
  rollupRemoveUnusedImportsPlugin: any
  serverBuildConfig: UserConfig
  buildArgs?: BuildArgs
  clientManifest: {
    // app/[user].tsx
    [key: string]: ClientManifestEntry
  }
}

export type ClientManifestEntry = {
  file: string // assets/_user_-Bg0DW2rm.js
  src?: string // app/[user].tsx
  isDynamicEntry?: boolean // true for import.meta.globbed
  isEntry?: boolean // true for index.html
  name: string // _user_
  imports: string[]
  css?: string[]
}

export type VXRNBuildOptions = {
  /**
   * Control the output format of the server build
   * @default esm
   */
  outputFormat?: 'cjs' | 'esm'
}

export type VXRNOptions = {
  /**
   * The entry points to your app. For web, it defaults to using your `root` to look for an index.html
   *
   * Defaults:
   *   native: ./src/entry-native.tsx
   */
  entries?: {
    native?: string
    web?: string
  }

  /**
   * Settings only apply when running `vxrn build`
   */
  build?: {
    server?: boolean | VXRNBuildOptions
  }

  hono?: {
    compression?: boolean
    cacheHeaders?: 'off'
  }

  root?: string
  host?: string
  port?: number

  /**
   * Uses mkcert to create a self-signed certificate
   */
  https?: boolean

  /**
   * Whether to clean cache directories on startup
   */
  clean?: boolean

  // for hooking into things
  afterBuild?: (props: AfterBuildProps) => void | Promise<void>
  afterServerStart?: (options: VXRNOptions, app: Hono) => void | Promise<void>
}

export type HMRListener = (update: { file: string; contents: string }) => void
