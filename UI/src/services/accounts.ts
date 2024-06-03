import axios from 'axios';
import {
  Account,
  FindByAccountNumberType,
  FindUserAccountsType,
  NewAccount,
} from '../types';
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

const findByAccountNumber = async (accountNumber: FindByAccountNumberType) => {
  const response = await axios.post(`${baseUrl}/find-account`, accountNumber);
  return response.data;
};

const findUserAccounts = async (owner: FindUserAccountsType) => {
  const response = await axios.post(`${baseUrl}/user-accounts`, owner);
  return response.data;
};

const create = async (newAccount: NewAccount) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newAccount, config);
  return response.data;
};

const updateAccount = async (id: string, updatedAccount: Account) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.put(`${baseUrl}/${id}`, updatedAccount, config);

  return response.data;
};

const deleteAccount = async (id: string) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export default {
  create,
  deleteAccount,
  findByAccountNumber,
  findUserAccounts,
  getAll,
  updateAccount,
  setToken,
};
