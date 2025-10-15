# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Project structure

Top-level files and folders included in this template:

- `index.html` — Vite entry HTML file
- `package.json` — npm scripts and dependencies
- `vite.config.ts` — Vite configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript configuration
- `src/` — application source files
  - `App.tsx`, `main.tsx`, `App.css` — app entry and styles
  - `components/` — small, reusable components (Header, Loader, Notification, TaskEditDialogue)
  - `global/` — global store and RTK slices (store.tsx, features/*)
  - `hoc/` — higher-order components (ErrorBoundary)
  - `Organisms/` — larger composed UI pieces (TasksSection)
  - `services/` — API services (authService.ts, taskService.ts)
  - `Views/` — page views (Home, Login, Register)
- `public/` — static assets

> Note: The workspace used for the pre-training task includes additional CSS and TSX files under `src/` as listed above.

## Setup & Run (Windows PowerShell)

The project uses npm/Yarn/pnpm-compatible scripts defined in `package.json`. Below are example commands for Windows PowerShell. Run them from the project root (where `package.json` is).

1. Install dependencies

```powershell
# npm
npm install

# or with yarn
yarn

# or with pnpm
pnpm install
```

2. Start dev server (Vite)

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Lint the project

```powershell
npm run lint
```

5. Preview production build locally

```powershell
npm run preview
```

Troubleshooting tips

- If TypeScript build fails during `npm run build`, make sure TypeScript version matches the `tsconfig` requirements and run `npx tsc -v` to check the installed tsc.
- If ports are occupied when running `npm run dev`, set the `PORT` environment variable or close the conflicting process. Example for PowerShell:

```powershell
$env:PORT = 3001; npm run dev
```

If you'd like, I can also add a short CONTRIBUTING or DEVELOPMENT guide, or update `package.json` scripts to include a cross-platform helper like `cross-env`.
