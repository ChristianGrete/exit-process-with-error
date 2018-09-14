export function exitProcessWithError($error) {
  $error.exitCode = $error.exitCode || 1

  console.error($error) // tslint:disable-line:no-console

  process.exit($error.exitCode)
}

export default exitProcessWithError
