import { useQuery } from 'react-query';

const baseUrl = 'https://localhost:3001';

const tmpToken = '';

export const useEndpoint = (endpoint, dataIdentifier, method = 'GET', inputData = null) => {
  const url = baseUrl + endpoint;

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tmpToken
    }
  };

  return useQuery([dataIdentifier, inputData], async () => {
    if (inputData) options.body = JSON.stringify(inputData);
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  });
};

//generic post request
export const postData = async (endpoint, inputData) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tmpToken
    },
    body: JSON.stringify(inputData)
  });
  return res.ok;
};

//generic put request
export const putData = async (endpoint, inputData) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tmpToken
    },
    body: JSON.stringify(inputData)
  });
  return res.ok;
};
