import {join, resolve} from 'path'

//////////////////
// NODE MODULES //
//////////////////

import BrowserSync, {Options as BrowserSyncOptions} from 'browser-sync'

/////////
// LIB //
/////////

import {npmRunScript} from '../lib'

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH:string = resolve(__dirname, '..')

interface BrowserSyncOptionsWithCwd extends BrowserSyncOptions {
  cwd?:string
}

const browserSyncOptions:BrowserSyncOptionsWithCwd = {
  cwd: BASEPATH,
  files: [
    {
      fn() {
        npmRunScript('prestart')
          .then(() => (this as any).reload())
      },
      match: ['src/**/*.ts']
    }
  ],
  server: {
    baseDir: join(BASEPATH, 'reports'),
    directory: true
  },
  watch: true
}

///////////
// TASKS //
///////////

BrowserSync
  .create()
  .init(browserSyncOptions)
