# GitHub Repositories Explorer

This project is a GitHub Repositories Explorer application built with React, TypeScript, Material-UI, and Redux Toolkit. The application allows users to search and filter GitHub repositories by language and keywords. It also supports sorting, pagination, and remembers the user's state even after the page is closed. The application is fully responsive and accessible on mobile devices.

## Features

- Search GitHub repositories by keywords.
- Filter repositories by programming languages (JavaScript, Scala, Python).
- Sorting by stars, forks, and last update date.
- Pagination support.
- Remembers the state between sessions.
- Fully responsive design.

## Technologies Used

- React
- TypeScript
- Material-UI
- Redux Toolkit
- Axios
- SCSS Modules
- Jest and React Testing Library

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the application in development mode, run:

```bash
npm run dev
# or
yarn run dev
```
The application will be available at http://localhost:3000.

### Running tests

To run the unit tests, use:

```bash
npm run test
# or
yarn run test
```

### Running linter

To run the linter check, use:

```bash
npm run lint
# or
yarn run lint
```

### Folder Structure
```bash
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── LanguageSelector.tsx
│   │   ├── RepositoryTable.tsx
│   │   ├── SearchInput.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── __tests__
│   │       ├── LanguageSelector.test.tsx
│   │       ├── RepositoryTable.test.tsx
│   │       ├── SearchInput.test.tsx
│   │       └── StatusIndicator.test.tsx
│   ├── redux
│   │   ├── slices
│   │   │   └── repositorySlice.ts
│   │   ├── store.ts
│   │   └── __tests__
│   │       └── repositorySlice.test.ts
│   ├── App.tsx
│   ├── App.module.scss
│   ├── index.tsx
│   └── index.scss
└── package.json

```


## Usage

### Language Selector

Allows the user to select a programming language. The selected language is used to filter the search results.

### Search Input

A text input field where the user can enter keywords to search for repositories. The search is performed automatically as the user types.

### Status Indicator

Displays the status of the last request (loading, succeeded, failed).

### Repository Table

Displays the list of repositories with details such as ID, username, description, stars, forks, and last update date. Supports sorting and pagination.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [GitHub API](https://developer.github.com/v3/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://material-ui.com/)
