import tokenService from './tokenService';

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/api/recipes`;

export function addRecipe(recipeURL) {
  const cleanURL = encodeURIComponent(recipeURL.query);
  const queryURL = `${BASE_URL}/import/${cleanURL}/`;
  return fetch(queryURL, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response);
    });
  });
}

export function findRecipe(query) {
  const cleanURL = encodeURIComponent(query.query);
  const queryURL = `${BASE_URL}/search/find/${cleanURL}/`;
  return fetch(queryURL, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) return res.json();
    return { error: 'Recipe does not exist' };
  });
}

export function getDishTypes() {
  const queryURL = `${BASE_URL}/search/dish-types`;
  return fetch(queryURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response);
    });
  });
}

export function getDishTypeByCategory(category) {
  if (typeof category !== 'undefined') {
    const queryURL = `${BASE_URL}/categories/dish-types/${category}`;
    return fetch(queryURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((response) => {
        console.log(response);
        throw new Error(response);
      });
    });
  }
}

export function getRecipeCategories(category) {
  if (typeof category !== 'undefined') {
    const queryURL = `${BASE_URL}/search/dish-types/${category}`;
    return fetch(queryURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((response) => {
        console.log(response);
        throw new Error(response);
      });
    });
  }
}

export function getRecipes(data) {
  const queryURL = `${BASE_URL}/search/ingredients`;
  return fetch(queryURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response);
    });
  });
}

export function getNewRecipeImages() {
  const queryURL = `${BASE_URL}/search/new`;
  return fetch(queryURL, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response);
    });
  });
}

export function searchRecipes(query) {
  const queryURL = `${BASE_URL}/search/${query}`;
  return fetch(queryURL, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response);
    });
  });
}

export function updateFavorite(recipeID, profileID) {
  const queryURL = `${BASE_URL}/favorite/update/${recipeID}/${profileID}`;
  return fetch(queryURL, {
    method: 'GET'
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response);
    });
  });
}
