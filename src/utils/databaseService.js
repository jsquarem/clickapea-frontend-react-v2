const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/api/database`;

async function populateImported() {
  const queryURL = `${BASE_URL}/populate`;

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

const databaseService = {
  populateImported
};

export default databaseService;
