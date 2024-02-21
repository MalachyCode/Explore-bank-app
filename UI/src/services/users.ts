import axios from 'axios';
import { NewUser } from '../types';
const baseUrl = 'http://localhost:3001/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newUser: NewUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { getAll, create };
