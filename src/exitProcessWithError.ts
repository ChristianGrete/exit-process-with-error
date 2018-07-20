interface ErrorWithOptionalExitCode extends Error {
  exitCode?:number
}

const ERR_PROCESS_TERMINATED:string = 'Process terminated with undefined error'
const EXIT_CODE_INVALID_ARG:number = 128

const defaultError:ErrorWithOptionalExitCode = new Error(
  ERR_PROCESS_TERMINATED
)

defaultError.exitCode = EXIT_CODE_INVALID_ARG

function exitProcessWithError(
  $error:ErrorWithOptionalExitCode = defaultError,
  $process:NodeJS.Process = process
):never {
  const _exitCode:number = (
    typeof $error.exitCode === 'number' && $error.exitCode !== 0 ?
      $error.exitCode : 1
  )

  console.error($error) // tslint:disable-line:no-console

  return $process.exit(_exitCode)
}

export default exitProcessWithError

export {
  defaultError,
  ErrorWithOptionalExitCode,
  exitProcessWithError
}
