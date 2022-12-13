import tokenService from './tokenService';

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/api/users/`;

function signup(user) {
  //console.log(user, '<-user in signup');
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Email already taken!');
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(creds)
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Password and email do not match');
    })
    .then(({ token }) => tokenService.setToken(token));
}

function update(updateData) {
  console.log(updateData, '<-updateData');
  return fetch(BASE_URL + 'update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  }).then((res) => {
    console.log(res, '<-res');
    if (res.ok) return res.json();
    throw new Error('Update failed!');
  });
}

const userService = {
  signup,
  getUser,
  logout,
  login,
  update
};

export default userService;
