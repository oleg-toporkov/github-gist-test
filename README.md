# REST API Test Automation for GitHub Gists #

### Based on ###

* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [Mocha](https://mochajs.org/) - Test framework with TDD/BDD style
* [Chai](http://chaijs.com/) - Assertion library
* [Supertest](https://github.com/visionmedia/supertest) - REST API testing automation tool


### Prerequisites ###

* [Node.js](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

### Set up ###

First, install all dependencies using running [NPM](https://www.npmjs.com/) from root folder as current working directory

```
#!bash
npm ci
```


### Running tests ###

Run all tests

```
#!bash
npm run test
```


## Testing code improvements
* Add JSON schema validation
* Add DTO objects for response body as well
* Add more logging
* Add nice report
* Extract common response body checks
