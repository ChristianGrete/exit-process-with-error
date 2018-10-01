import {rename as fsRename} from 'fs'

export function rename($oldPath:string, $newPath:string):Promise<string[]> {
  return new Promise(($resolve, $reject):void => fsRename(
    $oldPath,
    $newPath,
    ($error:NodeJS.ErrnoException|null) => {
      if ($error === null) {
        $resolve([$oldPath, $newPath])
      } else {
        $reject($error)
      }
    }
  ))
}

export default rename
