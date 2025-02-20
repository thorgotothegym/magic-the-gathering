import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.magicthegathering.io/v1/',
});
