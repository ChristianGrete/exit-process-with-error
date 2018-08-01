const {readFile, rename, writeFile} = require('fs')
const {join, parse, resolve} = require('path')

// Paths and filenames
const BASEPATH = resolve(__dirname, '..')
const DIRNAME_BUILD = join(BASEPATH, 'build')

// Renames the .js file extensions to .mjs
function renameFiles() {
  return new Promise(($resolve, $reject) => {
    rename(
      join(DIRNAME_BUILD, 'exitProcessWithError.js'),
      join(DIRNAME_BUILD, 'exitProcessWithError.mjs'),
      $jsError => {
        if ($jsError !== null) {
          $reject($jsError)
        } else {
          rename(
            join(DIRNAME_BUILD, 'exitProcessWithError.js.map'),
            join(DIRNAME_BUILD, 'exitProcessWithError.mjs.map'),
            $mapError => {
              if ($mapError !== null) {
                $reject($mapError)
              } else {
                $resolve()
              }
            }
          )
        }
      }
    )
  })
}

// Replaces the occurrences of .js file extensions with .mjs
function replaceFilenameOccurrences() {
  const _oldFilenamesPattern = /exitProcessWithError\.js/g

  return Promise.all([
    join(DIRNAME_BUILD, 'exitProcessWithError.mjs'),
    join(DIRNAME_BUILD, 'exitProcessWithError.mjs.map')
  ].map($filename => new Promise(($resolve, $reject) => {
    readFile($filename, 'utf8', ($readError, $data) => {
      if ($readError !== null) {
        $reject($readError)
      } else {
        const _matches = $data.match(_oldFilenamesPattern)

        if (Array.isArray(_matches) && _matches.length > 0) {
          writeFile(
            $filename,
            $data.replace(_oldFilenamesPattern, 'exitProcessWithError.mjs'),
            'utf8',
            $writeError => {
              if ($writeError !==  null) {
                $reject($writeError)
              } else {
                $resolve()
              }
            }
          )
        }
      }
    })
  })))
}

// Runs both tasks
renameFiles()
  .then(replaceFilenameOccurrences)
  .catch($error => {
    $error.exitCode = $error.exitCode || 1
    console.error($error) // tslint:disable-line:no-console
    process.exit($error.exitCode)
  })
