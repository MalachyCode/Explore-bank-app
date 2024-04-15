import axios from 'axios';
import { Account, NewAccount } from '../types';
const baseUrl = 'http://localhost:3001/api/accounts';
// const baseUrl = 'http://localhost:3001/accounts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newAccount: NewAccount) => {
  const response = await axios.post(baseUrl, newAccount);
  return response.data;
};

const updateAccount = async (id: string, updatedAccount: Account) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAccount);

  return response.data;
};

const deleteAccount = async (id: string | undefined) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default {
  create,
  deleteAccount,
  getAll,
  updateAccount,
};
