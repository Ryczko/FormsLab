/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
});

export const getFetch = <Res>(url: string, params = {}) => {
  return instance<Res>({
    method: 'GET',
    url,
    params,
  }).then((response) => response.data);
};

export const postFetch = <Req = any, Res = any>(url: string, data: Req) => {
  return instance<Res>({
    method: 'POST',
    url,
    data,
  }).then((response) => response.data);
};

export const patchFetch = <Req = any, Res = any>(url: string, data: Req) => {
  return instance<Res>({
    method: 'PATCH',
    url,
    data,
  }).then((response) => response.data);
};

export const putFetch = <Req = any, Res = any>(url: string, data: Req) => {
  return instance<Res>({
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
