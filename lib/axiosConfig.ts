import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
});

export const getFetch = <T>(url: string, params = {}) => {
  return instance<T>({
    method: 'GET',
    url,
    params,
  }).then((response) => response.data);
};

export const postFetch = (url: string, data = {}) => {
  return instance({
    method: 'POST',
    url,
    data,
  }).then((response) => response.data);
};

export const patchFetch = (url: string, data = {}) => {
  return instance({
    method: 'PATCH',
    url,
    data,
  }).then((response) => response.data);
};

export const putFetch = (url: string, data = {}) => {
  return instance({
    method: 'PUT',
    url,
    data,
  }).then((response) => response.data);
};

export const deleteFetch = (url: string) => {
  return instance({
    method: 'DELETE',
    url,
  }).then((response) => response.data);
};
