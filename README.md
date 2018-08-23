# [exit-process-with-error][repository-github-url] :bomb:

[![License: MIT][repository-license-shield]][repository-license-url]
[![Language: TypeScript][repository-language-shield]][repository-language-url]
[![Latest Build][repository-ci-service-shield]][repository-ci-service-url]

> A function to terminate Node.js processes with an error and a non-zero exit code

## Getting started

### Installation
To install this package to your [Node.js](https://nodejs.org) modules, run:
```sh
npm i -S exit-process-with-error
```
Or, using [Yarn](https://yarnpkg.com), run:
```sh
yarn add exit-process-with-error
```

### Usage
Simply import it as an ES2015 module and terminate :boom: your process:
```js
import exitProcessWithError from 'exit-process-with-error'

exitProcessWithError() // Boom!
```

## Example

Let’s assume that we want to read a corrupted file using `Promise`:
```js
import {readFile} from 'fs'
import {exitProcessWithError} from 'exit-process-with-error'

const whenFileRead = new Promise(($resolve, $reject) => {
  readFile('corrupted-file.txt', ($error, $data) => {
    if ($error === null) {
      $resolve($data)
    } else {
      $error.exitCode = $error.exitCode || 123

      $reject($error)
    }
  })
})

whenFileRead
  .then(console.log) // Won’t be invoked
  .catch(exitProcessWithError)

// Prints the error object and
// terminates the process with exit code 123
```

## Contributing

If you want to contribute as a developer, see the [contribution guidelines][repository-contribution-guidelines-url] on how to get involved with this project.

## License

This software is licensed under [MIT License][repository-license-url].

---

Copyright © 2018 [Christian Grete][repository-owner-url]
- [GitHub](https://github.com/ChristianGrete)
- [npm](https://www.npmjs.com/~christiangrete)
- [Twitter](https://twitter.com/ChristianGrete)
- [LinkedIn](https://www.linkedin.com/in/ChristianGrete)
- [XING](https://www.xing.com/profile/Christian_Grete2)

[repository-ci-service-shield]: https://img.shields.io/travis/ChristianGrete/exit-process-with-error/develop.svg
[repository-ci-service-url]: https://travis-ci.org/ChristianGrete/exit-process-with-error
[repository-contribution-guidelines-url]: CONTRIBUTING.md
[repository-github-url]: https://github.com/ChristianGrete/exit-process-with-error
[repository-language-shield]: https://img.shields.io/badge/language-TypeScript-%232b7489.svg
[repository-language-url]: https://www.typescriptlang.org
[repository-license-shield]: https://img.shields.io/github/license/ChristianGrete/exit-process-with-error.svg
[repository-license-url]: LICENSE
[repository-owner-url]: https://christiangrete.com