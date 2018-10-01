# Changelog of [exit-process-with-error][repository-github-url]

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog-spec-url] and this project adheres to [Semantic Versioning][semantic-versioning-spec-url].

## [Unreleased]

### [develop]
#### Changed
- style(mate): increase wrap column width [[2225131]]
- style(src): fit code into new line width [[22c4dd4]]
- refactor(lib): finalize ts-node migration

### [master]
#### Added
- init(*): create project [[3f49e30]]
- chore(*): provide project mvp [POC | [a3450e0]]
- chore(*): improve project infrastructure [POC | [b36daea]]
- chore(*): restructure build output layout [POC | [ef117d7]]
- docs(readme): add getting started section [[4b3e7d4]]
- chore(*): implement production build [[#2] | [c3a485b]]
- docs(readme): add example section [[17f2a4e]]
- chore(*): extend project library [[bdb4e41]]
#### Changed
- docs(readme): link develop branch [[972703a]]
- docs(readme): move bomb emoji [[579b2d4]]
- docs(readme): replace bomb emoji [[51fbd3b]]
- refactor(*): remove npm package scope [[3f0ee43]]
- refactor(mate): remove npm package scope [[49f2ae6]]
- chore(*): update travis configuration [[ae646d5]]
- docs(readme): add badges/shields [[fb5ad3b]]
- docs(readme): switch badges/shields [[db7457e]]
- docs(*): make license a plain file [[63ec1b8]]
- docs(license): refresh template [[4792af8]]
- docs(log): update changelog [[67a7292]]
- docs(log): update changelog, again [[40f0ace]]
- docs(readme): update badges/shields [[c446f09]]
- chore(*): refactor npm scripts [[b71b777]]
- chore(*): softly migrate scripts to ts-node [[0a1db76]]
- docs(log): update changelog once more [[16a5a6b]]
#### Deprecated
- chore(*): drop es5 support [[#1] | [c700b02]]
#### Fixed
- fix(license): use template [[51f4711]]
- fix(*): provide declaration in production build [[8e1d126]]
- fix(*): support node <10 in build process [[c6f979d]]
- fix(ci): increase stryker timeout [[01d3999]]
- fix(ci): increase stryker timeout, again [[08e00a7]]
- fix(code): use template [[8dca1bf]]
#### Security
- chore(*): update dev-deps and excludes [[a9a433b]]
- chore(*): update engines [[08293a1]]
- chore(*): update dev-deps [[8a23c67]]
- chore(*): update dev-deps again [[65d6455]]
- chore(*): implement travis-ci [[a4248db]]
- chore(*): add stable node version [[1f3fbc2]]
- chore(*): add custom travis build script [[d81c3f8]]
- chore(*): define code ownership [[c791b5d]]
- chore(*): update dev-deps and engines [[14c00dc]]

[Unreleased]: https://github.com/ChristianGrete/exit-process-with-error/compare/3f49e305b5453ac6707f81ecde2103bf93e2d2f4...develop
[22c4dd4]: https://github.com/ChristianGrete/exit-process-with-error/commit/22c4dd442dfea4b4b6eb23130e3cdd19be6257b5
[2225131]: https://github.com/ChristianGrete/exit-process-with-error/commit/2225131e8c5ae22a875b0eba56eba39e421cc0f7
[16a5a6b]: https://github.com/ChristianGrete/exit-process-with-error/commit/16a5a6bd75e02240c35eff0396ca4b96e7635e65
[0a1db76]: https://github.com/ChristianGrete/exit-process-with-error/commit/0a1db76033640a599f29d312207cdae3b8089744
[14c00dc]: https://github.com/ChristianGrete/exit-process-with-error/commit/14c00dca171260bbce142be1760e6502594bde08
[b71b777]: https://github.com/ChristianGrete/exit-process-with-error/commit/b71b777aabfd587adeadab1c5e2c3d177a6f9207
[bdb4e41]: https://github.com/ChristianGrete/exit-process-with-error/commit/bdb4e41716da2f818686757d72f5fb7015d9e6ee
[c446f09]: https://github.com/ChristianGrete/exit-process-with-error/commit/c446f09d864b28c45085fa9fd7129f861913bf1b
[40f0ace]: https://github.com/ChristianGrete/exit-process-with-error/commit/40f0acebc2b283627329ecafa2f167ba3dda4f31
[8dca1bf]: https://github.com/ChristianGrete/exit-process-with-error/commit/8dca1bfd57cd136333089efc67563dbfc00dd985
[c791b5d]: https://github.com/ChristianGrete/exit-process-with-error/commit/c791b5d2f73a7efdbdfee066b7f5fc53cc80f337
[67a7292]: https://github.com/ChristianGrete/exit-process-with-error/commit/67a7292886bee9b69cc2a41b5be8e5ef90f8e804
[17f2a4e]: https://github.com/ChristianGrete/exit-process-with-error/commit/17f2a4e644443bd69fe26d0faf4036fcdaccf0a8
[4792af8]: https://github.com/ChristianGrete/exit-process-with-error/commit/4792af8d99686c7d266af91c084f43968910d66c
[63ec1b8]: https://github.com/ChristianGrete/exit-process-with-error/commit/63ec1b8da331f30fad34e49fc77387897e9d69de
[db7457e]: https://github.com/ChristianGrete/exit-process-with-error/commit/db7457ed61e072473c43976a45c4dcbac63f54f3
[fb5ad3b]: https://github.com/ChristianGrete/exit-process-with-error/commit/fb5ad3b1ba7200338d614232ed7ce8f291eee4b9
[08e00a7]: https://github.com/ChristianGrete/exit-process-with-error/commit/08e00a78b19166c289705343dc64517f813cee23
[01d3999]: https://github.com/ChristianGrete/exit-process-with-error/commit/01d3999be448a676bf097cf9c5d2d5182cfddbdd
[ae646d5]: https://github.com/ChristianGrete/exit-process-with-error/commit/ae646d55ceec1a82cde4853a61f1054e3f3a6042
[c6f979d]: https://github.com/ChristianGrete/exit-process-with-error/commit/c6f979d022d81fd9ac0e8001fb38f33f5cf90171
[d81c3f8]: https://github.com/ChristianGrete/exit-process-with-error/commit/d81c3f8cb939fc9f1e8077642812f8efbe2b389e
[1f3fbc2]: https://github.com/ChristianGrete/exit-process-with-error/commit/1f3fbc2c58c5d4d671583e4aad0e35f252d745bc
[a4248db]: https://github.com/ChristianGrete/exit-process-with-error/commit/a4248dbd67771e541a2631679f94c4bc896a63e5
[8e1d126]: https://github.com/ChristianGrete/exit-process-with-error/commit/8e1d12609b36c4619f1cff14076fa24562284b33
[c3a485b]: https://github.com/ChristianGrete/exit-process-with-error/commit/c3a485ba40cf52ba987e69899531c2567ff365f9
[#2]: https://github.com/ChristianGrete/exit-process-with-error/issues/2
[65d6455]: https://github.com/ChristianGrete/exit-process-with-error/commit/65d6455df3357f86c14e6d871be3c0d82f1232f6
[49f2ae6]: https://github.com/ChristianGrete/exit-process-with-error/commit/49f2ae62a78dbbb4286ce0cb7a1cd7cf70d80bdf
[3f0ee43]: https://github.com/ChristianGrete/exit-process-with-error/commit/3f0ee437f130aa7b3a40e7954693a166fea67f6d
[51fbd3b]: https://github.com/ChristianGrete/exit-process-with-error/commit/51fbd3b621bb29093c16d25a1407bf01e51f7796
[8a23c67]: https://github.com/ChristianGrete/exit-process-with-error/commit/8a23c67777693109c99ff882fc81de9f738dd9b6
[08293a1]: https://github.com/ChristianGrete/exit-process-with-error/commit/08293a1f2d8dd8cdf5c2f4c81ed5fe3c0f2dd15a
[579b2d4]: https://github.com/ChristianGrete/exit-process-with-error/commit/579b2d4b083624f447241faf4efcf20fab417b07
[4b3e7d4]: https://github.com/ChristianGrete/exit-process-with-error/commit/4b3e7d49666ccbf9df8f58b58d61f24683e63938
[ef117d7]: https://github.com/ChristianGrete/exit-process-with-error/commit/ef117d76560dbe58f1786678e02a392315377c10
[a9a433b]: https://github.com/ChristianGrete/exit-process-with-error/commit/a9a433b963a926281a898e607c64513e3155a4b8
[b36daea]: https://github.com/ChristianGrete/exit-process-with-error/commit/b36daeaae7da6b68e414fc02239c3ec4c81a85ce
[c700b02]: https://github.com/ChristianGrete/exit-process-with-error/commit/c700b029741dcbdd46440ac5cbabf3ee3d0441b0
[#1]: https://github.com/ChristianGrete/exit-process-with-error/issues/1
[a3450e0]: https://github.com/ChristianGrete/exit-process-with-error/commit/a3450e04468fe2a3977e3baa77d177a55409761a
[51f4711]: https://github.com/ChristianGrete/exit-process-with-error/commit/51f4711e0f622b41158fc3c054ce93ec945fa806
[972703a]: https://github.com/ChristianGrete/exit-process-with-error/commit/972703aa8e219b87f38585cbf9631f0c43fd643c
[3f49e30]: https://github.com/ChristianGrete/exit-process-with-error/commit/3f49e305b5453ac6707f81ecde2103bf93e2d2f4
[develop]: https://github.com/ChristianGrete/exit-process-with-error/compare/master...develop
[master]: https://github.com/ChristianGrete/exit-process-with-error/compare/3f49e305b5453ac6707f81ecde2103bf93e2d2f4...master

---

Copyright © 2018 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url]

[keep-a-changelog-spec-url]: https://keepachangelog.com/en/1.0.0/
[repository-github-url]: https://github.com/ChristianGrete/exit-process-with-error
[repository-license-url]: LICENSE
[repository-owner-url]: https://christiangrete.com
[semantic-versioning-spec-url]: https://semver.org/spec/v2.0.0.html