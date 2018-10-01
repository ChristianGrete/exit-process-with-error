import {join, parse, resolve} from 'path'

/////////
// LIB //
/////////

import {exitProcessWithError, readFile, rename, writeFile} from '../lib/'

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH:string = resolve(__dirname, '..')
const DIRNAME_BUILD:string = join(BASEPATH, 'build')
const FILENAME_MAP_NEW:string = join(DIRNAME_BUILD, 'exitProcessWithError.mjs.map')
const FILENAME_MAP_OLD:string = join(DIRNAME_BUILD, 'exitProcessWithError.js.map')
const FILENAME_JAVASCRIPT_NEW:string = join(DIRNAME_BUILD, 'exitProcessWithError.mjs')
const FILENAME_JAVASCRIPT_OLD:string = join(DIRNAME_BUILD, 'exitProcessWithError.js')

const oldFilenamesPattern:RegExp = /exitProcessWithError\.js/g

const NEW_FILENAMES_REPLACEMENT:string = 'exitProcessWithError.mjs'

interface FileContents {
  [filename:string]:string
}

///////////
// TASKS //
///////////

function renameFiles():Promise<string[][]> {
  return Promise.all([
    rename(FILENAME_JAVASCRIPT_OLD, FILENAME_JAVASCRIPT_NEW),
    rename(FILENAME_MAP_OLD, FILENAME_MAP_NEW)
  ])
}

function readRenamedFiles($changes:string[][]):Promise<FileContents> {
  return (
    Promise.all($changes.map(($change:string[]):Promise<FileContents> => (
        readFile($change[1])
          .then(($data:string):FileContents => ({[$change[1]]: $data}))
    )))
      .then(($results:FileContents[]) => {
        const _files:FileContents = {}

        $results.forEach(($result:FileContents) => Object.assign(_files, $result))

        return _files
      })
  )
}

function replaceFilenameOccurrences($files:FileContents):FileContents {
  const _changedFiles:FileContents = {}

  Object.keys($files).forEach(($filename:string) => {
    const _content:string = $files[$filename]
    const _matches:string[]|null = _content.match(oldFilenamesPattern)

    if (Array.isArray(_matches) && _matches.length > 0) {
      Object.assign(_changedFiles, {[$filename]: _content.replace(oldFilenamesPattern, NEW_FILENAMES_REPLACEMENT)})
    }
  })

  return _changedFiles
}

function saveUpdatedFileContents($updatedFiles:FileContents):Promise<string[][]> {
  return Promise.all(Object.keys($updatedFiles).map(
    ($filename:string) => writeFile($filename, $updatedFiles[$filename])
  ))
}

// Running the tasks step by step
renameFiles()
  .then(readRenamedFiles)
  .then(replaceFilenameOccurrences)
  .then(saveUpdatedFileContents)
  .catch(exitProcessWithError)
