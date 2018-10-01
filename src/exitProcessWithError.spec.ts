import {readFileSync} from 'fs'
import {join, resolve} from 'path'

import * as imports from './exitProcessWithError.ts'

const BASEPATH = resolve(__dirname, '..')
const FILENAME_PACKAGE = join(BASEPATH, 'package.json')

const {name: MODULE_ID} = JSON.parse(readFileSync(FILENAME_PACKAGE, 'utf8'))

describe(MODULE_ID, () => {
  it('exports exitProcessWithError() as default member', () => {
    expect(imports).toHaveProperty('default', imports.exitProcessWithError)
  })

  it('exports defaultError for testing', () => {
    expect(imports).toHaveProperty('defaultError')
  })
})

const {defaultError, exitProcessWithError} = imports

describe('defaultError', () => {
  it('is a string', () => {
    expect(typeof defaultError.message).toBe('string')
  })

  it('is not empty', () => {
    expect(defaultError.message.length).toBeGreaterThan(0)
  })
})

describe('exitProcessWithError()', () => {
  const {error: _originalErrorMethod} = console
  const {exit: _originalExitMethod} = process

  it('is a function', () => {
    expect(typeof exitProcessWithError).toBe('function')
  })

  beforeEach(() => {
    console.error = jest.fn() // tslint:disable-line:no-console
    process.exit = jest.fn()
  })

  afterEach(() => {
    console.error = _originalErrorMethod // tslint:disable-line:no-console
    process.exit = _originalExitMethod
  })

  describe('when invoked without any argument', () => {
    it('calls console.error() and passes defaultError', () => {
      exitProcessWithError()
      expect(console.error).toHaveBeenCalledWith(defaultError) // tslint:disable-line:no-console
    })

    it('calls process.exit() and passes defaultError.exitCode', () => {
      exitProcessWithError()
      expect(process.exit).toHaveBeenCalledWith(defaultError.exitCode)
    })
  })

  describe('when invoked with an instance of Error passed as argument', () => {
    describe('and no .exitCode property is set', () => {
      var _error

      beforeEach(() => {
        _error = new Error()
      })

      it('calls console.error() and passes the Error instance', () => {
        exitProcessWithError(_error)
        expect(console.error).toHaveBeenCalledWith(_error) // tslint:disable-line:no-console
      })

      it('calls process.exit() and passes the general exit code 1', () => {
        exitProcessWithError(_error)
        expect(process.exit).toHaveBeenCalledWith(1)
      })
    })

    describe('and a user defined .exitCode property is set', () => {
      var _error

      const _EXIT_CODE = 2

      beforeEach(() => {
        _error = new Error()
        _error.exitCode = _EXIT_CODE
      })

      it('calls console.error() and passes the Error instance', () => {
        exitProcessWithError(_error)
        expect(console.error).toHaveBeenCalledWith(_error) // tslint:disable-line:no-console
      })

      it('calls process.exit() and passes the user defined exit code', () => {
        exitProcessWithError(_error)
        expect(process.exit).toHaveBeenCalledWith(_EXIT_CODE)
      })
    })
  })

  describe('when invoked with a process object passed as 2nd argument', () => {
    var _error

    const _EXIT_CODE = 3

    const _process = {}

    beforeEach(() => {
      _error = new Error()
      _error.exitCode = _EXIT_CODE
      _process.exit = jest.fn()
    })

    it('calls its .exit() method and passes the respective exit code', () => {
      exitProcessWithError(_error, _process)
      expect(_process.exit).toHaveBeenCalledWith(_EXIT_CODE)
    })
  })
})
