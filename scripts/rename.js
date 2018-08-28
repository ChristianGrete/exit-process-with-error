const {join, parse, resolve} = require('path')

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH = resolve(__dirname, '..')
const DIRNAME_BUILD = join(BASEPATH, 'build')
const DIRNAME_LIB = join(BASEPATH, 'lib')
const FILENAME_MAP_NEW = join(DIRNAME_BUILD, 'exitProcessWithError.mjs.map')
const FILENAME_MAP_OLD = join(DIRNAME_BUILD, 'exitProcessWithError.js.map')
const FILENAME_JAVASCRIPT_NEW = join(DIRNAME_BUILD, 'exitProcessWithError.mjs')
const FILENAME_JAVASCRIPT_OLD = join(DIRNAME_BUILD, 'exitProcessWithError.js')

const oldFilenamesPattern = /exitProcessWithError\.js/g

const NEW_FILENAMES_REPLACEMENT = 'exitProcessWithError.mjs'

/////////
// LIB //
/////////

const {exitProcessWithError, readFile, rename, writeFile} = require(DIRNAME_LIB)

///////////
// TASKS //
///////////

function renameFiles() {
  return Promise.all([
    rename(FILENAME_JAVASCRIPT_OLD, FILENAME_JAVASCRIPT_NEW),
    rename(FILENAME_MAP_OLD, FILENAME_MAP_NEW)
  ])
}

function readRenamedFiles($changes) {
  return (
    Promise.all($changes.map($change => (
        readFile($change[1])
          .then($data => ({[$change[1]]: $data}))
    )))
      .then($results => {
        const _files = {}

        $results.forEach($result => Object.assign(_files, $result))

        return _files
      })
  )
}

function replaceFilenameOccurrences($files) {
  const _changedFiles = {}

  Object.keys($files).forEach($filename => {
    const _content = $files[$filename]
    const _matches = _content.match(oldFilenamesPattern)

    if (Array.isArray(_matches) && _matches.length > 0) {
      Object.assign(_changedFiles, {
        [$filename]: _content.replace(
          oldFilenamesPattern,
          NEW_FILENAMES_REPLACEMENT
        )
      })
    }
  })

  return _changedFiles
}

function saveUpdatedFileContents($updatedFiles) {
  return Promise.all(Object.keys($updatedFiles).map($filename => writeFile(
    $filename,
    $updatedFiles[$filename]
  )))
}

// Running the tasks step by step
renameFiles()
  .then(readRenamedFiles)
  .then(replaceFilenameOccurrences)
  .then(saveUpdatedFileContents)
  .catch(exitProcessWithError)
