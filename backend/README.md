# Backend

A testing application built with [NestJS](https://nestjs.com/) to test integration with the ChatGPT API using the [OpenAI](https://www.npmjs.com/package/openai) Node.js library.

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in the `.env` file (e.g. your OpenAI API key).

3. Start the application in development mode:
   ```bash
   npm run start:dev
   ```

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `build` | `nest build` | Compiles the application |
| `format` | `prettier --write "src/**/*.ts" "test/**/*.ts"` | Formats source and test files with Prettier |
| `start` | `nest start` | Starts the application |
| `start:dev` | `nest start --watch` | Starts the application in watch mode (auto-restarts on file changes) |
| `start:debug` | `nest start --debug --watch` | Starts the application in debug mode with watch |
| `start:prod` | `node dist/main` | Runs the compiled application from the `dist` folder |
| `lint` | `eslint "{src,apps,libs,test}/**/*.ts" --fix` | Lints and auto-fixes TypeScript files |
| `test` | `jest` | Runs unit tests |
| `test:watch` | `jest --watch` | Runs unit tests in watch mode |
| `test:cov` | `jest --coverage` | Runs unit tests with code coverage report |
| `test:debug` | `node --inspect-brk ... jest --runInBand` | Runs tests with Node.js debugger attached |
| `test:e2e` | `jest --config ./test/jest-e2e.json` | Runs end-to-end tests |
