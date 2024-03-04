import axios from 'axios';
import { NewUser, User } from '../types';
const baseUrl = 'http://localhost:3001/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newUser: NewUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

const resetPassword = async (
  id: string | undefined,
  updatedAccount: User | undefined
) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAccount);

  return response.data;
};

export default { deleteUser, getAll, create, resetPassword };
