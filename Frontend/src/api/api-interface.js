import axios from 'axios';
const API_BASE_URL="http://localhost:5000/api";

export const NOTOKENPOST = (path, data) => {
  return axios.post(API_BASE_URL + path, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const POST = (path, data) => {
  const token = localStorage.getItem('token');

  return axios.post(API_BASE_URL + path, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GET = (path) => {
  const token = localStorage.getItem('token');

  return axios.get(API_BASE_URL + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};


