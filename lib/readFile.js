const fsReadFile = require('fs').readFile

function readFile($path, $options = 'utf8') {
  return new Promise(($resolve, $reject) => fsReadFile(
    $path,
    $options,
    ($error, $data) => {
      if ($error === null) {
        $resolve($data)
      } else {
        $reject($error)
      }
    }
  ))
}

module.exports = readFile
