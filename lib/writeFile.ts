import {writeFile as fsWriteFile} from 'fs'

export function writeFile($file, $data, $options) {
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

export default writeFile
