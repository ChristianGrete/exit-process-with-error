const {isAbsolute, join, relative, resolve} = require('path')

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH = resolve(__dirname, '..', '..', '..')
const DIRNAME_DIST = join(BASEPATH, 'dist')
const DIRNAME_LIB = join(BASEPATH, 'lib')
const FILENAME_PACKAGE = join(BASEPATH, 'package.json')
const FILENAME_PACKAGE_DIFF = join(BASEPATH, 'package-diff.json')
const FILENAME_PACKAGE_DIST = join(DIRNAME_DIST, 'package.json')

const ERR_INVALID_PACKAGE = 'Cannot parse package.json or package-diff.json'

/////////
// LIB //
/////////

const {exitProcessWithError, readFile, writeFile} = require(DIRNAME_LIB)

///////////
// TASKS //
///////////

function loadPackage() {
  return readFile(FILENAME_PACKAGE)
}

function loadPackageDiff($data) {
  return (
    readFile(FILENAME_PACKAGE_DIFF)
      .then($dataDiff => [$data, $dataDiff])
  )
}

function parsePackage($data) {
  return new Promise(($resolve, $reject) => {
    var _error = null
    var _package

    try {
      _package = JSON.parse($data)
    } catch ($error) {
      _error = $error
    }

    if (_error === null) {
      if (typeof _package === 'object') {
        $resolve(_package)
      } else {
        $reject(new TypeError(ERR_INVALID_PACKAGE))
      }
    } else {
      $reject(_error)
    }
  })
}

function parsePackages($data) {
  const [_DATA, _DATA_DIFF] = $data

  return Promise.all([
    parsePackage(_DATA),
    parsePackage(_DATA_DIFF)
  ])
}

function mergePackages($packages) {
  const [_package, _packageDiff] = $packages

  Object.keys(_packageDiff).forEach($key => {
    const _value = _packageDiff[$key]

    if (_value === null) {
      delete _package[$key]
    } else {
      _package[$key] = _value
    }
  })

  return _package
}

function relativizePath($path) {
  if ($path.includes('dist')) {
    if (!isAbsolute($path)) {
      $path = resolve(BASEPATH, $path)
    }

    $path = relative(DIRNAME_DIST, $path)
  }

  return $path
}

function updateMergedPackagePaths($mergedPackage) {
  $mergedPackage.files.forEach(($file, $index) => (
    $mergedPackage.files[$index] = relativizePath($file)
  ))

  $mergedPackage.main = relativizePath($mergedPackage.main)
  $mergedPackage.module = relativizePath($mergedPackage.module)
  $mergedPackage.types = relativizePath($mergedPackage.types)

  return $mergedPackage
}

function stringifyPackage($package) {
  return new Promise(($resolve, $reject) => {
    var _error = null
    var _json

    try {
      _json = JSON.stringify($package)
    } catch ($error) {
      _error = $error
    }

    if (_error === null) {
      $resolve(_json)
    } else {
      $reject(_error)
    }
  })
}

function saveJSONToDistPackageFile($json) {
  return writeFile(FILENAME_PACKAGE_DIST, $json)
}

// Running the tasks step by step
loadPackage()
  .then(loadPackageDiff)
  .then(parsePackages)
  .then(mergePackages)
  .then(updateMergedPackagePaths)
  .then(stringifyPackage)
  .then(saveJSONToDistPackageFile)
  .catch(exitProcessWithError)
