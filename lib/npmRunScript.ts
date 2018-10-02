import {ChildProcess, exec, ExecException} from 'child_process'

export function npmRunScript($script:string):Promise<void> {
  return (
    new Promise(($resolve, $reject):ChildProcess => exec(
      'npm run-script ' + $script,
      ($error:ExecException|null, $stdout:string) => {
        if ($error === null) {
          $resolve($stdout)
        } else {
          $reject($error)
        }
      }
    ))
      .then(($stdout:string) => console.log($stdout)) // tslint:disable-line:no-console
      .catch(($error:ExecException) => console.warn($error)) // tslint:disable-line:no-console
  )
}

export default npmRunScript
