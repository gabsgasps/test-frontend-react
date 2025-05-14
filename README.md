## Front-end Test

This is a simple CRUD application for managing a user list using `localStorage`. It includes a form with validation for Brazilian-specific fields (CPF and phone number), unit tests for the core logic, and a styled UI using MUI.

### Overview

There are two main routes:

- `/`: Displays the list of users.
- `/criar-ou-editar`: Contains the form to create or edit users.
- (plus) `/criar-ou-editar/[email]`: A dynamic route used for editing a specific user by their email.

### Using StorageManager

[StorageManager](./services/storage-manager.ts) abstracts common operations like read, edit, and delete using a Map() allowing efficient data management, which could be used for another services similar to [UserService](./services/user.service.ts).

To manage user data via `localStorage`, we use a class called `StorageManager`, which wraps the data in a `Map()` and allows common CRUD operations. It requires a unique key to identify each object (in this case, the user's email):

```ts
const PROPERTY_TO_KEY_FAKE_PRIMARY_KEY = 'email'
new StorageManager(LOCALSTORAGE_KEY, PROPERTY_TO_KEY_FAKE_PRIMARY_KEY)
```

#### **UI & Validations**

The UI is built with Material UI (MUI) for its flexibility and easy customization. The theme configuration is located in [Theme](./src/theme.ts).

Forms are handled using React Form Hook with Zod are being used to forms, was used the "vanilla-masker" library to validate and format Brazilian CPF and phone number inputs efficiently.

#### **Unit testing**

Unit testing are implementated for verify how is working StorageManager, are important tests case to validates the integrity of the core of the app [see tests](./services/__tests__)

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

- **Components** should be in PascalCase:  
  `/components/UserCard/UserCard.tsx`
- **Utilities and helpers** in kebab-case or lower case:  
  `/utils/cpf-validator.ts`

## Licensing

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.
