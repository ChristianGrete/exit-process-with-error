const fsRename = require('fs').rename

function rename($oldPath, $newPath) {
  return new Promise(($resolve, $reject) => fsRename(
    $oldPath,
    $newPath,
    $error => {
      if ($error === null) {
        $resolve([$oldPath, $newPath])
      } else {
        $reject($error)
      }
    }
  ))
}

module.exports = rename
