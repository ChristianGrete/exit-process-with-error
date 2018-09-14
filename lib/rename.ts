import {rename as fsRename} from 'fs'

export function rename($oldPath, $newPath) {
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

export default rename
