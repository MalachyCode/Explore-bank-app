import axios from 'axios';
import { User } from '../types';
const baseUrl = 'http://localhost:3001/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newUser: User) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { getAll, create };
