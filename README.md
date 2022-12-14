# Frontend-React

An app to simplify, organize, and empower internet recipe storage. Pull recipes from the internet, or search for recipes in the Clickapea database. Once you save a recipe to your account, you can build meal planners and shopping lists using that recipe.

## Getting Setup

```bash
git clone git@gitlab.com/beepbeepgo/clickapea/services/frontend-react.git
cd frontend-react/
npm install
npm run build
npm start
```

### Testing

- TODO

## Wireframes

<details>
<summary>Homepage</summary>
<img src="https://i.imgur.com/ymcNtFQ.png">
</details>
<details>
<summary>Recipe View</summary>
<img src="https://i.imgur.com/SAjN0Zn.png">
</details>
<details>
<summary>Planner View</summary>
<img src="https://i.imgur.com/HSViDwj.png">
</details>
<details>
<summary>Cart View</summary>
<img src="https://i.imgur.com/BvNRujy.png">
</details>

## How to use

- Navigate to <a href="https://clickapea.herokuapp.com/" target="_blank">https://clickapea.herokuapp.com/</a>
- Login to create an account
- Search for a recipe or add a recipe url
- Add recipe to a recipe book
- Add recipe to a meal planner
- Add recipe to a cart

### Required Environment Variables

- REACT_APP_API_URL: defaults to `localhost:3001` but is the URL of the api.

## Features

- Import recipes from other sites
- Recipe data is downloaded and parsed, cleaned, and displayed
- 100s of sites work with the import
- Alternatively you can search the existing database of recipes
- When you find a recipe you like, you can add it to a recipebook, which will save that recipe to your account.
- You can add recipes in your account to the meal planner and/or generate a shopping list of ingredients for selected recipes

## Technologies

- Node.js
- React.js
- Bootstrap
