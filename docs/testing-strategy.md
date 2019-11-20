# Testing Strategy

## Unit tests

Unit tests should be written for all new pieces of code going into the code base. If old code is being altered then the tests need to be altered to match where apropriate and if necessary new tests written to cover the new cases.

### Test Cases

Test cases need to be generated for each function / component being tested. These should include tests cases for Normal, Extreme and Error conditions and if necessary Edge cases need to be covered as well. Consider the following function:
> **Note:** We use TypeScript so the ususal error testing in JS can be simplified to eroneous input that is still type valid as the compiler will test the types for us.

```ts
const someFunc = (op: string, ...numbers: number[]): number => {
  let answer: number;
  if (!numbers || numbers.length < 1) {
    return NaN
  }
  switch (op) {
    case 'sum':
      return numbers.reduce((a, b) => a + b, 0)
    case 'avg':
      return numbers.reduce((a, b) => a + b, 0) / numbers.length
    case 'min':
      return Math.min(...numbers)
    case 'max':
      return Math.max(...numbers)
    default:
      console.log('op not recognised')
      return NaN
  }
}
```

This could be tested with a single test for each `op` parameter, this would suffice for code coverage but would not cover all of the applicable test cases. What happens if it was called with the following calls:

```js
   someFunc('tree', 1, 2, 3, 4) // Error case
   someFunc('sum', 1, 2, 3, 4) // Normal case
   someFunc('', 1, 2, 3, 4) // Error case
   someFunc('max', 1, 2, 3, 4...) // 1 million int arguments, Extreme case
```

These four tests would not be needed as individual tests to test the function to a reasonable standard. We do not want to check every possible input as that would take far too long to both code and execute. Test cases can overlap and multiple cases can be executed from a single test. This can be written like so:

```ts
describe('someFunc Tests', (): void => {
  // Error
  it('should handle incorrect op parameter', (): void => { // this test will be the only one we need in TS for testing an incorrect operator
    expect(someFunc('tree', 1, 2, 3)).toBe(NaN)
  })

  // Extreme
  it('should be able to handle large amounts of input', (): void => { // this test could be duplicated for the other operators depending on the complexity of the code involved.
    expect(someFunc('sum' /* lots of numbers */)).toBe(/*correct result */)
  })

  // Normal
  it('should return the average of a series of numbers passed in', (): void => {
    expect(someFunc('avg', 1, 2, 3)).toBe(2)
  }) // similar tests for normal cases for each op
})
```

> **Note** Writing these tests should indicate that the type of the `op` argument could be changed to `'sum' | 'avg' | 'min' | 'max'` and the default case removed.

### Mocking

When we unit test a file / function / component everything not part of it should be mocked out. This is to prevent failures in other parts of the code muddying up our tests. For Example:

```ts
import fileService, { File } from './fileService'

const fileTitleNormaliser = (fileId: string): boolean => {
  const file: File = fileService.getFile(fileId)
  file.title = file.title.toLowerCase()
  return fileService.updateFile(file) // returns boolean true or false for success / failure
}
```

In the above code the fileService may be third party so out of scope for our unit tests or it may just be in another part of the repo, either way its a point of failure that we are not concerned with in this test so it needs to be mocked out:

```ts
import fileService, { File } from './fileService'
const getFileMock =  jest.fn().mockImplemnentation((): File => ({title: 'aBcDeF'}))
const updateFileMock =  jest.fn().mockImplemnentation((): boolean => true)
jest.mock('./fileService', (): any => {
 return jest.fn().mockImplementation((): any => {
   return {getFile: getFileMock, updateFile: updateFileMock}
 });
);

describe('fileUtils', (): void =>{
   beforeEach((): void => {
       getFileMock.mockClear()
       updateFileMock.mockClear()
   })

   it('should make titles lower case', (): void => {
       expect(fileTitleNormaliser('someId')).toBe('abcdef')
       expect(getFileMock).toHaveBeenCalledTimes(1)
       expect(updateFileMock).toHaveBeenCalledTimes(1)
       expect(updateFileMock).toHaveBeenCalledWith({title: 'abcdef'})
   })
})
```

We can utilise the jest mocking for these as demonstrated above and this allows us to spy on the functions to ensure that they have been called the correct number of times and with the correct arguments. The mocks should be reset between tests to avoid cross test contamination. For react components it is not necessary to mock out child components that are for display only, if they are executing logic that can affect the tests then they should be replaced with mocked components. 

If the component being mocked out is needed in multiple files then it should have a helper function to create the mock, this should live with the mocked component and its tests, For Example:

```
/src
    /folder/
        foo.ts
        foo.test.ts
        bar.ts
        bar.test.ts
        bar.mock.ts
        baz.ts
        baz.test.ts
```
Here we suppose that bar is used in both `foo.ts` and `baz.ts` so we mock it out and keep it adjacent to its real implementation so its clear where it is and what it does.

### File Structure

As above unit tests should be placed alongisde the file they are testing with the .test appended to the filename before the extension, these will then be automatically picked up by jest. This is also for clarity of what has been tested and makes it easier to locate the apropriate tests when working on a file.

## Integration Tests

The integration tests are to test across a layer of the code base. It is important that these are easy to run from both the developer machines and the CI and these should be run before any code is pushed to the remote branch (although not with a git hook, just good practice).

### Browser Tests

The browser tests should run on PRs and merges to master in the CI and should be used to test the flow of the client without the real backend present. As each UX component should be unit tested, these tests should focus on the communitcation and interaction between the components and pages. An added bonus of mocking out the server is that we can use this to ensure we have a good sample set of data being returned which will allow us to test all of the functionality of the front end. These tests should include things like the Submission Wizzard steps retaining the information from the previous steps and that the next button is disabled while an autosave is in progress. 

The browser tests should: 
- be quick to run (on a single browser)
- be run on PRs.
- use a mocked out back end.
- only test UX interactions and not communication between client and server (for example if upload too many documents does the validation warning appear and disable the upload button) 
- should be able to run in parallel

#### Page Objects

The acceptance tests should use a code based representation of each page / step of the application when testing through the client. This should model user action rather than elements on the page. For example on the Author Details step of the form we would have: `setAuthorName` rather than `setAuthorTextBox`. The premise behind this is that no matter what tests use the page objects if the UX changes then we only have to change one piece of code rather than every test and it makes writing regression tests easier.

#### Nightwatch
Nightwatch uses selenium under the hood and is a quick and powerful testing library that runs on nodejs. The tests are simple to write and the library is easy to set up. It has no native understanding of typescript so the tests need to be compiled before they run. The tests are simple to write and follow a logical pattern for waits and finding elements. Nightwatch can take an optional parameter to slow down the tests to more accurately simulate human interactions which will be useful for testing any look ahead searches (like on the new people picker designs).

```js
module.exports = {
  "Test Form": function(browser) {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("form")
      .setValue("input[name=name]", "Errol")
      .setValue("input[name=age]", "42")
      .setValue("select[name=favouriteColour]", "purple")
      .click("button[type=select]")
      .waitForElementVisible("h2")
      .assert.containsText(
        "h2",
        "Recieved Errol who is 42 years old and their favourite colour is purple"
      )
      .end();
  }
};
```
this test on a local dev machine takes around 7 seconds, including starting up the test framework and browser.

For more detail on browser tests see the browser tests document in [reviewer-client](https://github.com/libero/reviewer-client/blob/master/docs/adr/browser-testing.md).

### API Tests

The purpose of API testing is to check that the server responds in a sensible way for a given input. API tests typically submit data to the server through a GraphQL mutation, and then check that the data was properly persisted by querying it again in a way similar to how to the client would request the data, and asserting on the response. This allows the team to recreate situations in the server-side that are difficult to reliably test with browser tests. It also checks that the API remains stable between client and server.

#### Example tests

To write a minimal example for a new resolver, you'd have to do something like the following:

> Where the resololver takes a parameter of type `{a: string}` and returns an object with type `{b: number}`

- first write the graphql definitions
- Then in API-tests, you can do a `yarn graphql:codegen`, this will generate type definitions for all resolvers published by the application
- Have a look in `tools/api-test/src/generates/graphql.ts`, and find the types for your new resolver
- Write a resolver caller like this

```ts
import {
  NewResolver,
  NewResovlerOutput,
  NewResolverInput,
} from '../generated/graphql'
import { ApiState } from './index'
import { withAuthorisation } from '../utils'

const newResolver = async (
  ctx: ApiTestContext,
  data: NewResolverInput,
): Promise<{ newResolver: NewResovlerOutput }> => {
  const query = `
mutation NewResolver($data: NewResolverInput!) {
 newResolver(data: $data) {
   ...NewResolverOutput
   __typename
 }
}
`

  // Call the graphql and return the result
  return await withAuthorization(context, query, data)
}

const resolvers = { mutation: { newResolver } }

export default resolvers
```

- Then in the test file (inside of `/tools/api-test/src/api-test/context.ts)

```ts
import { test, TestContext } from 'ava-ts'
import context from '../xpub-api/context'
import { defaultContext } from '../index'

test('it does the thing', async (t: TestContext) => {
  const context = defaultContext()
  const result = await context.mutation.newResolver(context, {
    a: 'some string',
  })
  t.deepEqual({ b: 100 }, result, 'it does the thing as expected')
})
```

- This test should now run as part of the test suite

#### Running it

```bash
# You need the platform running
# pwd = elife-xpub/
# Start the server inside of docker
./scripts/run_app_in_docker.sh

# Go to the api tests
cd tools/api-tests
# pwd = elife-xpub/tools/api-tests

# You should just be able to do this:
docker-compose build
JWT_SECRET=<jwt secret here> docker-compose up
```

#### What to test?

When writing integration tests we want to be testing the api endpoints for the server. We want to test the that the endpoint is acting in an expected and idempotent way. For example, calling `updateManuscript` via the graphql resolver should return an expected and correct result given sensible input and it should return the same result every time.

## Acceptance Tests

The acceptance tests are a suite of end-to-ends test that focus only on the Libero Reviewer application group.

### What to test?

For the acceptance tests we want to run them accross the entire collection of user stories. For example:

- "As a user I may want to change the file I uploaded when creating a submission"
- "As a user I want to be able to exclude a reiewer who I do not trust to be objective"
- "As a user I want to be able to upload my cover letter as a pdf / word document"
  These are just some samples but we can use the flow charts the UX team created to ensure that all paths are converted into user stories and tests.
- "As an administrator I want to be able to check the audit trail of a manuscript"

### Client Tests

The acceptance tests that interface with the client should use the same [page objects](#Page-Objects) as the client browser tests.

### Long and Short running tests

As we get more acceptance tests we will start to run into problems with how long it takes the tests to run on a PR and on local machines. This problem can be solved by having a long set of tests and a short set of tests. The long tests will just be all of the tests wheras the short running tests will be a basic happy path testing a few cases, these should be run on PRs and locally and the long running tests can be a nightly task or run before deployment to production.

### Running the Tests

Acceptance test take time to run, ideally the tests should be able to run in parallel which will require the tests to be written independant of what is currently in the database and should be able to run on the developer machines and in the CI without any additional effort on either side. The tests are currently planned to be done with [Nightwatch](#Nightwatch). The tests should have a quick and long run tag so we can have a set of tests that run on push to a PR that wont take hours and a set of full tests that run nightly and/or on production builds.

## Regression Testing

Regression tests are for testing a specific bug that is being or has been fixed to ensure it is not accidentaly re-added to the product. In an ideal world before fixing any bug a regression test should be written and the bug is fixed when the test passes, however in reality not every bug will require one or it may not be something that is easilly testable. Regression tests should be clearly marked with a comment and the ticket number for the bug so if it starts to fail it is easy to go back and find the original issue and a summary of what happened in the original investigation.

### Where should regression tests live?

Regression tests can be any type of tests and they should be part of the test files for the apropriate item being tested. For example if there is a bug in some internal server logic then the regression test will most likely be a unit test and will be added to the test file for the file being fixed, if the bug is over many files then it will be an integration test and will be placed in the test for the api(s) being called. For UX bugs the regression test will similarly live in the unit tests for the component or if its a larger issue in the browser test for the page(s).

### When should the regression tests be run?

The regression tests should be run as part of the long running acceptance tests rather than the happy path tests. There will potentially be a lot of tests depending on the number of bugs discovered and whether they require regression tests to cover the future.
