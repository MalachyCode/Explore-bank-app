import axios from 'axios';
import { LoginType } from '../types';
const baseUrl = '/api/login';
// const baseUrl = 'http://localhost:3001/api/login';

const login = async (credentials: LoginType) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
