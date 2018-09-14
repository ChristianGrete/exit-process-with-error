import {readFile as fsReadFile} from 'fs'

export function readFile($path, $options = 'utf8') {
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

export default readFile
