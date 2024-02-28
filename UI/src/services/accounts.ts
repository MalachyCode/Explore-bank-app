import axios from 'axios';
import { Account, NewAccount } from '../types';
const baseUrl = 'http://localhost:3001/accounts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newAccount: NewAccount) => {
  const response = await axios.post(baseUrl, newAccount);
  return response.data;
};

const debit = async (
  id: string,
  // idDebit: number,
  updatedDebitedAccount: Account
) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedDebitedAccount);

  return response.data;
};

const credit = async (
  id: string,
  // idCredit: number,
  updatedCreditedAccount: Account
) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedCreditedAccount);

  return response.data;
};

const deleteAccount = async (id: string | undefined) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default { deleteAccount, debit, credit, create, getAll };
