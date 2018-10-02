interface Dependencies {
  [dependency:string]:string
}

type Person = string|{email?:string, name:string, url?:string}

export interface Package {
  author?:Person
  bugs?:string|{email:string, url?:string}|{url:string}
  contributors?:Person[]
  dependencies?:Dependencies
  description?:string
  devDependencies?:Dependencies
  engines?:{node:string, npm?:string}
  files?:string[]
  homepage?:string
  jest?:any
  keywords?:string[]
  license?:string
  main?:string
  maintainers?:Person[]
  module?:string
  name:string
  private?:boolean
  repository?:string|{type:string, url:string}
  scripts?:{[script:string]:string}
  types?:string
  version:string
  [field:string]:any
}

export default Package
