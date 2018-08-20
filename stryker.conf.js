const {join, resolve} = require('path')

const BASEPATH = resolve(__dirname)
const DIRNAME_SRC = join(BASEPATH, 'src')
const FILENAME_TYPESCRIPT_CONFIG = join(BASEPATH, 'tsconfig.json')
const GLOB_MUTABLE_FILES = join(DIRNAME_SRC, 'exitProcessWithError.ts')

const strykerConfig = {
  coverageAnalysis: 'off',
  logLevel: 'warn',
  mutate: [GLOB_MUTABLE_FILES],
  mutator: 'typescript',
  packageManager: 'npm',
  reporters: ['clear-text'],
  testRunner: 'jest',
  tsconfigFile: FILENAME_TYPESCRIPT_CONFIG
}

module.exports = $config => $config.set(strykerConfig)
