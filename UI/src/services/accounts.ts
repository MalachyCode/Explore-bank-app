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

const transfer = async (
  idDebit: string,
  // idDebit: number,
  updatedDebitedAccount: Account,
  idCredit: string,
  // idCredit: number,
  updatedCreditedAccount: Account
) => {
  const debitResponse = await axios.put(
    `${baseUrl}/${idDebit}`,
    updatedDebitedAccount
  );
  const creditResponse = await axios.put(
    `${baseUrl}/${idCredit}`,
    updatedCreditedAccount
  );
  return debitResponse.data, creditResponse.data;
};

const deleteAccount = async (id: string | undefined) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default { deleteAccount, create, getAll, transfer };
