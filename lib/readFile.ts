import {readFile as fsReadFile} from 'fs'

export function readFile($path:string):Promise<string> {
  return new Promise(($resolve, $reject):void => fsReadFile(
    $path,
    'utf8',
    ($error:NodeJS.ErrnoException|null, $data:string) => {
      if ($error === null) {
        $resolve($data)
      } else {
        $reject($error)
      }
    }
  ))
}

export default readFile
