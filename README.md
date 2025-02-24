# Magic The Gathering

## Overview

Create a React CRUD app that fetches data from [Magic The Gathering's API] (https://docs.magicthegathering.io/).

## Architecture

When entering the app there are several things that must be taken into account.

- The app has been tested in Chrome, Firefox and in Brave Browser in the last two versions of each browser.
- The app saves its data in the localStorage.
- Something to improve is, when the first card collection is created, the changes are not reflected, you have to refresh the browser, then from the second one onwards there is no problem.

The app has been distributed in the following way:

```
📦 magic-the-gathering
├── 📂 src
│   ├── 📂 components    # List of components: Card, to show the cards, a <Modal /> to show the actions of adding, editing, deleting.
│   ├── 📂 hooks         # useCarID => Hook that calls /cards/:id
                          useCollections: Here are the addCardToCollections that adds cards to a collection and the RemoveCardFromCollections, which removes cards from a collection (These two options do not have a visual component that makes it show in the UI if the card already exists or when a card is deleted, this is shown in a console.log())
                          The useGetAllCards, hook that manages the 'cards' call
                          The useLocalStorage, hook that is in charge of entering and removing data from the localStorage.
│   ├── 📂 features      # The two features that show the list of cards <CardList /> and <Collections /> which are the collections of cards
│   ├── 📂 services      # I used axios to create an instance of the magic call so it can be reused. Easily maintainable and extensible.
│   ├── 📂 layout        # I have created a simple layout with a minimal structure so that the features are rendered within a <main></main>.
│   ├── 📂 router        # I created a minimal router to do lazy loading
│   ├── 📂 type          # Here are the types that are cross for the app.
│   ├── App.tsx         # Point where the router is imported
│   ├── index.css        # Here are the css variables that are cross and the definition of html elements and classes cross to the app.
│   ├── main.tsx        # React root rendering / Entry point.
│   └── routes.ts       # Application routes
└── ...
```

## Features

- Create a card collection
  User can add cards to collections (for example, having an add to favourites option).
  As a nice to have, the user can have multiple collections.

- Read the cards: User can view a list of cards provided by the API. No need to add pagination, as long as one main page
  is shown with some hards.

- Update the collection name: This is a nice to have.

- Delete: Delete cards from the collection and delete the collection itself.

- The Create, Update and Delete actions don't need to be permanent (nice to have).

## WorkFlow

Workflow:

The app is deployed here https://magic-the-gathering-six.vercel.app/.

- When we enter the first thing we see are two things: the <Collections /> is where the collections are managed (Create collections, Edit, Delete and add collections).

- First you have to click on add collections and a <Modal /> will appear for you to create the collection, once created it will appear in 'The first load of the first collection sometimes does not appear if it does not appear, click on refresh and it will appear', it is a small improvement noted.

- When we have already created our collection, we will see different buttons, add to favorites (when we add it, we see that the collection shows a border and when we remove it from favorites it is removed).
- We can change the name of the collection, we click on edit, we change the name and it will be reflected immediately.
- We can delete a collection and it will notify us that the change is not reversible.
- If we want to add cards to a collection, we can do it in two ways: by clicking on the cards in the list and the <Modal /> will appear and ask us where we want to add it. We just have to click on the drop-down menu and it will be added. If we click on one by one with a few seconds between adding one card and another, everything is ok. We have to keep in mind that the first time we add cards when saving, it works fine, but then when reading for the first time sometimes it doesn't show up, it reloads the browser.
- It has been tested to add 5/6 collections with 7/8 cards, the functionality is prepared so that there are no limitations.
- We can add cards that are not in the list we see, you can add the cards by entering 6 digits and it will call the API, if the card is there it will let us add it, if not, it won't.
- If we try to add a card that already exists, it won't let us and it will show us a message in the console log and if we delete the card, it will delete it and a message will appear in the console.log.

## Technologies

- React
- Typescript
- CSS Variables and CSS Modules
- Axios
- LocalStorage
- Vite
- Vitest Jest

## Prerequisites

Ensure you have the following installed:

In order to use the project, you will need the following:

- Install NVM [https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating]
- Install pnpm [https://pnpm.io/en/installation]

- The app is using nvm to manage the node version which is v20.17.0 and to manage the pnpm packages: 10.4.1.

- I had to remove the engines from the package, since vercel does not have certain versions of pnpm installed,

"engines": {
"pnpm": "10.4.1",
"node": "20.17.0"
},

- Unless it is something different, my way of working is to take out a branch, work on it and then merge the main one, here this process has been followed, take out a branch from main 'git checkout -b branch'. Comfortable, organized and easy way to work

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

## Build & Deployment

When we merge into main it automatically deploys to Vercel

```bash
pnpm run build
```

## Testing

Run tests with:

```bash
pnpm run test
```

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## Contact

For any inquiries or issues, please reach out to [thorgoestothegym@gmail.com](thorgoestothegym@gmail.com) or open an issue on GitHub.

---

Happy coding! 🚀
