import {isAbsolute, join, relative, resolve} from 'path'

/////////
// LIB //
/////////

import {exitProcessWithError, Package, readFile, writeFile} from '../../../lib'

//////////////
// SETTINGS //
//////////////

// Paths and filenames
const BASEPATH:string = resolve(__dirname, '..', '..', '..')
const DIRNAME_DIST:string = join(BASEPATH, 'dist')
const FILENAME_PACKAGE:string = join(BASEPATH, 'package.json')
const FILENAME_PACKAGE_DIFF:string = join(BASEPATH, 'package-diff.json')
const FILENAME_PACKAGE_DIST:string = join(DIRNAME_DIST, 'package.json')

const ERR_INVALID_PACKAGE:string = 'Cannot parse package.json or package-diff.json'

///////////
// TASKS //
///////////

function loadPackage():Promise<string> {
  return readFile(FILENAME_PACKAGE)
}

function loadPackageDiff($data:string):Promise<string[]> {
  return (
    readFile(FILENAME_PACKAGE_DIFF)
      .then(($dataDiff:string):string[] => [$data, $dataDiff])
  )
}

function parsePackage($data:string):Promise<Package> {
  return new Promise(($resolve, $reject):void => {
    var _error:Error|null = null
    var _package:Package|undefined

    try {
      _package = JSON.parse($data)
    } catch ($error) {
      _error = $error
    }

    if (_error === null) {
      if (_package !== null && typeof _package === 'object') {
        $resolve(_package)
      } else {
        $reject(new TypeError(ERR_INVALID_PACKAGE))
      }
    } else {
      $reject(_error)
    }
  })
}

function parsePackages($data:string[]):Promise<Package[]> {
  const [_DATA, _DATA_DIFF] = $data

  return Promise.all([
    parsePackage(_DATA),
    parsePackage(_DATA_DIFF)
  ])
}

function mergePackages($packages:Package[]):Package {
  const [_package, _packageDiff] = $packages

  Object.keys(_packageDiff).forEach(($key:string):void => {
    const _value:any = _packageDiff[$key]

    if (_value === null) {
      delete _package[$key]
    } else {
      _package[$key] = _value
    }
  })

  return _package
}

function relativizePath($path:string):string {
  if ($path.includes('dist')) {
    if (!isAbsolute($path)) {
      $path = resolve(BASEPATH, $path)
    }

    $path = relative(DIRNAME_DIST, $path)
  }

  return $path
}

function updateMergedPackagePaths($mergedPackage:Package):Package {
  if (Array.isArray($mergedPackage.files)) {
    const _mergedPackageFiles = $mergedPackage.files

    _mergedPackageFiles.forEach(($file:string, $index:number) => (
      _mergedPackageFiles[$index] = relativizePath($file)
    ))
  }

  if (typeof $mergedPackage.main === 'string') {
    $mergedPackage.main = relativizePath($mergedPackage.main)
  }

  if (typeof $mergedPackage.module === 'string') {
    $mergedPackage.module = relativizePath($mergedPackage.module)
  }

  if (typeof $mergedPackage.types === 'string') {
    $mergedPackage.types = relativizePath($mergedPackage.types)
  }

  return $mergedPackage
}

function stringifyPackage($package:Package):Promise<string> {
  return new Promise(($resolve, $reject):void => {
    var _error:Error|null = null
    var _json:string|undefined

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

function saveJSONToDistPackageFile($json:string):Promise<string[]> {
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
