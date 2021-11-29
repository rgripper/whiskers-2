# Frontend

Starting:

```
yarn start
```

Cypress tests (check out `frontend\cypress\integration\search.spec.js`)

```
yarn cypress:open
```

## Libraries

- React
- Typescript
- Cypress
- Vite

# Backend

It is built using Serverless meant to run on Node14.

## Running

First make sure to `yarn install`.

`yarn watch` - watches and rebuilds typescript code into Node14 compatible code in `dist` folder.
`yarn start` - runs serverless in offline mode

To develop, you would run `yarn watch` in one terminal and `yarn start` in another (otherwise `serverless-offline` complains about something related ot terminal interactive mode).

## Testing

Testing is run on `jest` with `supertest`.
`swc` is used to transform Typescript (it is much faster than `babel` and `ts-jest` transpilers)

## Building

`yarn build` is using `esbuild` to transpile Typescript down to JS supported on Node14.

## Serverless

Right now App is running on serverless with intention to be deployed on AWS and intercept calls on wildcard routes using the following:

```yaml
path: /{any+}
method: any
```

Actual routing and validation is performed by `express`.

## Unimplemented ideas

If there are more endpoints, I would use GraphQL on top of serverless (e.g. `apollo-server-lambda`) (I find GraphQL schema language is easier to work with and has better tooling than OpenAPI). Otherwise I'd use a more declarative REST library like NestJS with decorators.

I would maybe create terraform deployment instead of serverless to have more control (e.g. to run on Node v16, which is at LTS but still doesn't seem to be supported by serverless).

# TODO:

Build a pipeline using Github Actions (to deploy serverless on AWS and frontend on Netlify)

Add unit tests with `jest` + `react-testing-library` on the frontend.
