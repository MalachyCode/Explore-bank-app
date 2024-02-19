import axios from 'axios';
import { Account } from '../types';
const baseUrl = 'http://localhost:3001/accounts';

const create = async (newAccount: Account) => {
  const response = await axios.post(baseUrl, newAccount);
  return response.data;
};

export default { create };
