# Magic The Gathering

## Overview

Create a React CRUD app that fetches data from [Magic The Gathering's API] (https://docs.magicthegathering.io/).

## Features

- Read the cards - User can view a list of cards provided by the API. No need to add pagination, as long as one main page
  is shown with some hards. (Done)
- Create a card collection - User can add cards to collections (for example, having an add to favourites option).
  As a nice to have, the user can have multiple collections. (Done)
- Update the collection name . This is a nice to have. (Done)
- Delete cards from the collection and delete the collection itself. (Done)

## Technologies

- CSS Variables and Modules

## Prerequisites

Ensure you have the following installed:

In order to use the project, you will need the following:

- Install NVM [https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating]
- Install pnpm [https://pnpm.io/en/installation]

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/thorgotothegym/magic-the-gathering
cd magic-the-gathering

# Install dependencies
pnpm install
```

## Development

To start the development server:

```bash
pnpm run dev
```

This will launch the application at `http://localhost:5174/`.

### Code Structure

// TODO

```
📦 magic-the-gathering
├── 📂 src
│   ├── 📂 components    # Reusable UI components
│   ├── 📂 hooks         # Custom React hooks
│   ├── 📂 features      # Application pages
│   ├── 📂 services      # API calls and business logic
│   ├── 📂 store         # Global state management
│   ├── 📂 utils         # Utility functions and helpers
│   ├── 📂 assets        # Static assets (images, icons, etc.)
│   ├── App.tsx         # Main application entry
│   ├── main.tsx        # React root rendering
│   └── routes.ts       # Application routes
└── ...
```

## Build & Deployment

To build the project for production:

```bash
pnpm run build
```

This will generate an optimized `dist/` folder ready for deployment.

## Testing

Run tests with:

```bash
pnpm run test
```

## Linting & Formatting

Ensure code consistency with:

```bash
pnpm run lint
pnpm run format
```

## CI/CD Pipeline

This project includes a GitHub Actions pipeline for automated testing and deployment. Configure `.github/workflows/main.yml` according to your deployment strategy.

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## Contact

For any inquiries or issues, please reach out to [mail@mail.com](mail@mail.com) or open an issue on GitHub.

---

Happy coding! 🚀
