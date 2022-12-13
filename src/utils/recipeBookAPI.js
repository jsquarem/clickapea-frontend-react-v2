import tokenService from './tokenService';

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/api/books`;

export function create(recipeBook) {
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(recipeBook),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(
      'Bad Credentials, Check Your server terminal for more information'
    );
  });
}

export function getBooks() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(
      'Bad Credentials, Check Your server terminal for more information'
    );
  });
}

export function addRecipeToBook(url) {
  const requestUrl = `${BASE_URL}/${url}`;
  return fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  }).then((res) => {
    console.log(res, '<-res');
    if (res.ok) return res.json();
    throw new Error(
      'Bad Credentials, Check Your server terminal for more information'
    );
  });
}
