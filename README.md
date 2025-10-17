# Task Manager

A simple task manager application that allows users to create, edit, delete, and update tasks. Users can also log in and register to manage their tasks.

## Folder Structure

```
d:\Pre-training\Tasks\pre_training_tasks_manager_ui\
├───.eslintrc.cjs
├───.gitignore
├───.prettierrc
├───eslint.config.js
├───index.html
├───package-lock.json
├───package.json
├───tsconfig.app.json
├───tsconfig.json
├───tsconfig.node.json
├───vite.config.ts
├───.git\...
├───.husky\
│   ├───pre-commit
│   └───_\
├───.vite\
│   └───deps\
│       ├───_metadata.json
│       └───package.json
├───node_modules\...
├───public\
│   └───vite.svg
└───src\
    ├───App.css
    ├───App.tsx
    ├───main.tsx
    ├───components\
    │   ├───Form\
    │   │   ├───Form.css
    │   │   ├───Form.tsx
    │   │   └───Form.types.ts
    │   ├───Header\
    │   │   ├───Header.css
    │   │   └───Header.tsx
    │   ├───Loader\
    │   │   ├───Loader.css
    │   │   └───Loader.tsx
    │   ├───Notification\
    │   │   ├───Notification.css
    │   │   └───Notification.tsx
    │   └───TaskEditDialogue\
    │       ├───TaskEditDialogue.tsx
    │       └───TaskEditDialogue.types.ts
    ├───constants\
    │   ├───labels.ts
    │   └───service.ts
    ├───global\
    │   ├───constants.ts
    │   ├───store.tsx
    │   ├───store.types.ts
    │   └───features\
    │       ├───tasksSlice.tsx
    │       ├───themeSlice.tsx
    │       └───userSlice.tsx
    ├───hoc\
    │   └───ErrorBoundary.tsx
    ├───organisms\
    │   ├───Auth\
    │   │   ├───Auth.config.ts
    │   │   ├───Auth.css
    │   │   └───Auth.tsx
    │   └───TasksSection\
    │       ├───TasksSection.css
    │       └───TasksSection.tsx
    ├───services\
    │   ├───authService.ts
    │   └───taskService.ts
    └───views\
        ├───Home.css
        └───Home.tsx
```

## Getting Started

### Prerequisites

- Node.js and npm (or yarn/pnpm) should be installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd pre_training_tasks_manager_ui
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the codebase.
-   `npm run format`: Formats the code using Prettier.
-   `npm run preview`: Serves the production build locally.

## Features

-   User registration and login.
-   Create, Read, Update, and Delete (CRUD) operations for tasks.
-   A responsive and user-friendly interface.

```