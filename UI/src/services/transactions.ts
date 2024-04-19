import axios from 'axios';
import { NewTransaction } from '../types';
const baseUrl = 'http://localhost:3001/api/transactions';
// const baseUrl = 'http://localhost:3001/transactions';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newCreditTransaction = async (transaction: NewTransaction) => {
  const response = await axios.post(baseUrl, transaction);
  return response.data;
};

const newDebitTransaction = async (transaction: NewTransaction) => {
  const response = await axios.post(baseUrl, transaction);
  return response.data;
};

const deleteTransaction = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default {
  deleteTransaction,
  getAll,
  newCreditTransaction,
  newDebitTransaction,
};
