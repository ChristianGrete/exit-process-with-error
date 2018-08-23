const {join, resolve} = require('path')
const {parse} = require('url')

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH = resolve(__dirname, '..', '..', '..')
const DIRNAME_DIST = join(BASEPATH, 'dist')
const DIRNAME_LIB = join(BASEPATH, 'lib')
const FILENAME_PACKAGE = join(BASEPATH, 'package.json')
const FILENAME_README_IN = join(BASEPATH, 'README.md')
const FILENAME_README_OUT = join(DIRNAME_DIST, 'README.md')
const PATH_MASTER_BRANCH = '/blob/master/'

const ERR_INVALID_HOMEPAGE_PROP = 'Invalid value for property `homepage` in '
  + 'package.json'

const relativePathsPattern = /(CONTRIBUTING\.md|LICENSE)/g

/////////
// LIB //
/////////

const {readFile, writeFile} = require(DIRNAME_LIB)

///////////
// TASKS //
///////////

function loadPackage() {
  return readFile(FILENAME_PACKAGE)
}

function getPackageHomepage($data) {
  return new Promise(($resolve, $reject) => {
    var _error = null
    var _homepage

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

function getValidatedPackageHomepageURL($homepage) {
  return new Promise(($resolve, $reject) => {
    var _error = null
    var _parsedHomepage

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

function appendMasterBranchPathToURL($homepageURL) {
  return $homepageURL + PATH_MASTER_BRANCH
}

function getReadmeFileContent($homepageURL) {
  return (
    readFile(FILENAME_README_IN)
      .then($data => [$homepageURL, $data])
  )
}

function modifyReadmeFileContent($results) {
  const [_HOMEPAGE_URL, _README_CONTENT] = $results
  const _matches = _README_CONTENT.match(relativePathsPattern)

  return (
    Array.isArray(_matches) && _matches.length > 0 ?
      _README_CONTENT.replace(relativePathsPattern, _HOMEPAGE_URL + '$&') :
        _README_CONTENT
  )
}

function saveContentToDistReadmeFile($content) {
  return writeFile(FILENAME_README_OUT, $content)
}

function exitProcessWithError($error) {
  $error.exitCode = $error.exitCode || 1

  console.error($error) // tslint:disable-line:no-console

  process.exit($error.exitCode)
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
