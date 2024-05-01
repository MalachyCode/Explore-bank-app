import axios from 'axios';
import { Account, NewAccount } from '../types';
const baseUrl = 'http://localhost:3001/api/accounts';
// const baseUrl = 'http://localhost:3001/accounts';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

interface FindByAccountNumberType {
  accountNumber: number;
}

const findByAccountNumber = async (accountNumber: FindByAccountNumberType) => {
  const response = await axios.post(`${baseUrl}/find-account`, accountNumber);
  return response.data;
};

const create = async (newAccount: NewAccount) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newAccount, config);
  return response.data;
};

const updateAccount = async (id: string, updatedAccount: Account) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAccount);

  return response.data;
};

const deleteAccount = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default {
  create,
  deleteAccount,
  findByAccountNumber,
  getAll,
  updateAccount,
  setToken,
};
