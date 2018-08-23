const fsWriteFile = require('fs').writeFile

function writeFile($file, $data, $options) {
  return new Promise(($resolve, $reject) => fsWriteFile(
    $file,
    $data,
    $options,
    $error => {
      if ($error === null) {
        $resolve([$file, $data])
      } else {
        $reject($error)
      }
    }
  ))
}

module.exports = writeFile
