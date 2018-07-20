const {exec} = require('child_process')
const {join, resolve} = require('path')

const BASEPATH = resolve(__dirname, '..')

// Helper to run scripts via `npm run-script` CLI
const npmRun = $script => (
  new Promise(($resolve, $reject) => exec(
    `npm run ${$script}`,
    ($error, $stdout) => {
      if ($error === null) {
        $resolve($stdout)
      } else {
        $reject($error)
      }
    }
  ))
    .then($stdout => console.log($stdout)) // tslint:disable-line:no-console
    .catch($error => console.warn($error)) // tslint:disable-line:no-console
)

// BrowserSync configuration object
module.exports = {
  cwd: BASEPATH,
  files: [
    {
      fn() {
        npmRun('prestart')
          .then(() => this.reload())
      },
      match: ['src/**/*.ts']
    }
  ],
  server: {
    baseDir: join(BASEPATH, 'coverage'),
    directory: true
  },
  watch: true
}
