import {writeFile as fsWriteFile} from 'fs'

export function writeFile($file:string, $data:string):Promise<string[]> {
  return new Promise(($resolve, $reject):void => fsWriteFile(
    $file,
    $data,
    'utf8',
    ($error:NodeJS.ErrnoException|null) => {
      if ($error === null) {
        $resolve([$file, $data])
      } else {
        $reject($error)
      }
    }
  ))
}

export default writeFile
