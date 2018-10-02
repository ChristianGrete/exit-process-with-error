import {join, resolve} from 'path'
import {parse, Url} from 'url'

/////////
// LIB //
/////////

import {exitProcessWithError, readFile, writeFile} from '../../../lib'

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH:string = resolve(__dirname, '..', '..', '..')
const DIRNAME_DIST:string = join(BASEPATH, 'dist')
const FILENAME_PACKAGE:string = join(BASEPATH, 'package.json')
const FILENAME_README_IN:string = join(BASEPATH, 'README.md')
const FILENAME_README_OUT:string = join(DIRNAME_DIST, 'README.md')
const PATH_MASTER_BRANCH:string = '/blob/master/'

const ERR_INVALID_HOMEPAGE_PROP:string = 'Invalid value for property `homepage` in package.json'

const relativePathsPattern:RegExp = /(CONTRIBUTING\.md|LICENSE)/g

///////////
// TASKS //
///////////

function loadPackage():Promise<string> {
  return readFile(FILENAME_PACKAGE)
}

function getPackageHomepage($data:string):Promise<string> {
  return new Promise(($resolve, $reject):void => {
    var _error:Error|null = null
    var _homepage:string

    try {
      _homepage = JSON.parse($data).homepage
    } catch ($error) {
      _error = $error
    }

    if (_error === null) {
      $resolve(_homepage)
    } else {
      $reject(_error)
    }
  })
}

function getValidatedPackageHomepageURL($homepage:string):Promise<string> {
  return new Promise(($resolve, $reject):void => {
    var _error:Error|null = null
    var _parsedHomepage:Url

    try {
      _parsedHomepage = parse($homepage)
    } catch ($error) {
      _error = $error
    }

    if (_error === null) {
      if (_parsedHomepage.hostname === null) {
        $reject(new TypeError(ERR_INVALID_HOMEPAGE_PROP))
      } else {
        $resolve(_parsedHomepage.href)
      }
    } else {
      $reject(_error)
    }
  })
}

function appendMasterBranchPathToURL($homepageURL:string):string {
  return $homepageURL + PATH_MASTER_BRANCH
}

function getReadmeFileContent($homepageURL:string):Promise<string[]> {
  return (
    readFile(FILENAME_README_IN)
      .then(($data:string) => [$homepageURL, $data])
  )
}

function modifyReadmeFileContent($results:string[]):string {
  const [_HOMEPAGE_URL, _README_CONTENT] = $results
  const _matches:string[]|null = _README_CONTENT.match(relativePathsPattern)

  return (
    Array.isArray(_matches) && _matches.length > 0 ?
      _README_CONTENT.replace(relativePathsPattern, _HOMEPAGE_URL + '$&') : _README_CONTENT
  )
}

function saveContentToDistReadmeFile($content:string):Promise<string[]> {
  return writeFile(FILENAME_README_OUT, $content)
}

// Running the tasks step by step
loadPackage()
  .then(getPackageHomepage)
  .then(getValidatedPackageHomepageURL)
  .then(appendMasterBranchPathToURL)
  .then(getReadmeFileContent)
  .then(modifyReadmeFileContent)
  .then(saveContentToDistReadmeFile)
  .catch(exitProcessWithError)
