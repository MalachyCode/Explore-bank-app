import axios from 'axios';
import { Account } from '../types';
const baseUrl = 'http://localhost:3001/accounts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newAccount: Account) => {
  const response = await axios.post(baseUrl, newAccount);
  return response.data;
};

export default { getAll, create };
