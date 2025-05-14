# Front-end Test

This project is using localStorage to persist a list of data, contains two pages "/" - in the home has a list of users and in the route "/criar-ou-editar" has a form to create ("/criar-ou-editar/[email]" it's a plus page to edit each user)

In [StorageManager](./services/storage-manager.ts) has a structure that isolute common operations like like read, edit, delete are using a Map() a feature from ES6+ each is possible select a key and value for each user, which could be used for another services similar to [UserService](./services/user.service.ts).

Using StorageManager:

```ts
// PROPERTY_TO_FAKE_PRIMARY_KEY - required to have a key to identify easly each data to Map() makes a better way to manage queries
const PROPERTY_TO_KEY_FAKE_PRIMARY_KEY = 'email' // email is name of the one property of the list
new StorageManager(LOCALSTORAGE_KEY, PROPERTY_TO_KEY_FAKE_PRIMARY_KEY)
```

Was used MUI because of the versality and easy to config, the theme config is in [Theme](./src/theme.ts). React Form Hook with Zod are being used to forms, and to validate CPF (Brazilian document) and Phone (Brazilian in pattern) was used Vanilla masks the smallest lib to makes this checks

Uni testing are implementated for verify how is working StorageManager, are important tests case to validates the integrity of the core of the app [see tests](./services/__tests__)

## Installing / Getting started

```shell
pnpm install
pnpm run dev
```

This installs all dependencies and starts the local development server.

## Developing

### Built With

- React/NextJS
- TypeScript
- MUI (Material UI)
- React Form Hook
- Zod

### Prerequisites

- [Node.js](https://nodejs.org/) (18.17+)
- [npm](https://www.npmjs.com/) (9+) or [pnpm](https://pnpm.io/) (9+)
- Git

### Setting up Dev

```shell
git clone https://github.com/gabsgasps/test-frontend-react
cd your-project/
pnpm install
```

This clones the repository, navigates into the project folder, and installs dependencies.

### Building

```shell
pnpm run build
```

This compiles the TypeScript and bundles the project for production using Turbopack.

## Tests

This project uses [Vitest](https://vitest.dev/) for unit testing.

To run the tests:

```shell
pnpm run test
```

Test utilities include:

- `@testing-library/react`
- `@testing-library/dom`
- `jsdom`

## Style guide

Explain your code style and show how to check it.

```shell
Components:
    /ComponentName/ComponentName.tsx - naming in PascalCase
Not Components:
    /util/util.ts - naming in lower case or kebab-case
```

## Licensing

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.
